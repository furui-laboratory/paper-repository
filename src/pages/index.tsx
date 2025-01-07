// import React from 'react'
// import PaperRepository from '@/components/PaperRepository'

// export default function Home() {
//   return (
//     <div>
//       <PaperRepository />
//     </div>
//   )
// }

// src/pages/index.tsx
import { useState, useEffect } from 'react'  // この行を追加
import { GetStaticProps } from 'next'
import Head from 'next/head'
import PaperRepository from '@/components/PaperRepository'
import { getAllPapers } from '@/lib/papers'
import type { Paper } from '@/types/paper'
import { Language, content, detectLanguage } from '@/lib/i18n'

interface HomeProps {
  papers: Paper[]
}

export default function Home({ papers }: HomeProps) {
  const [language, setLanguage] = useState<Language>('en')
  const t = content[language]

  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  return (
    <>
      <Head>
        <title>
          {language === 'ja' 
            ? `${t.repository.title} - ${t.lab.fullName}`
            : `${t.repository.title} - ${t.lab.name} - ${t.lab.subtitle}`}
        </title>
        <meta 
          name="description" 
          content={t.repository.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main>
        <PaperRepository 
          initialPapers={papers}
          initialLanguage={language}
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const papers = getAllPapers()
  return {
    props: {
      papers
    }
  }
}
