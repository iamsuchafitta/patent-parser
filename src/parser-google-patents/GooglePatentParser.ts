import { GooglePatentSelectors } from './parser-google-patents.constants';
import type { HTMLElement } from 'node-html-parser';
import { type PatentRelations, type PatentClaim, type PatentClassification, type Patent } from '../store/patent-store/patent-store.types';

export class GooglePatentParser {
  constructor(
    private readonly url: string,
    private readonly html: HTMLElement,
  ) {}

  get id(): Patent['id'] {
    return this.html.querySelector(GooglePatentSelectors.PubNum)?.innerText.trim().replace(/\s+/g, ' ')
      || GooglePatentSelectors.PubNumFromUrl.exec(this.url)?.[1] as string;
  }

  get title(): Patent['title'] {
    return this.html.querySelector(GooglePatentSelectors.Title)?.innerText.trim().replace(/\s+/g, ' ');
  }

  get abstract(): Patent['abstract'] {
    return this.html.querySelector(GooglePatentSelectors.Abstract)?.innerText.trim().replace(/\s+/g, ' ');
  }

  get description(): Patent['description'] {
    return this.html.querySelectorAll(GooglePatentSelectors.Description)
      .map(el => el.innerText.trim().replace(/\s+/g, ' '))
      .join('\n\n') || undefined;
  }

  get claims(): PatentClaim[] {
    return this.html.querySelectorAll(GooglePatentSelectors.Claims)
      .map((el, i) => ({
        index: i,
        text: el.innerText.trim().replace(/\s+/g, ' '),
        isDependent: el.classList.contains('claim-dependent'),
      }));
  }

  get classifications(): PatentClassification[] {
    return this.html.querySelectorAll(GooglePatentSelectors.Classifications)
      .map(el => ({
        id: el.querySelector(GooglePatentSelectors.ClassificationId)?.innerText.trim().replace(/\s+/g, ' '),
        description: el.querySelector(GooglePatentSelectors.ClassificationDescription)?.innerText.trim().replace(/\s+/g, ' '),
      }));
  }

  get relations(): PatentRelations {
    // Citations
    const allCitations = this.html.querySelectorAll(GooglePatentSelectors.AllCitations)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citationsFamilyFromIdx = allCitations.findIndex((el) => /Family/i.test(el));
    // Cited by
    const allCitedBy = this.html.querySelectorAll(GooglePatentSelectors.AllCitedBy)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citedByFamilyFromIdx = allCitedBy.findIndex((el) => /Family/i.test(el));
    return  {
      citations: allCitations.slice(0, citationsFamilyFromIdx),
      citationsFamilyToFamily: allCitations.slice(citationsFamilyFromIdx + 1),
      citedBy: allCitedBy.slice(0, citedByFamilyFromIdx),
      citedByFamilyToFamily: allCitedBy.slice(citedByFamilyFromIdx + 1),
      similarDocuments: this.html.querySelectorAll(GooglePatentSelectors.SimilarDocuments)
        .map<string>(el => el.innerText.trim().replace(/\s+/g, ' ')),
    }
  }
}
