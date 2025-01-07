export function convertGoogleDriveUrl(url: string, mode: 'view' | 'thumbnail' = 'view'): string {
      const fileIdMatch = url.match(/\/file\/d\/([-\w]+)/)
      if (!fileIdMatch) return url
  
      const fileId = fileIdMatch[1]
      
      switch (mode) {
        case 'view':
          // プレビュー用URL
          return `https://drive.google.com/file/d/${fileId}/preview`
        case 'thumbnail':
          // サムネイル用URL
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
        default:
          return url
      }
  }