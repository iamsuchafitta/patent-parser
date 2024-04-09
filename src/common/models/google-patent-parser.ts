import { range } from 'lodash-es';
import neatCsv from 'neat-csv';
import { type HTMLElement, parse as htmlParse } from 'node-html-parser';
import {
  type PatentRelations,
  type PatentClaim,
  type PatentClassification,
  type Patent,
  type PatentApplicationEvent, type PatentParsed,
} from '../../store/patent-store/patent.types.js';

export class GooglePatentParser implements PatentParsed {
  private readonly select = {
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

  readonly url: string;
  readonly #html: HTMLElement;
  #conceptsCSV: ConceptFromCsv[] | undefined;

  private constructor(
    args: { url: string, html: HTMLElement },
  ) {
    this.url = args.url;
    this.#html = args.html;
  }

  public static async parse(
    args: { url: string, html: string, conceptsCSVStr?: string },
  ): Promise<PatentParsed> {
    const parser = new GooglePatentParser({ url: args.url, html: htmlParse(args.html) });
    parser.#conceptsCSV = args.conceptsCSVStr ? await neatCsv<ConceptFromCsv>(args.conceptsCSVStr) : undefined;
    return {
      id: parser.id,
      title: parser.title,
      abstract: parser.abstract,
      description: parser.description,
      claims: parser.claims,
      classifications: parser.classifications,
      relations: parser.relations,
      applicationEvents: parser.applicationEvents,
      concepts: parser.concepts,
    };
  }

  get id(): Patent['id'] {
    return this.#html.querySelector(this.select.PubNum)?.innerText.trim().replace(/\s+/g, ' ')
      || this.select.PubNumFromUrl.exec(this.url)?.[1] as string;
  }

  get title(): Patent['title'] {
    return this.#html.querySelector(this.select.Title)?.innerText.trim().replace(/\s+/g, ' ');
  }

  get abstract(): Patent['abstract'] {
    return this.#html.querySelector(this.select.Abstract)?.innerText.trim().replace(/\s+/g, ' ');
  }

  get description(): Patent['description'] {
    return this.#html.querySelectorAll(this.select.Description)
      .map(el => el.innerText.trim().replace(/\s+/g, ' '))
      .join('\n\n') || undefined;
  }

  get claims(): PatentClaim[] {
    return this.#html.querySelectorAll(this.select.Claims)
      .map((el, i) => ({
        index: i,
        text: el.innerText.trim().replace(/\s+/g, ' '),
        isDependent: el.classList.contains('claim-dependent'),
      }));
  }

  get classifications(): PatentClassification[] {
    return this.#html.querySelectorAll(this.select.Classifications)
      .map(el => ({
        id: el.querySelector(this.select.ClassificationId)?.innerText.trim().replace(/\s+/g, ' '),
        description: el.querySelector(this.select.ClassificationDescription)?.innerText.trim().replace(/\s+/g, ' '),
      }));
  }

  get relations(): PatentRelations {
    // Citations
    const allCitations = this.#html.querySelectorAll(this.select.AllCitations)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citationsFamilyFromIdx = allCitations.findIndex((el) => /Family/i.test(el));
    // Cited by
    const allCitedBy = this.#html.querySelectorAll(this.select.AllCitedBy)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citedByFamilyFromIdx = allCitedBy.findIndex((el) => /Family/i.test(el));
    return {
      citations: allCitations.slice(0, citationsFamilyFromIdx),
      citationsFamilyToFamily: allCitations.slice(citationsFamilyFromIdx + 1),
      citedBy: allCitedBy.slice(0, citedByFamilyFromIdx),
      citedByFamilyToFamily: allCitedBy.slice(citedByFamilyFromIdx + 1),
      similarDocuments: this.#html.querySelectorAll(this.select.SimilarDocuments)
        .map<string>(el => el.innerText.trim().replace(/\s+/g, ' ')),
    };
  }

  get applicationEvents(): PatentApplicationEvent[] {
    const applEvents = this.#html.querySelectorAll('.event.application-timeline.horizontal');
    return applEvents.map(el => ({
      date: el.querySelector('div:first-child')?.innerText.trim().replace(/\s+/g, ' '),
      assignee: el.querySelector('div:last-child')?.innerText.trim().replace(/\s+/g, ' '),
    }));
  }

  // get publicationYear(): Patent['publicationYear'] {
  //   return this.html.querySelector('.knowledge-card dl.scholar-result.key-dates a')?.innerText;
  // }

  get concepts(): Patent['concepts'] {
    const rows = this.#html.querySelectorAll('h3#concepts~.responsive-table .tbody>div.tr').map(row => {
      const [name,/*image*/, sections, _count] = row.querySelectorAll('span.td');
      const count = +_count.innerText.trim().replace(/\s+/g, ' ');
      return {
        name: name.innerText.trim().replace(/\s+/g, ' '),
        // image: image, // unknown type
        sections: sections.innerText.trim().replace(/\s+/g, ' '), // delimiter: ','
        count: Number.isNaN(count) ? undefined : count,
      };
    });
    const [table, csv] = [rows, this.#conceptsCSV];
    return range(rows.length).map((i) => {
      const [htmlR, csvR] = [table.at(i), csv?.at(i)];
      return ({
        name: csvR?.name || htmlR?.name,
        domain: csvR?.domain,
        smiles: csvR?.smiles,
        inchiKey: csvR?.inchi_key,
        count: htmlR?.count,
        sections: csvR?.sections.split('|') || htmlR?.sections.split(','),
      });
    });
  }
}

type ConceptFromCsv = {
  name: string, // 'chemical reaction',
  domain: string, // 'Methods',
  smiles: string, // '',
  inchi_key: string, // '',
  // 'query match': string, // '0.000',
  sections: string, // 'claims|description', delimiter: '|'
}
