import React, { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { FileText, Code, ExternalLink, Search, ChevronDown, ChevronUp, Copy, Check, Archive } from 'lucide-react'
import { Paper } from '@/types/paper'
import { useEffect } from 'react'
import { Language, content, detectLanguage } from '@/lib/i18n'
import { generateBibTeX } from '@/lib/bibtex'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TagFilter from './TagFilter'

interface HeaderProps {
  language: Language
  onLanguageChange: (newLanguage: Language) => void
}

interface PaperRepositoryProps {
  initialPapers: Paper[]
  initialLanguage: Language
}

interface PaperCardProps {
  paper: Paper
  language: Language
}

interface FiltersBarProps {
  onSearch: (term: string) => void
  onFilterChange: (filter: string) => void
  onYearChange: (year: string) => void
  activeFilter: string
  activeYear: string
  years: number[]
  language: Language
}

interface PDFViewerProps {
  url: string
  title: string
  isOpen: boolean
  onClose: () => void
  language: Language  // 追加
}


interface PDFActionsProps {
  pdfUrl: string
  onPreview: () => void
  className?: string; // className プロパティを追加
}

type PaperType = 'journal' | 'international' | 'domestic'

interface TypeConfig {
  color: string
  bgColor: string
  borderColor: string
  hoverBg: string
  activeColor: string  // フィルターがアクティブな時の背景色
  label: {
    ja: string
    en: string
  }
}

const PAPER_TYPE_CONFIG: Record<PaperType | 'all', TypeConfig> = {
  journal: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBg: 'hover:bg-blue-100',
    activeColor: 'bg-blue-600',
    label: {
      ja: '雑誌論文',
      en: 'Journal'
    }
  },
  international: {
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    hoverBg: 'hover:bg-emerald-100',
    activeColor: 'bg-emerald-600',
    label: {
      ja: '国際会議',
      en: 'International Conf.'
    }
  },
  domestic: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    hoverBg: 'hover:bg-orange-100',
    activeColor: 'bg-orange-600',
    label: {
      ja: '国内会議',
      en: 'Domestic Conf.'
    }
  },
  all: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'bg-gray-600',
    label: {
      ja: 'すべて',
      en: 'All'
    }
  }
} as const

const basePath = process.env.NODE_ENV === 'production' ? '/paper-repository' : '';

const PaperTypeBadge: React.FC<{ type: PaperType; language: Language }> = ({ type, language }) => {
  const config = PAPER_TYPE_CONFIG[type]
  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium 
      ${config.color} ${config.bgColor} ${config.borderColor} border
      transition-colors
    `}>
      {config.label[language]}
    </span>
  )
}


const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {  // onLanguageChangeを追加
  const t = content[language]
  const labUrl = language === 'ja' 
    ? 'https://home.hiroshima-u.ac.jp/furui/'
    : 'https://home.hiroshima-u.ac.jp/furui/en/'

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* フレックスコンテナをモバイルでは縦方向に変更 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* 左側：タイトル部分 */}
          <div className="space-y-2 flex-1">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {t.lab.fullName}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t.lab.subtitle}
              </p>
            </div>

            {/* モバイルのみ：研究室ホームページリンク */}
            <div className="md:hidden">
              <a
                href={labUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span>{t.lab.visitHomepage}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="pt-4 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {t.repository.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {t.repository.description}
                </p>
              </div>

              {/* モバイルのみ：言語切り替えボタン */}
              <div className="md:hidden">
                <button
                  onClick={() => onLanguageChange(language === 'ja' ? 'en' : 'ja')}
                  className="px-3 py-1.5 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  {language === 'ja' ? 'English' : '日本語'}
                </button>
              </div>
            </div>
          </div>

          {/* 右側：デスクトップのみの言語切り替えと研究室ホームページリンク */}
          <div className="md:flex md:flex-col md:items-end gap-4 hidden">
            {/* デスクトップのみ：言語切り替えと画像付きリンク */}
            <button
              onClick={() => onLanguageChange(language === 'ja' ? 'en' : 'ja')}
              className="px-3 py-1.5 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              {language === 'ja' ? 'English' : '日本語'}
            </button>

            <a 
              href={labUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-end gap-2 hover:no-underline"
            >
              <div className="relative overflow-hidden rounded-lg w-40 aspect-video shadow-md transition-transform group-hover:scale-105">
                <Image
                  src={language === 'ja' 
                    ? `${basePath}/images/lab-homepage-ja.png`
                    : `${basePath}/images/lab-homepage-en.png`
                  }
                  alt={t.lab.homepageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                <span>{t.lab.visitHomepage}</span>
                <ExternalLink size={14} className="inline" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}


const VenueDisplay: React.FC<{ paper: Paper }> = ({ paper }) => {
  const [showFullVenue, setShowFullVenue] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState<'center' | 'left' | 'right'>('center')
  const containerRef = useRef<HTMLDivElement>(null)

  // venueShort があれば短縮表記を使う
  const displayVenue = paper.venueShort || paper.venue
  const hasLongVenue = paper.venueShort && paper.venue !== paper.venueShort

  useEffect(() => {
    if (showFullVenue && containerRef.current) {
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const viewportWidth = window.innerWidth

      if (displayVenue.length < 5) {
        setPopoverPosition('left')
      } else if (rect.left < 300) {
        setPopoverPosition('left')
      } else if (viewportWidth - rect.right < 300) {
        setPopoverPosition('right')
      } else {
        setPopoverPosition('left')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFullVenue]) // displayVenue は文字列長を取得するだけなので大きく変わらない想定

  const getPopoverClasses = () => {
    const base = "absolute bottom-full mb-2 z-50"
    if (popoverPosition === 'left') return `${base} left-0`
    if (popoverPosition === 'right') return `${base} right-0`
    return `${base} left-1/2 transform -translate-x-1/2`
  }

  const getArrowClasses = () => {
    const base = "absolute -bottom-1 w-2 h-2 bg-gray-800 rotate-45"
    if (popoverPosition === 'left') return `${base} left-4`
    if (popoverPosition === 'right') return `${base} right-4`
    return `${base} left-1/2 transform -translate-x-1/2`
  }

  return (
    <div 
      ref={containerRef}
      className="relative inline-flex items-center group/venue"
      onMouseEnter={() => hasLongVenue && setShowFullVenue(true)}
      onMouseLeave={() => setShowFullVenue(false)}
    >
      <span className="line-clamp-1 text-gray-500">
        {displayVenue}
      </span>
      {hasLongVenue && showFullVenue && (
        <div className={getPopoverClasses()}>
          <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-normal min-w-[200px] max-w-[300px]">
            {paper.venue}
            <div className={getArrowClasses()} />
          </div>
        </div>
      )}
    </div>
  )
}


// PDFViewerコンポーネント
const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  title,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const getPreviewUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/file\/d\/([-\w]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return url
  }

  // Google DriveのダウンロードURLを生成
  const getDownloadUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/file\/d\/([-\w]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`
      }
    }
    return url
  }

  // ダウンロード処理
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const downloadUrl = getDownloadUrl(url);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = downloadUrl;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // 少し待ってからローディング状態を解除
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 flex flex-col overflow-hidden">
        {/* ヘッダー部分を縦方向のレイアウトに変更 */}
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* タイトル */}
            <DialogTitle className="text-lg flex-1 pr-0">
              {title}
            </DialogTitle>
            {/* ボタン群 - 常に横並び */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-blue-600 mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-1" />
                    Download
                  </>
                )}
              </button>
              
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                <ExternalLink size={16} className="mr-1" />
                Open
              </a>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 w-full relative bg-gray-100">
          <iframe
            src={getPreviewUrl(url)}
            className="w-full h-full border-0"
            allowFullScreen
            style={{
              borderBottomLeftRadius: 'calc(var(--radius) - 1px)',
              borderBottomRightRadius: 'calc(var(--radius) - 1px)',
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

const PDFActions: React.FC<PDFActionsProps> = ({ pdfUrl, onPreview }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);

  // Google DriveのダウンロードURLを生成
  const getDownloadUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/file\/d\/([-\w]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`
      }
    }
    return url
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const downloadUrl = getDownloadUrl(pdfUrl);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = downloadUrl;
      link.setAttribute('download', '');  // ファイルをダウンロードとして扱う
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // 少し待ってからローディング状態を解除
      setTimeout(() => {
        setIsDownloading(false);
        setOpen(false);
      }, 1000);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <FileText size={16} />
          PDF
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-40 p-1" 
        side="right" 
        align="start"
      >
        <div className="flex flex-col gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
              setOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
          >
            <FileText size={16} />
            Preview
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-gray-700" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};


// まず、ステータスの表示設定を定義
const PAPER_STATUS_CONFIG: Record<string, {
  label: { ja: string; en: string };
  class: string;
}> = {
  in_press: {
    label: {
      ja: '印刷中',
      en: 'In Press'
    },
    class: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  },
  accepted: {
    label: {
      ja: '採択済',
      en: 'Accepted'
    },
    class: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  },
  early_access: {
    label: {
      ja: '早期公開',
      en: 'Early Access'
    },
    class: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  }
}

// ステータスバッジコンポーネント
const StatusBadge: React.FC<{ status: Paper['status']; language: Language }> = ({ 
  status, 
  language 
}) => {
  if (!status) return null

  const config = PAPER_STATUS_CONFIG[status]
  return (
    <span className={`
      inline-flex items-center px-1.5 py-0.5 
      rounded-md text-xs font-medium 
      border
      ${config.class}
    `}>
      {config.label[language]}
    </span>
  )
}


const Footer: React.FC<{ language: Language }> = ({ language }) => {
  const t = content[language]
  // const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* 注意書き */}
          <p className="text-sm text-gray-500 max-w-2xl">
            {t.disclaimer.content}
          </p>

          {/* 区切り線 */}
          <div className="w-full border-t border-gray-100" />

          {/* 所属表示（コピーライトではなく） */}
          <p className="text-sm text-gray-400">
            {language === 'ja' ? (
              <>広島大学 大学院先進理工系科学研究科 知能生体情報学研究室</>
            ) : (
              <>Intelligent Biosignal Informatics Laboratory, Graduate School of Advanced Science and Engineering, Hiroshima University</>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}


const FiltersBar: React.FC<FiltersBarProps> = ({
  onSearch,
  onFilterChange,
  onYearChange,
  activeFilter,
  activeYear,
  years,
  language
}) => {
  const t = content[language]

  const filterOptions = [
    'all' as const,
    'journal' as const,
    'international' as const,
    'domestic' as const
  ]

  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 左側：検索バーと年フィルター */}
          <div className="flex items-center gap-4 flex-1">
            {/* 検索バー */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t.filters.searchPlaceholder}
                className="pl-10 bg-gray-50 border-gray-200"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            {/* 年フィルター - shadcn/uiのSelectコンポーネントを使用 */}
            <Select
              value={activeYear}
              onValueChange={onYearChange}
            >
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder={t.filters.selectYear} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="text-gray-600">{t.filters.allYears}</span>
                </SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    <span className="text-gray-600">{year}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 右側：種別フィルター */}
          <div className="flex gap-2">
            {filterOptions.map(type => {
              const config = PAPER_TYPE_CONFIG[type]
              const isActive = activeFilter === type
              return (
                <button
                  key={type}
                  onClick={() => onFilterChange(type)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium 
                    transition-colors duration-200
                    ${isActive 
                      ? `${config.activeColor} text-white` 
                      : `${config.color} ${config.bgColor} border ${config.borderColor} ${config.hoverBg}`
                    }
                  `}
                >
                  {config.label[language]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}



const PaperCard: React.FC<PaperCardProps> = ({ paper, language }) => {
  const [showAbstract, setShowAbstract] = useState(false)
  const [showFullAuthors, setShowFullAuthors] = useState(false) 
  // const [showFullVenue, setShowFullVenue] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showBibTeX, setShowBibTeX] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPDFOpen, setIsPDFOpen] = useState(false)
  // const config = PAPER_TYPE_CONFIG[paper.type]
  // const t = content[language]

  // 著者リストが長いかどうかを確認
  const isLongAuthorList = paper.authors.length > 3

  // 表示する著者リストを生成
  const displayAuthors = useMemo(() => {
    if (!isLongAuthorList || showFullAuthors) {
      return paper.authors
    }
    return [...paper.authors.slice(0, 2), '...']
  }, [paper.authors, showFullAuthors, isLongAuthorList])

  // 会議名/雑誌名の表示を管理
  // const displayVenue = paper.venueShort || paper.venue
  // const hasLongVenue = paper.venueShort && paper.venue !== paper.venueShort

  const handleCopyBibTeX = async () => {
    const bibtex = generateBibTeX(paper)
    await navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // デフォルト画像のパス
  // const defaultImage = '/images/default-paper-cover.png'

  // 画像URLの処理
  // const getImageUrl = (url: string | undefined | null): string => {
  //   if (!url || imageError) {
  //     // 本番環境でのパス解決
  //     return process.env.NODE_ENV === 'production'
  //       ? `/paper-repository${defaultImage}`
  //       : defaultImage
  //   }
  //   return url
  // }
  const getImageUrl = (url: string | undefined | null): string => {
    if (!url) {
      return `${basePath}/images/default-paper-cover.png`
    }
    return url
  }

  const imageUrl = imageError
    ? `${basePath}/images/default-paper-cover.png`
    : getImageUrl(paper.coverImage);

  // サムネイルURLの生成ロジックを追加
  // const thumbnailUrl = paper.thumbnail || 
  //   (process.env.NODE_ENV === 'development' 
  //     ? 'https://placehold.co/400x225' 
  //     : '/api/placeholder/400/225')

  // // PDFリンクの生成（Google Driveの場合）
  // const getPdfUrl = (driveUrl: string) => {
  //   if (!driveUrl) return undefined
  //   // Google Drive の共有リンクを直接ダウンロードリンクに変換
  //   const fileId = driveUrl.match(/[-\w]{25,}/)
  //   return fileId 
  //     ? `https://drive.google.com/uc?export=download&id=${fileId[0]}`
  //     : driveUrl
  // }
  
  return (
    <>
      <Card
        role="article"
        // aria-labelledby={`paper-title-${paper.id}`}
        aria-labelledby={`paper-title-${paper.title.replace(/\s+/g, '-').toLowerCase()}`}
        className="group relative hover:shadow-lg transition-all duration-300 bg-white overflow-hidden"
      >
        {/* PDFが利用可能な場合、カード全体をクリッカブルに */}
        {paper.pdfUrl && (
          <div
            className="absolute inset-0 cursor-pointer z-10"
            onClick={() => setIsPDFOpen(true)}
            role="button"
            tabIndex={0}
            aria-label={`View PDF: ${paper.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsPDFOpen(true)
              }
            }}
          />
        )}

        {/* サムネイル部分 - より明確なホバーエフェクト */}
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={`Cover image for ${paper.title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)} // エラー時にデフォルト画像に切り替える
            unoptimized
          />
          {/* PDFが利用可能な場合、ホバー時にプレビューを示唆するオーバーレイを表示 */}
          {paper.pdfUrl && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* コンテンツ部分 - アクション要素は独立して操作可能に */}
        <CardHeader className="relative z-20 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-medium text-gray-600">
            {paper.year}
          </span>
          <PaperTypeBadge type={paper.type} language={language} />
        </div>

          <div>
            {/* タイトルをクリッカブルに */}
            {paper.pdfUrl ? (
              <CardTitle
                id={`paper-title-${paper.title.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setIsPDFOpen(true)}
                className="text-base font-bold mb-1 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {paper.title}
              </CardTitle>
            ) : (
              <CardTitle
                id={`paper-title-${paper.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-base font-bold mb-1"
              >
                {paper.title}
              </CardTitle>
            )}

        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {displayAuthors.map((author, index) => (
              <span
                key={`${index}-${author}`}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-sm bg-gray-50 text-gray-600 border border-gray-100"
              >
                {author}
              </span>
            ))}
            {isLongAuthorList && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullAuthors(!showFullAuthors);
                }}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-sm bg-gray-50 text-blue-600 hover:bg-gray-100 border border-gray-100 transition-colors"
              >
                {showFullAuthors ? 'Show less' : `+${paper.authors.length - 2} more`}
              </button>
            )}
          </div>
          
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
            <VenueDisplay paper={paper} />
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{paper.year}</span>
            {paper.status && (
            <StatusBadge status={paper.status} language={language} />
          )}
          </div>
          </div>
        </CardHeader>

      <CardContent className="relative z-20 p-4 pt-0">  {/* z-indexを上げて操作可能に */}
          <div className="space-y-2.5">
            {/* Abstract Toggle - クリック可能なように明示的なスタイルを追加 */}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();  // カード全体のクリックを防止
                  setShowAbstract(!showAbstract);
                }}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
              >
              {showAbstract ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              Abstract
            </button>
            {showAbstract && (
              <p className="text-sm text-gray-600 mb-3">
                {paper.abstract}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {paper.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <button
              onClick={() => setShowBibTeX(!showBibTeX)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
            >
              {showBibTeX ? 'Hide' : 'Show'} BibTeX
            </button>
            
            {showBibTeX && (
              <div className="mt-2 relative">
                <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-x-auto">
                  {generateBibTeX(paper)}
                </pre>
                <button
                  onClick={handleCopyBibTeX}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/50 hover:bg-white/90 transition-colors"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} className="text-gray-600" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-3">
          {paper.pdfUrl && (
                <PDFActions
                  pdfUrl={paper.pdfUrl}
                  onPreview={() => setIsPDFOpen(true)}
                  className="hover:-translate-y-0.5 transition-transform"
                />
              )}
            {paper.codeUrl && (
              <a
                href={paper.codeUrl}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code 
                  size={16} 
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
                Code
              </a>
            )}
            {paper.doi && (
              <a
                href={`https://doi.org/${paper.doi}`}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink 
                  size={16} 
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
                DOI
              </a>
            )}
            {paper.arxivUrl && (
            <a  
              href={paper.arxivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-purple-600"
            >
              <Archive size={14} className="flex-shrink-0" />
              arXiv
            </a>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
          {paper.pdfUrl && isPDFOpen && (
            <PDFViewer
              url={paper.pdfUrl}
              title={paper.title}
              isOpen={isPDFOpen}
              onClose={() => setIsPDFOpen(false)}
              language={language}  // 言語を渡す
            />
          )}
        </>
  )
}


  

  
  // const PaperRepository: React.FC = () => {
  const PaperRepository: React.FC<PaperRepositoryProps> = ({ initialPapers, initialLanguage = 'en' }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [selectedYear, setSelectedYear] = useState<string>('all')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [language, setLanguage] = useState<Language>(initialLanguage)

  // 言語設定の初期化
  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  // 利用可能な年のリストを取得
  const years = useMemo(() => {
    const yearSet = new Set(initialPapers.map(paper => paper.year))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [initialPapers])

  // すべての一意なタグを取得
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialPapers.forEach(paper => {
      paper.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [initialPapers])

  // 論文の並び順を定義
  // const paperTypeOrder = {
  //   journal: 0,
  //   international: 1,
  //   domestic: 2
  // }
  
  // フィルタリングと並び替えのロジック
  const filteredPapers = useMemo(() => {
    return initialPapers
      .filter(paper => {
        // 検索語でのフィルタリング
        const matchesSearch = 
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.authors.some(author => 
            author.toLowerCase().includes(searchTerm.toLowerCase())
          )

        // カテゴリでのフィルタリング
        const matchesFilter = filter === 'all' || paper.type === filter

        const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear

        // タグでのフィルタリング
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.every(tag => paper.tags.includes(tag))

        return matchesSearch && matchesFilter && matchesYear && matchesTags
      })
      .sort((a, b) => {
        // 年での並び替え
        if (a.year !== b.year) return b.year - a.year
        // 種別での並び替え
        const typeOrder = { journal: 0, international: 1, domestic: 2 }
        if (typeOrder[a.type] !== typeOrder[b.type]) {
          return typeOrder[a.type] - typeOrder[b.type]
        }
        // 出版月での並び替え (月が存在する場合のみ)
        if (a.month !== b.month) return b.month - a.month
        // タイトルでの並び替え
        return a.title.localeCompare(b.title)
      })
  }, [initialPapers, searchTerm, filter, selectedYear, selectedTags])

  // タグ選択の処理
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }
  
  // 年別にグループ化
  // const papersByYear = useMemo(() => {
  //   return filteredPapers.reduce<Record<number, Paper[]>>((acc, paper) => {
  //     if (!acc[paper.year]) {
  //       acc[paper.year] = []
  //     }
  //     acc[paper.year].push(paper)
  //     return acc
  //   }, {})
  // }, [filteredPapers])
  
    // const handleSearch = (term: string) => {
    //   setSearchTerm(term)
    // }
  
    // const handleFilterChange = (newFilter: string) => {
    //   setFilter(newFilter)
    // }
  
    // const handleSortChange = (newSort: string) => {
    //   setSortBy(newSort)
    // }
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex-1">
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-6">

      <Header 
          language={language} 
          onLanguageChange={setLanguage}
        />
      
      <div className="mb-8">
          <FiltersBar
            onSearch={setSearchTerm}
            onFilterChange={setFilter}
            onYearChange={setSelectedYear}
            activeFilter={filter}
            activeYear={selectedYear}
            years={years}
            language={language}
          />
          <div className="mt-4">
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              language={language}
            />
          </div>
        </div>
  
          {/* <div className="mt-6">
            {Object.entries(papersByYear)
              .sort(([yearA, _a], [yearB, _b]) => Number(yearB) - Number(yearA))
              .map(([year, yearPapers]) => (
                <div key={year} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{year}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {yearPapers.map((paper, index) => (
                      <PaperCard 
                        key={`${year}-${index}`} 
                        paper={paper} 
                        className="w-full" // カードの幅を親要素に合わせる
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div> */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {filteredPapers.map((paper, index) => (
                    <PaperCard
                      key={`${paper.year}-${index}`}
                      paper={paper}
                      language={language}
                    />
                  ))}
        </div>
  
        {filteredPapers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {language === 'ja' 
              ? '該当する論文が見つかりませんでした。'
              : 'No papers found matching your criteria.'}
          </div>
        )}
      </div>
    </div>
    <Footer language={language} />
    </div>
    )
  }

  export default PaperRepository;