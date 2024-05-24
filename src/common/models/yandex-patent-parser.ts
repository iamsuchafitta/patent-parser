import { type HTMLElement, parse as parseHtml } from 'node-html-parser';
import type { Page, WaitForSelectorOptions } from 'puppeteer';
import type { PatentYandexEntity } from '../../store/patent-yandex-store/patent-yandex.types.js';

// :contains() pseudo-class isn't supported by the native DOM API, but node-html-parser supports it. Info:
// http://www.w3.org/TR/css3-selectors/#content-selectors

export class YandexPatentParser {
  public static readonly select = {
    id: '.doc-url-item',
    title: '.document-title',
  } as const;

  readonly #html: HTMLElement;

  private constructor(
    args: { html: HTMLElement },
  ) {
    this.#html = args.html;
  }

  public static async puppeteerWait(page: Page, opts?: WaitForSelectorOptions) {
    await page.waitForSelector(YandexPatentParser.select.id, opts);
  }

  public static parse(args: { html: string, url: string }): PatentYandexEntity {
    const parser = new YandexPatentParser({ html: parseHtml(args.html) });
    return {
      id: parser.id,
      url: args.url,
      title: parser.title,
      authors: parser.authors,
      assignees: parser.assignees,
      applicationDate: parser.applicationDate,
      publishedDate: parser.publishedDate,
      abstract: parser.abstract,
      claims: parser.claims,
      description: parser.description,
      classifications: parser.classifications,
      relations: parser.relations,
      fipsUrl: parser.fipsUrl,
    };
  }

  get id() {
    return this.#html.querySelectorAll(YandexPatentParser.select.id)
      .map(el => el.structuredText.clean())
      .filter(Boolean).join(' ');
  }

  get title() {
    return this.#html.querySelector(YandexPatentParser.select.title)?.structuredText.clean();
  }

  get authors() {
    // language=JQuery-CSS
    const authorsDiv = this.#html.querySelector('.header-title-item:contains("Авторы:")+.header-content-item');
    return authorsDiv?.structuredText.split('\n').map(author => author.clean()).filter(Boolean);
  }

  get assignees() {
    // language=JQuery-CSS
    const authorsDiv = this.#html.querySelector('.header-title-item:contains("Патентообладатели:")+.header-content-item');
    return authorsDiv?.structuredText.split('\n').map(author => author.clean()).filter(Boolean);
  }

  get applicationDate() {
    // language=JQuery-CSS
    const authorsDiv = this.#html.querySelector('.header-title-item:contains("Дата подачи заявки: ")+.header-content-item');
    return authorsDiv?.structuredText.clean().replace(/\./g, '-');
  }

  get publishedDate() {
    // language=JQuery-CSS
    const authorsDiv = this.#html.querySelector('.header-title-item:contains("Опубликовано: ")+.header-content-item');
    return authorsDiv?.structuredText.clean().replace(/\./g, '-');
  }

  get abstract() {
    return this.#html.querySelector('#doc-abstract+.doc-text')?.structuredText.structuredClean();
  }

  get claims() {
    return this.#html.querySelector('#doc-claims+.doc-text')?.structuredText.structuredClean();
  }

  get description() {
    return this.#html.querySelector('#doc-description+.doc-text')?.structuredText.structuredClean();
  }

  get classifications() {
    return this.#html.querySelectorAll('div.header-mpk-item').slice(1)
      .map(el => el.firstChild?.innerText)
      .filter(Boolean);
  }

  get relations() {
    const getListFrom = (tableId: string) => this.#html
      .querySelectorAll(`#${tableId}+.doctable>.doctable_rows>.doctable_row>span:first-child`)
      .map(el => el.innerText.clean())
      .filter(Boolean);
    return {
      citations: getListFrom('doc-table-citation'),
      citedBy: getListFrom('doc-table-cited-by'),
      similarDocuments: getListFrom('doc-table-similars'),
    };
  }

  get fipsUrl() {
    return this.#html.querySelector('a.download-pdf-title-link')?.getAttribute('href');
  }
}
