import dayjs from 'dayjs';
import { parse as parseHtml, type HTMLElement } from 'node-html-parser';
import type { Article, ArticleParsed } from '../../store/article.store/article.types.js';

export class ArticleIoffeParser implements ArticleParsed {
  readonly #domain = 'https://journals.ioffe.ru';

  readonly #select = {
    title: 'div.art_title',
    journalName: 'section#header div.main-title>a[href^="/journals"]',
    authors: 'div.art_authors .authors',
    organizations: 'div.art_authors .organizations',
    date: 'div.art_date_online',
    abstract: 'div#yw2_tab_0, div#yw4_tab_0',
    pdfAnchor: 'div.art_pdf a',
  } as const;

  readonly #html: HTMLElement;

  private constructor(html: string) {
    this.#html = parseHtml(html);
  }

  public static parse(html: string): ArticleParsed {
    const parser = new ArticleIoffeParser(html);
    return {
      title: parser.title,
      journalName: parser.journalName,
      authors: parser.authors,
      organizations: parser.organizations,
      date: parser.date,
      abstract: parser.abstract,
      pdfUrl: parser.pdfUrl,
    };
  }

  public get title(): Article['title'] {
    return this.#html.querySelector(this.#select.title)?.structuredText.clean();
  }

  public get journalName(): Article['journalName'] {
    return this.#html.querySelector(this.#select.journalName)?.structuredText.clean();
  }

  public get authors(): Article['authors'] {
    return this.#html.querySelector(this.#select.authors)?.structuredText.trim()
      ?.replace(/(?<=\d|\.)\s*,\s*(?=[А-ЯЁа-яёA-Za-z])/igm, '<SPLITTER>')
      .split('<SPLITTER>')
      .map((author) => {
        const match = author.clean().match(/^(?<name>.*?)\s*(?<orgs>(\d\s*,?\s*)*)$/);
        return {
          name: match?.groups?.name.clean(),
          organizations: match?.groups?.orgs.split(',').map(n => +n.clean()).filter(Boolean),
        };
      });
  }

  public get organizations(): Article['organizations'] {
    return this.#html.querySelector(this.#select.organizations)?.structuredText.trim()
      ?.split('\n')
      .map((org) => org.clean().replace(/^\d+/, ''))
      .filter(Boolean);
  }

  public get date(): Article['date'] {
    // Examples: Выставление онлайн: 30 декабря 2023 г.
    //           Выставление онлайн: 9 апреля 2024 г.
    const text = this.#html.querySelector(this.#select.date)?.structuredText.clean();
    const rez = text?.match(/\d+ [а-яё]+ \d{4}/i)?.at(0);
    return rez && dayjs(rez, 'D MMMM YYYY', 'ru').utc(true).format('YYYY-MM-DD');
  }

  public get abstract(): Article['abstract'] {
    return this.#html.querySelector(this.#select.abstract)?.structuredText.trim();
  }

  public get pdfUrl(): Article['pdfUrl'] {
    return this.#html.querySelector(this.#select.pdfAnchor)?.getAttribute('href')?.replace(/^/, this.#domain);
  }
}
