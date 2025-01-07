// src/lib/papers.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Paper } from '@/types/paper'

const papersDirectory = path.join(process.cwd(), 'papers')

function convertGoogleDriveUrl(url: string, type: 'image' | 'pdf' = 'image'): string {
      const fileIdMatch = url.match(/\/file\/d\/([-\w]+)/)
      if (!fileIdMatch) return url
  
      const fileId = fileIdMatch[1]
      
      if (type === 'image') {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2048`
        // return 'https://lh3.googleusercontent.com/d/' + fileId + '=w2048'
      } else {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
  }

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(papersDirectory)) {
    console.warn('Papers directory does not exist')
    return []
  }

  const papers: Paper[] = []
  
  // 年ごとのディレクトリを処理
  fs.readdirSync(papersDirectory).forEach(yearDir => {
    const yearPath = path.join(papersDirectory, yearDir)
    
    if (fs.statSync(yearPath).isDirectory()) {
      // 論文ごとのディレクトリを処理
      fs.readdirSync(yearPath).forEach(paperDir => {
        const paperPath = path.join(yearPath, paperDir)
        
        if (fs.statSync(paperPath).isDirectory()) {
          const mdPath = path.join(paperPath, 'index.md')
          
          if (fs.existsSync(mdPath)) {
            const fileContents = fs.readFileSync(mdPath, 'utf8')
            const { data, content } = matter(fileContents)
            
            // カバー画像URLの処理
            let coverImage = null
            if (data.coverImage) {
              if (data.coverImage.includes('drive.google.com')) {
                coverImage = convertGoogleDriveUrl(data.coverImage)
                console.log('Converted thumbnail URL:', coverImage)
              } else if (data.coverImage.startsWith('http')) {
                coverImage = data.coverImage
                console.log('Converted thumbnail URL:', coverImage)
              } else {
                // ローカルファイルの場合はnullに（後でデフォルト画像が使用される）
                coverImage = null
              }
            }

            papers.push({
              ...(data as Omit<Paper, 'abstract' | 'coverImage'>),
              abstract: content.trim(),
              coverImage
            })
          }
        }
      })
    }
  })
  return papers
  // // 年とタイプで並び替えて返す
  // return papers.sort((a, b) => {
  //   // 年での並び替え
  //   if (a.year !== b.year) return b.year - a.year
  //   // 種別での並び替え
  //   const typeOrder = { journal: 0, international: 1, domestic: 2 }
  //   if (typeOrder[a.type] !== typeOrder[b.type]) {
  //     return typeOrder[a.type] - typeOrder[b.type]
  //   }
  //   // タイトルでの並び替え
  //   return a.title.localeCompare(b.title)
  // })
}