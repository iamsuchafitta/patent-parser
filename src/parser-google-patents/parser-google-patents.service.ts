/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { AnonymousService } from '../anonymous/anonymous.service';
import parse from 'node-html-parser';
import { GooglePatentSelectors } from './parser-google-patents.constants';
import { GooglePatentParser } from './GooglePatentParser';
import { PatentStore } from '../store/patent-store/patent.store';
import type { QueueElement } from '../store/queue-store/queue-store.types';

/**
 * Сервис парсинга патентов.
 * Обрабатывает очередь парсинга патентов с Google Patents.
 * Парсит страницы патентов и сохраняет данные в БД.
 */
@Injectable()
export class ParserGooglePatentsService {

  constructor(
    private readonly anonymous: AnonymousService,
    private readonly patentStore: PatentStore,
  ) {}

  /**
   * Метод парсинга патента с Google Patents
   * Делает запрос по url, парсит страницу и сохраняет данные в БД.
   * @param elem Элемент очереди парсинга.
   * @returns void - Ничего не возвращает.
   */
  public async parseGooglePatent(elem: QueueElement) {
    // Функция выполняемая в браузере для клика по кнопке "Раскрыть классификации"
    const startCallback = () => {
      const moreClassifications = document.querySelector('classification-viewer.patent-result div.more:not([hidden])');
      if (moreClassifications) { // @ts-ignore
        moreClassifications.click();
      }
    };
    // Выполнение запроса и получение HTML разметки страницы
    const root = parse(await this.anonymous.getHtml({
      url: elem.url,
      waitSelector: GooglePatentSelectors.Title,
      evaluate: startCallback,
    }));
    const parser = new GooglePatentParser(elem.url, root);
    // Save
    await this.patentStore.patentUpsert({
      id: parser.id,
      urlGoogle: elem.url,
      title: parser.title,
      abstract: parser.abstract,
      description: parser.description,
      claims: parser.claims,
      classifications: parser.classifications,
      relations: parser.relations,
    });
  }
}
