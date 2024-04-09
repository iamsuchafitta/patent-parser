import { uniq } from 'lodash-es';
import { parse as parseHtml, type HTMLElement } from 'node-html-parser';
import type { Article, ArticleParsed } from '../../store/article.store/article.types.js';

export class ArticleRajpubParser implements ArticleParsed {
  private readonly select = {
    title: '.obj_article_details h1.page_title',
    journalName: 'header#headerNavigationContainer .pkp_site_name a.is_text',
    authors: '.obj_article_details ul.authors li',
    organizations: '.obj_article_details ul.authors li .affiliation',
    date: '.obj_article_details div.entry_details div.published section.sub_item div.value span',
    abstract: '.obj_article_details section.item.abstract',
    pdfAnchor: '.obj_article_details div.entry_details ul.galleys_links li a.pdf',
  } as const;

  readonly #html: HTMLElement;

  private constructor(html: string) {
    this.#html = parseHtml(html);
  }

  public static parse(html: string): ArticleParsed {
    const parser = new ArticleRajpubParser(html);
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
    return this.#html.querySelector(this.select.title)?.structuredText.clean();
  }

  public get journalName(): Article['journalName'] {
    return this.#html.querySelector(this.select.journalName)?.structuredText?.clean();
  }

  public get authors(): Article['authors'] {
    const orgs = this.organizations;
    return this.#html.querySelectorAll(this.select.authors).map(li => {
      const org = li.querySelector('span.affiliation')?.structuredText.clean();
      return ({
        name: li.querySelector('span.name')?.structuredText.clean(),
        organizations: org && orgs ? [orgs.indexOf(org) + 1] : undefined,
      });
    });
  }

  public get organizations(): Article['organizations'] {
    return uniq(this.#html.querySelectorAll(this.select.organizations).map(org => org.structuredText.clean()));
  }

  public get date(): Article['date'] {
    // Example: "2024-04-12"
    return this.#html.querySelector(this.select.date)?.structuredText.clean();
  }

  public get abstract(): Article['abstract'] {
    const abstractBlock = this.#html.querySelector(this.select.abstract);
    const paragraph = abstractBlock?.querySelector('p')?.structuredText.trim();
    return paragraph || abstractBlock?.structuredText.trim().replace(/^Abstract\n/, '').trim();
  }

  public get pdfUrl(): Article['pdfUrl'] {
    return this.#html.querySelector(this.select.pdfAnchor)?.getAttribute('href')?.trim();
  }
}
