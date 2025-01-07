// import { useState } from 'react'
import Link from 'next/link'
import { Home, Globe, ChevronRight } from 'lucide-react'
import { Language, content } from '@/lib/i18n'

interface HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const t = content[language]

  return (
    <div className="sticky top-0 z-50">
      {/* メインナビゲーション */}
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* 左側: ラボ情報 */}
            <div className="flex">
              <div className="flex items-center shrink-0">
                <Link
                  href="https://example.com/lab" // 研究室のホームページURL
                  className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span className="hidden sm:block text-sm">Laboratory Home</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <span className="border-b-2 border-transparent px-1 pt-1 inline-flex items-center text-sm font-medium text-gray-500">
                  <ChevronRight className="h-4 w-4" />
                </span>
                <span className="border-b-2 border-indigo-500 px-1 pt-1 inline-flex items-center text-sm font-medium text-gray-900">
                  Papers
                </span>
              </div>
            </div>

            {/* 右側: 言語切り替え */}
            <div className="flex items-center">
              <button
                onClick={() => onLanguageChange(language === 'ja' ? 'en' : 'ja')}
                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 gap-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'ja' ? 'English' : '日本語'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* メインヘッダー */}
      <div className="bg-white border-b px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* 研究室名 */}
            <div className="space-y-1 mb-6">
              {language === 'ja' ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {t.lab.fullName}
                  </h1>
                  <p className="text-base text-gray-600">
                    {t.lab.subtitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    （{t.lab.name}）
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {t.lab.name}
                  </h1>
                  <p className="text-base text-gray-600">
                    {t.lab.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.lab.subtitle}
                  </p>
                </>
              )}
            </div>

            {/* リポジトリタイトル */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
                {t.repository.title}
              </h2>
              <p className="text-lg text-gray-600">
                {t.repository.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}