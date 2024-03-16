/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ms from 'ms';
import { PatentParseQueue, PatentRelation, PatentRelationTypeEnum, Prisma } from '@prisma/client';
import { AppConfig } from '../common/app-config';
import { AnonymousService } from '../anonymous/anonymous.service';
import { merge } from 'lodash';
import { Interval } from '@nestjs/schedule';
import { PROCESSING_TIMEOUT } from '../app.constants';
import parse from 'node-html-parser';
import { GooglePatentSelectors } from './parser.constants';

/**
 * Сервис парсинга патентов.
 * Обрабатывает очередь парсинга патентов с Google Patents.
 * Парсит страницы патентов и сохраняет данные в БД.
 */
@Injectable()
export class ParserService implements OnModuleInit {
  private readonly logger = new Logger(ParserService.name);
  /**
   * Счетчик текущих обрабатываемых запросов.
   */
  public currentProcessing: number = 0;

  constructor(
    private readonly prisma: PrismaService,
    private readonly anonymous: AnonymousService,
  ) {}

  /**
   * Метод инициализации сервиса.
   */
  async onModuleInit() {
    // Мгновенно запускаем обработку очереди парсинга, чтобы не ждать 5 секунд.
    this.processQueue().then();
  }

  /**
   * Метод обработки очереди парсинга патентов.
   * Вызывается при инициализации сервиса (в onModuleInit()) и каждые 5 секунд.
   * @returns void - Ничего не возвращает.
   */
  @Interval(ms('5s'))
  async processQueue() {
    // Если количество обрабатываемых запросов превышает лимит, то ничего делать не нужно.
    if (this.currentProcessing >= AppConfig.concurrentRequests) return;
    // Получение элементов очереди парсинга в одной транзакции.
    const queueElements = await this.prisma.$transaction(async tr => {
      // Извлекаем необходимо кол-во элементов и блокируем их в БД.
      // Игнорируем элементы, которые уже обрабатываются больше чем PROCESSING_TIMEOUT.
      const elements = await tr.$queryRaw<PatentParseQueue[]>`
          SELECT *
          FROM "PatentParseQueue"
          WHERE "startedAt" IS NULL
             OR "startedAt" <= ${PROCESSING_TIMEOUT.getDate()}::TIMESTAMPTZ
          ORDER BY "createdAt"
          LIMIT ${AppConfig.concurrentRequests - this.currentProcessing} FOR UPDATE SKIP LOCKED;
      `;
      // Обновляем время начала обработки и кол-во попыток.
      for (const elem of elements) {
        merge(elem, await tr.patentParseQueue.update({
          where: { url: elem.url },
          data: {
            startedAt: new Date(),
            tries: { increment: 1 },
          },
        }));
      }
      return elements;
    });
    // Увеличиваем счетчик текущих обрабатываемых запросов.
    this.currentProcessing += queueElements.length;
    // По каждому полученному элементу очереди начинаем парсинг.
    for (const qElement of queueElements) {
      this.logger.log(`Processing... ${qElement.url}`);
      // parseGooglePatent - асинхронный метод, но здесь мы не ждём конца его выполнения.
      this.parseGooglePatent(qElement).then(async () => {
        this.logger.log(`DONE! ${qElement.url}`);
        // При успешном завершении удаляем элемент из очереди.
        await this.prisma.patentParseQueue.delete({ where: { url: qElement.url } }).catch(() => null);
      }).catch(async (err) => {
        this.logger.error(`Error processing ${qElement.url}, ${err.message}`);
        // В finally, независимо от успеха или ошибки: уменьшаем счетчик текущих обрабатываемых запросов.
      }).finally(() => --this.currentProcessing);
      // Во избежание перегрузки делаем паузу в 1 секунду перед обработкой следующего элемента.
      await new Promise((resolve) => setTimeout(resolve, ms('1s')));
    }
  }

  /**
   * Метод парсинга патента с Google Patents
   * Делает запрос по url, парсит страницу и сохраняет данные в БД.
   * @param elem Элемент очереди парсинга.
   * @returns void - Ничего не возвращает.
   */
  public async parseGooglePatent(elem: PatentParseQueue) {
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
    // Basic fields
    const id = root.querySelector(GooglePatentSelectors.PubNum)?.innerText.trim().replace(/\s+/g, ' ')
      || GooglePatentSelectors.PubNumFromUrl.exec(elem.url)?.[1] as string;
    const title = root.querySelector(GooglePatentSelectors.Title)?.innerText.trim().replace(/\s+/g, ' ');
    const abstract = root.querySelector(GooglePatentSelectors.Abstract)?.innerText.trim().replace(/\s+/g, ' ');
    const description = root.querySelectorAll(GooglePatentSelectors.Description)
      .map(el => el.innerText.trim().replace(/\s+/g, ' '))
      .join('\n\n') || undefined;
    const claims = root.querySelectorAll(GooglePatentSelectors.Claims)
      .map((el, i) => ({
        index: i,
        text: el.innerText.trim().replace(/\s+/g, ' '),
        isDependent: el.classList.contains('claim-dependent'),
      }));
    // Classifications
    const classifications = root.querySelectorAll(GooglePatentSelectors.Classifications)
      .map(el => ({
        id: el.querySelector(GooglePatentSelectors.ClassificationId)?.innerText.trim().replace(/\s+/g, ' '),
        description: el.querySelector(GooglePatentSelectors.ClassificationDescription)?.innerText.trim().replace(/\s+/g, ' '),
      }));
    // Citations
    const allCitations = root.querySelectorAll(GooglePatentSelectors.AllCitations)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citationsFamilyFromIdx = allCitations.findIndex((el) => /Family/i.test(el));
    const citations = allCitations.slice(0, citationsFamilyFromIdx).map(el => ({ id: el, type: PatentRelationTypeEnum.Citation }));
    const citationFamilyToFamily = allCitations.slice(citationsFamilyFromIdx + 1).map(el => ({
      id: el,
      type: PatentRelationTypeEnum.CitationFamilyToFamily,
    }));
    // Cited by
    const allCitedBy = root.querySelectorAll(GooglePatentSelectors.AllCitedBy)
      .map(el => (el.querySelector('a') || el).innerText.trim().replace(/\s+/g, ' '));
    const citedByFamilyFromIdx = allCitedBy.findIndex((el) => /Family/i.test(el));
    const citedBy = allCitedBy.slice(0, citedByFamilyFromIdx).map(el => ({ id: el, type: PatentRelationTypeEnum.CitedBy }));
    const citedByFamilyToFamily = allCitedBy.slice(citedByFamilyFromIdx + 1).map(el => ({
      id: el,
      type: PatentRelationTypeEnum.CitedByFamilyToFamily,
    }));
    // Similar documents
    const similarDocuments = root.querySelectorAll(GooglePatentSelectors.SimilarDocuments)
      .map(el => el.innerText.trim().replace(/\s+/g, ' '))
      .map(el => ({ id: el, type: PatentRelationTypeEnum.SimilarDocument }));
    // Concat relations
    const relations: PatentRelation[] = [
      ...citations,
      ...citationFamilyToFamily,
      ...citedBy,
      ...citedByFamilyToFamily,
      ...similarDocuments,
    ].map(relation => ({
      patentMainId: id,
      type: relation.type,
      patentOtherId: relation.id,
    }));
    // Save
    await this.savePatent({
      id,
      urlGoogle: elem.url,
      title,
      abstract,
      description,
      claims,
      classifications,
    }, relations);
  }

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @param relations Связи патента с другими патентами.
   * @returns void - Ничего не возвращает.
   */
  async savePatent(patent: Prisma.PatentCreateInput, relations: PatentRelation[]) {
    await this.prisma.$transaction(async tr => {
      await tr.patent.upsert({
        where: { id: patent.id },
        create: patent,
        update: patent,
      });
      for (const relation of relations) {
        const data = {
          type: relation.type,
          patentMainId: patent.id,
          patentOtherId: relation.patentOtherId,
        };
        await tr.patentRelation.upsert({
          where: { type_patentMainId_patentOtherId: data },
          create: data,
          update: data,
        });
      }
    }, { timeout: ms('1m') });
  }
}
