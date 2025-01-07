import React, { useState, useRef, useEffect } from 'react'
import { Quote, Check, Copy } from 'lucide-react'
import type { Paper } from '@/types/paper'

interface BibTexPopoverProps {
  paper: Paper
}

export const BibTexPopover: React.FC<BibTexPopoverProps> = ({ paper }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [copied, setCopied] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPopover(false)
      }
    }

    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopover])

  const generateBibTeX = (paper: Paper): string => {
    const key = paper.bibtexKey || paper.title.toLowerCase().replace(/[^a-z0-9]/g, '')
    
    let entry = ''
    if (paper.type === 'journal') {
      entry = '@article'
    } else if (paper.type === 'international' || paper.type === 'domestic') {
      entry = '@inproceedings'
    } else {
      entry = '@misc'
    }

    const fields = ([
      ['title', `{${paper.title}}`],
      ['author', `{${paper.authors.join(' and ')}}`],
      ['year', `{${paper.year}}`],
      paper.venue && ['booktitle', `{${paper.venue}}`],
      paper.volume && ['volume', `{${paper.volume}}`],
      paper.number && ['number', `{${paper.number}}`],
      paper.pages && ['pages', `{${paper.pages}}`],
      paper.publisher && ['publisher', `{${paper.publisher}}`],
      paper.doi && ['doi', `{${paper.doi}}`],
      paper.month && ['month', `{${paper.month}}`]
    ].filter(Boolean) as [string, string][])

    return `${entry}{${key},\n  ${fields.map(([k, v]) => `${k} = ${v}`).join(',\n  ')}\n}`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateBibTeX(paper))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowPopover(!showPopover)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
        title="View BibTeX"
      >
        <Quote size={16} />
        BibTeX
      </button>

      {showPopover && (
        <div
          ref={popoverRef}
          className="absolute left-0 bottom-full mb-2 z-50"
          style={{
            width: '32rem',
            maxWidth: 'calc(100vw - 2rem)',
          }}
        >
          <div className="bg-white border rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-3 border-b bg-gray-50">
              <span className="text-sm font-medium">BibTeX Citation</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm bg-white px-3 py-1 rounded border hover:bg-gray-50"
              >
                {copied ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <pre className="p-4 text-sm whitespace-pre-wrap font-mono bg-white overflow-x-auto">
                {generateBibTeX(paper)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BibTexPopover