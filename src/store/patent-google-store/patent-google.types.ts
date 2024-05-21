import type { PartialOnUndefinedDeep } from 'type-fest';
import type { Nillable, Optional } from '../../types/types.js';

export type PatentGoogleCreateInput = PartialOnUndefinedDeep<PatentGoogle>
export type PatentGoogleTempCreateInput = PartialOnUndefinedDeep<PatentGoogleTemp>

export type PatentGoogleTemp = Pick<
  PatentGoogle,
  | 'id' | 'title' | 'assignee' | 'inventorOrAuthor'
  | 'priorityDate' | 'filingOrCreationDate'
  | 'publicationDate' | 'grantDate'
  | 'url'
>

export type PatentGoogleParsed = Pick<
  PatentGoogle,
  | 'id' | 'url' | 'title'
  | 'abstract' | 'description'
  | 'claims' | 'classifications' | 'relations'
  | 'applicationEvents' | 'concepts'
>

export type PatentGoogle = {
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

export type PatentGoogleRelations = NonNullable<PatentGoogle['relations']>
export type PatentGoogleClassification = NonNullable<PatentGoogle['classifications']>[number]
export type PatentGoogleClaim = NonNullable<PatentGoogle['claims']>[number]
export type PatentGoogleConcept = NonNullable<PatentGoogle['concepts']>[number]
export type PatentGoogleApplicationEvent = NonNullable<PatentGoogle['applicationEvents']>[number]
