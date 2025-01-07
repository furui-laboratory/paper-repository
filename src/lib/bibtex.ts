// src/lib/bibtex.ts
import { Paper } from '@/types/paper'

export function generateBibTeX(paper: Paper): string {
  const type = paper.type === 'journal' ? 'article' : 'inproceedings'
  const key = paper.bibtexKey || `${paper.authors[0].split(' ')[0].toLowerCase()}${paper.year}`

  let bibtex = `@${type}{${key},\n`
  bibtex += `  title = {${paper.title}},\n`
  bibtex += `  author = {${paper.authors.join(' and ')}},\n`
  bibtex += `  year = {${paper.year}},\n`
  
  if (type === 'article') {
    bibtex += `  journal = {${paper.venue}},\n`
    if (paper.volume) bibtex += `  volume = {${paper.volume}},\n`
    if (paper.number) bibtex += `  number = {${paper.number}},\n`
  } else {
    bibtex += `  booktitle = {${paper.venue}},\n`
  }
  
  if (paper.pages) bibtex += `  pages = {${paper.pages}},\n`
  if (paper.publisher) bibtex += `  publisher = {${paper.publisher}},\n`
  if (paper.doi) bibtex += `  doi = {${paper.doi}},\n`

  // 最後のカンマを削除
  bibtex = bibtex.slice(0, -2)
  bibtex += '\n}'

  return bibtex
}