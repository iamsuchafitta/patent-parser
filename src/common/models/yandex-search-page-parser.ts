import { isNil, values } from 'lodash-es';
import { type HTMLElement, parse as htmlParse } from 'node-html-parser';
import type { Page, WaitForSelectorOptions } from 'puppeteer';

export class YandexSearchPageParser {
  public static readonly select = {
    docs: 'div.result-page div.snippet-block a.snippet-title',
    totalFoundedDocs: 'div.contentRight div.search-summary',
  } as const;

  readonly #html: HTMLElement;

  constructor(args: { htmlStr: string }) {
    this.#html = htmlParse(args.htmlStr);
  }

  public static async puppeteerWait(page: Page, opts?: WaitForSelectorOptions) {
    await Promise.all(values(YandexSearchPageParser.select).map(selector => page.waitForSelector(selector, opts)));
  }

  get documents(): { href: string, title: string }[] {
    return this.#html.querySelectorAll(YandexSearchPageParser.select.docs).reduce((acc, a) => {
      const href = a.getAttribute('href')?.clean();
      return href ? [...acc, {
        title: a.innerText.clean(),
        href: new URL(href, 'https://yandex.ru/patents').href,
      }] : acc;
    }, []);
  }

  get totalFoundedDocs(): number {
    const b = this.#html.querySelector(YandexSearchPageParser.select.totalFoundedDocs);
    const count = b?.innerText.clean().match(/(?<=Нашлось документов: )\d+/)?.at(0)?.toInt();
    if (isNil(count) || Number.isNaN(count)) {
      throw new Error('Can not parse total founded docs count');
    }
    return count;
  }
}
