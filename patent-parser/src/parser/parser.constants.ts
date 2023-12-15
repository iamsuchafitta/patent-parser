export enum EngineEnum {
  Nightmare = 'Nightmare',
  Puppeteer = 'Puppeteer',
}

export const GooglePatentSelectors = {
  PubNum: 'h2#pubnum',
  PubNumFromUrl: /\/patent\/([A-Z]{2}\d+[A-Z]\d*)(\/|$)/,
  Title: 'h1#title',
  Abstract: 'div.abstract',
  Description: 'div.description-paragraph',
  Claims: 'div.claims>div',
  Classifications: 'classification-tree.classification-viewer>div>div>div>div:not([hidden])',
  ClassificationId: 'state-modifier',
  ClassificationDescription: '.description',
  AllCitations: 'h3#patentCitations+div span.td:first-child',
  AllCitedBy: 'h3#citedBy+div .td:first-child',
  SimilarDocuments: 'h3#similarDocuments+div span.td:first-child a',
} as const;
