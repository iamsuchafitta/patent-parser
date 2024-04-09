import type { SetOptional } from 'type-fest';
import type { Nillable, Optional } from '../../types/types.js';

export type ArticleCreateInput = SetOptional<Article, 'createdAt' | 'updatedAt'>
export type ArticleParsed = Pick<Article, 'title' | 'journalName' | 'authors' | 'organizations' | 'date' | 'abstract' | 'pdfUrl'>;
export type Article = {
  url: string
  title: Nillable<string>
  journalName: Nillable<string>
  authors: Optional<{
    name: Nillable<string>
    organizations: Nillable<number[]>
  }[]>
  organizations: Optional<string[]>
  date: Nillable<string>
  abstract: Nillable<string>
  pdfUrl: Nillable<string>

  createdAt: Date
  updatedAt: Date
}
