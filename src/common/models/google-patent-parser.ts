import { range } from 'lodash-es';
import neatCsv from 'neat-csv';
import { type HTMLElement, parse as htmlParse } from 'node-html-parser';
import type {
  PatentGoogleRelations,
  PatentGoogleClaim,
  PatentGoogleClassification,
  PatentGoogleEntity,
  PatentGoogleApplicationEvent,
  PatentGoogleParsed,
  PatentGoogleConcept,
} from '../../store/patent-google-store/patent-google.types.js';

export class GooglePatentParser implements PatentGoogleParsed {
  private readonly select = {
    PubNum: 'h2#pubnum',
    PubNumFromUrl: /\/patent\/([A-Z]{2}\d+[A-Z]\d*)(\/|$)/,
    Title: 'h1#title',
    Abstract: 'div.abstract',
    Description: 'div.description-paragraph',
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

  private constructor(args: { url: string, html: HTMLElement }) {
    this.url = args.url;
    this.#html = args.html;
  }

  public static async parse(
    args: { url: string, html: string, conceptsCSVStr?: string },
  ): Promise<PatentGoogleParsed> {
    const parser = new GooglePatentParser({ url: args.url, html: htmlParse(args.html) });
    parser.#conceptsCSV = args.conceptsCSVStr ? await neatCsv<ConceptFromCsv>(args.conceptsCSVStr) : undefined;
    return {
      id: parser.id,
      url: args.url,
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

  get id(): PatentGoogleEntity['id'] {
    return this.#html.querySelector(this.select.PubNum)?.innerText.clean()
      || this.select.PubNumFromUrl.exec(this.url)?.[1] as string;
  }

  get title(): PatentGoogleEntity['title'] {
    return this.#html.querySelector(this.select.Title)?.innerText.clean();
  }

  get abstract(): PatentGoogleEntity['abstract'] {
    return this.#html.querySelector(this.select.Abstract)?.innerText.clean();
  }

  get description(): PatentGoogleEntity['description'] {
    return this.#html.querySelectorAll(this.select.Description)
      .map(el => el.innerText.clean())
      .join('\n\n') || undefined;
  }

  get claims(): PatentGoogleClaim[] {
    const claimsV1 = this.#html.querySelectorAll('div.claims>div');
    const claimsV2 = this.#html.querySelectorAll('ol.claims>li');
    const claimsElements = claimsV1.length > claimsV2.length ? claimsV1 : claimsV2;
    return claimsElements.map((el, i) => ({
      index: i,
      text: el.innerText.structuredClean(),
      isDependent: el.classList.contains('claim-dependent'),
    })).filter(claim => Boolean(claim.text));
  }

  get classifications(): PatentGoogleClassification[] {
    return this.#html.querySelectorAll(this.select.Classifications)
      .map(el => ({
        id: el.querySelector(this.select.ClassificationId)?.innerText.clean(),
        description: el.querySelector(this.select.ClassificationDescription)?.innerText.clean(),
      }));
  }

  get relations(): PatentGoogleRelations {
    // Citations
    const allCitations = this.#html.querySelectorAll(this.select.AllCitations)
      .map(el => (el.querySelector('a') || el).innerText.clean().clean());
    const citationsFamilyFromIdx = allCitations.findIndex((el) => /Family/i.test(el));
    // Cited by
    const allCitedBy = this.#html.querySelectorAll(this.select.AllCitedBy)
      .map(el => (el.querySelector('a') || el).innerText.clean());
    const citedByFamilyFromIdx = allCitedBy.findIndex((el) => /Family/i.test(el));
    return {
      citations: allCitations.slice(0, citationsFamilyFromIdx),
      citationsFamilyToFamily: allCitations.slice(citationsFamilyFromIdx + 1),
      citedBy: allCitedBy.slice(0, citedByFamilyFromIdx),
      citedByFamilyToFamily: allCitedBy.slice(citedByFamilyFromIdx + 1),
      similarDocuments: this.#html.querySelectorAll(this.select.SimilarDocuments)
        .map<string>(el => el.innerText.clean()),
    };
  }

  get applicationEvents(): PatentGoogleApplicationEvent[] {
    const applEvents = this.#html.querySelectorAll('.event.application-timeline.horizontal');
    return applEvents.map(el => ({
      date: el.querySelector('div:first-child')?.innerText.clean(),
      assignee: el.querySelector('div:last-child')?.innerText.clean(),
    }));
  }

  // get publicationYear(): Patent['publicationYear'] {
  //   return this.html.querySelector('.knowledge-card dl.scholar-result.key-dates a')?.innerText;
  // }

  get concepts(): PatentGoogleConcept[] {
    const rows = this.#html.querySelectorAll('h3#concepts~.responsive-table .tbody>div.tr').map(row => {
      const [name,/*image*/, sections, _count] = row.querySelectorAll('span.td');
      const count = +_count.innerText.clean();
      return {
        name: name.innerText.clean(),
        // image: image, // unknown type
        sections: sections.innerText.clean(), // delimiter: ','
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
