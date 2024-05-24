import type { PartialOnUndefinedDeep } from 'type-fest';
import type { Nillable, Optional } from '../../types/types.js';

export type PatentGoogleCreateInput = PartialOnUndefinedDeep<PatentGoogleEntity>
export type PatentGoogleTempCreateInput = PatentGoogleTempEntity

export type PatentGoogleParsed = Pick<
  PatentGoogleEntity,
  | 'id' | 'url' | 'title'
  | 'abstract' | 'description'
  | 'claims' | 'classifications' | 'relations'
  | 'applicationEvents' | 'concepts'
>

export type PatentGoogleEntity = {
  id: string
  url: string
  title: Nillable<string>
  assignee: Nillable<string>
  inventorOrAuthor: Nillable<string>
  priorityDate: Nillable<string> // YYYY-MM-DD
  filingOrCreationDate: Nillable<string> // YYYY-MM-DD
  publicationDate: Nillable<string> // YYYY-MM-DD
  grantDate: Nillable<string> // YYYY-MM-DD
  abstract: Nillable<string>
  description: Nillable<string>
  classifications: Optional<{
    id?: string
    description?: string
  }[]>
  claims: Optional<{
    index: number
    text: string
    isDependent: boolean
  }[]>
  concepts: Optional<{
    name: Nillable<string>
    domain: Nillable<string>
    smiles: Nillable<string>
    inchiKey: Nillable<string>
    sections: Nillable<string[]>
    count: Nillable<number> // Int
  }[]>
  relations: Optional<{
    citations?: string[]
    citationsFamilyToFamily?: string[]
    citedBy?: string[]
    citedByFamilyToFamily?: string[]
    similarDocuments?: string[]
  }>
  applicationEvents: Optional<{
    date?: string
    assignee?: string
  }[]>
}

export type PatentGoogleRelations = NonNullable<PatentGoogleEntity['relations']>
export type PatentGoogleClassification = NonNullable<PatentGoogleEntity['classifications']>[number]
export type PatentGoogleClaim = NonNullable<PatentGoogleEntity['claims']>[number]
export type PatentGoogleConcept = NonNullable<PatentGoogleEntity['concepts']>[number]
export type PatentGoogleApplicationEvent = NonNullable<PatentGoogleEntity['applicationEvents']>[number]

export type PatentGoogleTempEntity = Pick<
  PatentGoogleEntity,
  | 'id' | 'title' | 'assignee' | 'inventorOrAuthor'
  | 'priorityDate' | 'filingOrCreationDate'
  | 'publicationDate' | 'grantDate'
  | 'url'
>
