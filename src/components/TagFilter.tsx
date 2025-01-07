import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  language: Language
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  language
}) => {
  const t = content[language]

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        {t.filters.tagFilter}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
            {selectedTags.includes(tag) && (
              <span className="ml-1 text-xs">×</span>
            )}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default TagFilter