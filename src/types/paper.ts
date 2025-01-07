export type PaperType = 'journal' | 'international' | 'domestic'

export interface SupplementaryMaterial {
    title: string
    url: string
    type: 'slide' | 'poster' | 'video' | 'other'
  }
  

export interface Paper {
  title: string
  authors: string[]
  venue: string
  venueShort?: string 
  year: number
  month: number
  abstract: string
  pdfUrl?: string
  arxivUrl?: string
  codeUrl?: string
  doi?: string
  tags: string[]
  type: PaperType
  // thumbnail?: string | null
  coverImage?: string | null
  bibtexKey?: string
  volume?: string
  number?: string
  pages?: string
  publisher?: string
  supplementary?: SupplementaryMaterial[]
  status?: 'in_press' | 'accepted' | 'early_access'
}