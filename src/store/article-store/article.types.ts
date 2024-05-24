import type { SetOptional } from 'type-fest';
import type { Nillable, Optional } from '../../types/types.js';

export type ArticleEntity = {
  url: string
  title: Nillable<string>
  journalName: Nillable<string>
  authors: Optional<{
    name: Nillable<string>
    organizations: Nillable<number[]>
  }[]>
  organizations: Optional<string[]>
  date: Nillable<string> // YYYY-MM-DD
  abstract: Nillable<string>
  pdfUrl: Nillable<string>

  parsedAt: Date
}

export type ArticleCreateInput = SetOptional<ArticleEntity, 'parsedAt'>
export type ArticleParsed = Pick<ArticleEntity, 'title' | 'journalName' | 'authors' | 'organizations' | 'date' | 'abstract' | 'pdfUrl'>;
