import type { PartialOnUndefinedDeep } from 'type-fest';
import type { Nillable, Optional } from '../../types/types.js';

export type PatentCreateInput = PartialOnUndefinedDeep<Patent>
export type PatentTempCreateInput = PartialOnUndefinedDeep<PatentTemp>

export type PatentTemp = Pick<
  Patent,
  | 'id' | 'title' | 'assignee' | 'inventorOrAuthor'
  | 'priorityDate' | 'filingOrCreationDate'
  | 'publicationDate' | 'grantDate'
  | 'urlGoogle' | 'urlYandex'
>

export type PatentParsed = Pick<
  Patent,
  | 'id' | 'title'
  | 'abstract' | 'description'
  | 'claims' | 'classifications' | 'relations'
  | 'applicationEvents' | 'concepts'
>

export type Patent = {
  id: string
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
  urlGoogle: Nillable<string>
  urlYandex: Nillable<string>
}

export type PatentRelations = NonNullable<Patent['relations']>
export type PatentClassification = NonNullable<Patent['classifications']>[number]
export type PatentClaim = NonNullable<Patent['claims']>[number]
export type PatentConcept = NonNullable<Patent['concepts']>[number]
export type PatentApplicationEvent = NonNullable<Patent['applicationEvents']>[number]
