/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ms from 'ms';
import { MonitorLogTypeEnum, PatentParseQueue, PatentRelation, PatentRelationTypeEnum, Prisma } from '@prisma/client';
import { AppConfig } from '../common/app-config';
import { AnonymousService } from '../anonymous/anonymous.service';
import { merge } from 'lodash';
import { Interval } from '@nestjs/schedule';
import { PROCESSING_TIMEOUT } from '../app.constants';
import parse from 'node-html-parser';
import { EngineEnum, GooglePatentSelectors } from './parser.constants';
import { WsEvents } from '../common/pub-sub/pub-sub.constants';
import { AppEventEmitter } from '../common/pub-sub/app-event-emitter';

@Injectable()
export class ParserService implements OnModuleInit {
  public currentProcessing: number = 0;

  constructor(
    private readonly prisma: PrismaService,
    private readonly anonymous: AnonymousService,
  ) {}

  async onModuleInit() {
    this.processQueue().then();
  }

  @Interval(ms('5s'))
  async processQueue() {
    if (this.currentProcessing >= AppConfig.concurrentRequests) return;
    const queueElements = await this.prisma.$transaction(async tr => {
      const elements = await tr.$queryRaw<PatentParseQueue[]>`
          SELECT *
          FROM "PatentParseQueue"
          WHERE "startedAt" IS NULL
             OR "startedAt" <= ${PROCESSING_TIMEOUT.getDate()}::TIMESTAMPTZ
          ORDER BY "createdAt"
          LIMIT ${AppConfig.concurrentRequests - this.currentProcessing}
          FOR UPDATE SKIP LOCKED;
      `;
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
    this.currentProcessing += queueElements.length;
    AppEventEmitter.MonitorStatCreate();
    for (const qElement of queueElements) {
      AppEventEmitter.MonitorLogCreated(MonitorLogTypeEnum.Info, `Processing... ${qElement.url}`);
      this.parseGooglePatent(qElement).then(async () => {
        AppEventEmitter.MonitorLogCreated(MonitorLogTypeEnum.Info, `DONE! ${qElement.url}`);
        await this.prisma.patentParseQueue.delete({ where: { url: qElement.url } }).catch(() => null);
      }).catch(async (err) => {
        AppEventEmitter.MonitorLogCreated(MonitorLogTypeEnum.Error, `Error processing ${qElement.url}, ${err.message}`);
      }).finally(() => {
        this.currentProcessing -= 1;
      });
      await new Promise((resolve) => setTimeout(resolve, ms('1s')));
    }
  }

  public async parseGooglePatent(elem: PatentParseQueue, engine: EngineEnum = EngineEnum.Puppeteer) {
    const startCallback = () => {
      const moreClassifications = document.querySelector('classification-viewer.patent-result div.more:not([hidden])');
      if (moreClassifications) { // @ts-ignore
        moreClassifications.click();
      }
    };
    const root = parse(await this.anonymous.getHtml({
      url: elem.url,
      engine,
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
