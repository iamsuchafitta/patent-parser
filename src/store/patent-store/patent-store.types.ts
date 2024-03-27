import type { Nillable, Optional } from '../../types';

export type PatentCreateInput = Patent

export type Patent = {
  id: string
  urlGoogle?: Nillable<string>
  urlYandex?: Nillable<string>
  title?: Nillable<string>
  abstract?: Nillable<string>
  description?: Nillable<string>
  classifications?: Optional<{
    id?: string
    description?: string
  }[]>
  claims?: Optional<{
    index: number
    text: string
    isDependent: boolean
  }[]>
  concepts?: Optional<{
    name: string
    domain: string
    smiles?: Nillable<string>
    inchiKey?: Nillable<string>
    queryMatch: number // Float
    sections: string[]
    count: number // Int
  }[]>
  relations?: Optional<{
    citations?: string[]
    citationsFamilyToFamily?: string[]
    citedBy?: string[]
    citedByFamilyToFamily?: string[]
    worldwide?: string[]
    similarDocuments?: string[]
  }>
  applicationEvents?: Optional<{
    date: string
    asignee: string
    inventors: string[]
  }[]>
}

export type PatentRelations = NonNullable<Patent['relations']>
export type PatentClassification = NonNullable<Patent['classifications']>[number]
export type PatentClaim = NonNullable<Patent['claims']>[number]
export type PatentConcept = NonNullable<Patent['concepts']>[number]
export type PatentApplicationEvent = NonNullable<Patent['applicationEvents']>[number]
