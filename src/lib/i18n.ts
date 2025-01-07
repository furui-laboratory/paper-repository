export type Language = 'ja' | 'en'

interface SiteContent {
  lab: {
    name: string
    fullName: string
    subtitle: string
    professor: string
    visitHomepage: string
    homepageAlt: string
  }
  repository: {
    title: string
    subtitle: string
    description: string
    visitHomepage: string
    homepageAlt: string
  }
  filters: {
    searchPlaceholder: string
    all: string
    journal: string
    international: string
    domestic: string
    sortLatest: string
    sortTitle: string
    tagFilter: string
    clearTags: string
    selectedTags: string
    selectYear: string
    allYears: string
  }
  paper: {
    showBibtex: string
    hideBibtex: string
    copyBibtex: string
    copied: string
  }
  pdf: {
    preview: string
    download: string
    openInNewTab: string
    close: string
  }
  disclaimer: {
    title: string
    content: string
  }
}

export const content: Record<Language, SiteContent> = {
  ja: {
    lab: {
      name: '古居研究室',
      fullName: '広島大学 知能生体情報学研究室（古居研究室）',
      subtitle: 'Intelligent Biosignal Informatics Lab, Hiroshima University',
      professor: '古居 彬',
      visitHomepage: '研究室ホームページへ',
      homepageAlt: '研究室ホームページのプレビュー',
    },
    repository: {
      title: '論文リポジトリ',
      subtitle: 'Research Papers Repository',
      description: '研究室の研究成果をまとめた論文リポジトリです。',
      visitHomepage: '研究室ホームページへ',
      homepageAlt: '研究室ホームページのプレビュー',
    },
    filters: {
      searchPlaceholder: '論文を検索...',
      all: 'すべての論文',
      journal: 'ジャーナル',
      international: '国際会議',
      domestic: '国内会議',
      sortLatest: '新しい順',
      sortTitle: 'タイトル順',
      tagFilter: 'タグでフィルター',
      clearTags: 'タグをクリア',
      selectedTags: '選択中のタグ',
      selectYear: '年で絞り込み',
      allYears: 'すべての年',
    },
    paper: {
        showBibtex: 'BibTeXを表示',
        hideBibtex: 'BibTeXを隠す',
        copyBibtex: 'クリップボードにコピー',
        copied: 'コピーしました！'
      },
    pdf: {
      preview: 'PDFプレビュー',
      download: 'ダウンロード',
      openInNewTab: '新しいタブで開く',
      close: '閉じる'
    },
    disclaimer: {
      title: '利用上の注意',
      content: '本リポジトリに掲載されている論文は、各出版社の許諾条件に従い、採択版を提供しています。詳細な利用条件については、各出版社のポリシーをご確認ください。'
    }
  },
  en: {
    lab: {
      name: 'Furui Laboratory',
      fullName: 'Intelligent Biosignal Informatics Lab',
      subtitle: 'Hiroshima University',
      professor: 'Akira Furui',
      visitHomepage: 'Visit Lab Homepage',
      homepageAlt: 'Lab Homepage Preview',
    },
    repository: {
      title: 'Research Papers Repository',
      subtitle: 'Publication Repository',
      description: 'A collection of our research publications and academic works.',
      visitHomepage: 'Visit Lab Homepage',
      homepageAlt: 'Lab Homepage Preview',
    },
    filters: {
      searchPlaceholder: 'Search papers...',
      all: 'All Papers',
      journal: 'Journals',
      international: 'International Conf.',
      domestic: 'Domestic Conf.',
      sortLatest: 'Latest First',
      sortTitle: 'Title',
      tagFilter: 'Filter by Tags',
      clearTags: 'Clear Tags',
      selectedTags: 'Selected Tags',
      selectYear: 'Filter by Year',
      allYears: 'All Years',
    },
    paper: {
        showBibtex: 'Show BibTeX',
        hideBibtex: 'Hide BibTeX',
        copyBibtex: 'Copy to clipboard',
        copied: 'Copied!'
      },
    pdf: {
      preview: 'PDF Preview',
      download: 'Download',
      openInNewTab: 'Open in new tab',
      close: 'Close'
    },
    disclaimer: {
      title: 'Important Notice',
      content: 'The papers in this repository are provided in their accepted versions in accordance with the permission conditions of each publisher. Please refer to the respective publisher\'s policies for detailed terms of use.'
    }
  }
}

// ブラウザの言語設定を検出
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const userLang = navigator.language.toLowerCase()
  return userLang.startsWith('ja') ? 'ja' : 'en'
}