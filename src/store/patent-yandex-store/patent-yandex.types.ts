import { Optional, type Nillable } from '../../types/types.js';

export type PatentYandexEntity = {
  id: string
  url: string
  title: Nillable<string>
  authors: Optional<string[]>
  assignees: Optional<string[]>
  applicationDate: Nillable<string> // YYYY-MM-DD
  publishedDate: Nillable<string> // YYYY-MM-DD
  abstract: Nillable<string>
  claims: Nillable<string>
  description: Nillable<string>
  classifications: Optional<string[]>
  relations: Optional<{
    citations: Nillable<string[]>
    citedBy: Nillable<string[]>
    similarDocuments: Nillable<string[]>
  }>
  fipsUrl: Nillable<string>
}
