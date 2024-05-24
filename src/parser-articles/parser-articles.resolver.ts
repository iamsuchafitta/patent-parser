import * as util from 'node:util';
import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLJSON, GraphQLPositiveInt } from 'graphql-scalars';
import { flow, isNil, values, range, throttle, flatten } from 'lodash-es';
import ms from 'ms';
import { parse as parseHtml, type HTMLElement } from 'node-html-parser';
import pMap from 'p-map';
import pRetry from 'p-retry';
import { RajpubJournalsOfArticlesEnum } from './enums/articles-rajpub-journal.enum.js';
import { IoffeJournalsOfArticlesEnum } from './enums/ioffe-journals-of-articles.enum.js';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { nullable } from '../common/utils.js';
import { ArticleStore } from '../store/article-store/article.store.js';
import { QueueStore } from '../store/queue-store/queue.store.js';
import { QueueElementTypeEnum } from '../store/queue-store/queue.types.js';


@Resolver()
export class ParserArticlesResolver {
  private readonly logger = new Logger(ParserArticlesResolver.name);

  constructor(
    private readonly anonymous: AnonymousService,
    private readonly queueStore: QueueStore,
    private readonly articleStore: ArticleStore,
  ) {}

  @Mutation(() => GraphQLJSON, {
    description: 'Добавление RU статей в очередь на парсинг с сайта journals.ioffe.ru',
  })
  public async enqueueArticlesRU(
    @Args('journalIds', {
      type: () => [IoffeJournalsOfArticlesEnum],
      defaultValue: values(IoffeJournalsOfArticlesEnum),
    }) journalIds: IoffeJournalsOfArticlesEnum[],
    @Args('isIgnoreExisting', { defaultValue: true, description: 'Игнорировать уже существующие статьи в БД' }) isIgnoreExisting: boolean,
    @Args('yearFrom', { nullable, type: () => GraphQLPositiveInt, description: 'С года' }) yearFrom?: number,
    @Args('yearTo', { nullable, type: () => GraphQLPositiveInt, description: 'До года (включительно)' }) yearTo?: number,
    @Args('limit', { nullable, type: () => GraphQLPositiveInt }) limit?: number,
  ) {
    this.logger.log(`enqueueArticlesRU(${util.inspect({ journalIds, yearFrom, yearTo, limit })})`);
    const domain = 'https://journals.ioffe.ru';
    const abortController = new AbortController();
    const retries = 9; // Reties per request
    let completed = 0;
    const LogName = '[Ioffe]';
    const logger = throttle((msg: string) => this.logger.log(msg), ms('5s'));
    /**
     * Получение ссылок на журналы
     */
    const journalUrls = journalIds.map(journal => `${domain}/journals/${journal}`);
    /**
     Запрос HTML кода страниц журналов
     */
    const journalsPages = await pMap(journalUrls, async (journalUrl) => {
      const journalsPage = await pRetry(async () => await this.anonymous.axios.get(journalUrl, {
        signal: abortController.signal,
      }).then(res => res.data), {
        retries,
        shouldRetry: pShouldRetry(abortController),
        signal: abortController.signal,
        onFailedAttempt: (err) => this.logger.warn(`${LogName} Journal [${journalUrl}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
      }).then(parseHtml);
      logger(`${LogName} Journal ${++completed}/${journalUrls.length} Done!`);
      return journalsPage;
    }, { concurrency: 5, signal: abortController.signal });
    completed = 0;
    logger.flush();
    /**
     * Парсинг ссылок на выпуски со страниц журналов
     */
    const issuesUrls = flow(
      () => journalsPages.flatMap(page => page.querySelectorAll('ul#yw1>li')),
      yearIssuesList => yearIssuesList.filter(issue => {
        const year = +(issue.innerText.trim().slice(0, 4) || NaN);
        return (isNil(yearFrom) || isFinite(year) && year >= yearFrom) && (isNil(yearTo) || isFinite(year) && year <= yearTo);
      }),
      yearIssuesList => yearIssuesList.flatMap(issue => issue.querySelectorAll('a')),
      issuesAnchors => issuesAnchors.map(a => a.getAttribute('href')),
      issuesHrefs => issuesHrefs.filter(Boolean),
      issuesHrefs => issuesHrefs.map(href => `${domain}${(href)}`),
    )();
    this.logger.log(`${LogName} journals=${journalsPages.length}, issues=${issuesUrls.length}`);
    /**
     * Получение HTML страниц выпусков
     */
    const issuesPages = await pMap(issuesUrls, (issueUrl) => pRetry(async () => {
      const issuesPage = await this.anonymous.axios.get(issueUrl, { signal: abortController.signal }).then(res => res.data).then(parseHtml);
      logger(`${LogName} Issue ${++completed}/${issuesUrls.length} Done!`);
      return issuesPage;
    }, {
      retries,
      shouldRetry: pShouldRetry(abortController),
      signal: abortController.signal,
      onFailedAttempt: (err) => this.logger.warn(`${LogName} Issue [${issueUrl}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
    }), { concurrency: 20, signal: abortController.signal });
    completed = 0;
    logger.flush();
    /**
     * Парсинг ссылок на статьи со страниц выпусков
     */
    let articlesUrls = flow(
      () => issuesPages.flatMap(page => page.querySelectorAll('div.issue_art div.issue_art_title a')),
      articlesAnchors => articlesAnchors.map(a => a.getAttribute('href')),
      issuesUrls => issuesUrls.filter(Boolean),
      issuesHrefs => issuesHrefs.map(href => href && `${domain}${(href)}`),
    )();
    const articlesFound = articlesUrls.length;
    articlesUrls = await flow(
      urls => urls.slice(0, limit),
      urls => isIgnoreExisting ? this.articleStore.filterNotExisting(urls) : urls,
    )(articlesUrls);
    /**
     * Добавление статей в очередь
     */
    const articlesEnqueued = await this.queueStore.queueCreateMany(articlesUrls.map(url => ({
      type: QueueElementTypeEnum.ArticleRU,
      url,
    })));
    const response = {
      journals: journalsPages.length,
      issues: issuesPages.length,
      articlesFound,
      articlesEnqueued,
    };
    this.logger.log(`${LogName} Finished: ${util.inspect(response)}`);
    return response;
  }

  @Mutation(() => GraphQLJSON, {
    description: 'Добавление EN статей в очередь на парсинг с сайта rajpub.com',
  })
  async enqueueArticlesEN(
    @Args('journalIds', {
      type: () => [RajpubJournalsOfArticlesEnum],
      defaultValue: values(RajpubJournalsOfArticlesEnum),
    }) journalIds: RajpubJournalsOfArticlesEnum[],
    @Args('isIgnoreExisting', { defaultValue: true, description: 'Игнорировать уже существующие статьи в БД' }) isIgnoreExisting: boolean,
    @Args('yearFrom', { nullable, type: () => GraphQLPositiveInt, description: 'С года' }) yearFrom?: number,
    @Args('yearTo', { nullable, type: () => GraphQLPositiveInt, description: 'До года (включительно)' }) yearTo?: number,
    @Args('limit', { nullable, type: () => GraphQLPositiveInt }) limit?: number,
  ) {
    this.logger.log(`enqueueArticlesEN(${util.inspect({ journalIds, yearFrom, yearTo, limit })})`);
    const abortController = new AbortController();
    let completed = 0;
    const LogName = '[Rajpub]';
    const retries = 9; // Reties per request
    const logger = throttle((msg: string) => this.logger.log(msg), ms('5s'));
    const getIssuesUrls = (html: HTMLElement) => html.querySelectorAll('.issues_archive .obj_issue_summary h2 a').map(a => a.getAttribute('href')).filter(Boolean);
    const getJournalHtml = async (pageUrl: string) => await pRetry(async () => await this.anonymous.axios.get<string>(pageUrl, {
      signal: abortController.signal,
    }).then(res => res.data), {
      retries,
      shouldRetry: pShouldRetry(abortController),
      signal: abortController.signal,
      onFailedAttempt: (err) => this.logger.warn(`${LogName} Journal [${pageUrl}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
    }).then(parseHtml);
    /**
     * Первичный запрос на страницы журналов с парсингом ссылок выпусков + определением количества страниц.
     */
    const initialResults = await pMap(journalIds, async (journalId) => {
      const pageUrl = `https://rajpub.com/index.php/${journalId}/issue/archive`;
      const html = await getJournalHtml(pageUrl);
      // Pagination for example: "1-25 of 62"
      const [, perPage, totalDocs] = html.querySelector('.cmp_pagination .current')?.innerText.match(/-(\d+) of (\d+)/) || [];
      const totalPages = Math.ceil(+totalDocs / +perPage);
      logger(`${LogName} Initial journal request ${++completed}/${journalIds.length} done!`);
      return {
        issuesUrls: getIssuesUrls(html),
        journalPagesUrls: range(2, (totalPages || 1) + 1).map(page => `${pageUrl}/${page}`),
      };
    }, { concurrency: 5, signal: abortController.signal }).then(pages => pages.filter(Boolean));
    completed = 0;
    logger.flush();
    /**
     * Парсинг ссылок выпусков на оставшихся страницах.
     */
    const additionalJournalPagesUrls = initialResults.flatMap(({ journalPagesUrls }) => journalPagesUrls);
    const issuesUrls = await pMap(additionalJournalPagesUrls, async pageUrl => {
      const html = await getJournalHtml(pageUrl);
      logger(`${LogName} Journal request ${++completed}/${additionalJournalPagesUrls.length} done!`);
      return getIssuesUrls(html);
    }, { concurrency: 5, signal: abortController.signal })
      .then(urls => urls.concat(initialResults.flatMap(({ issuesUrls }) => issuesUrls)))
      .then(flatten);
    completed = 0;
    logger.flush();
    /**
     * Парсинг ссылок на статьи со страниц выпусков
     */
    let articlesUrls = await pMap(issuesUrls, async issueUrl => {
      const html = await pRetry(async () => await this.anonymous.axios.get<string>(issueUrl, {
        signal: abortController.signal,
      }).then(res => res.data), {
        retries,
        shouldRetry: pShouldRetry(abortController),
        signal: abortController.signal,
        onFailedAttempt: (err) => this.logger.warn(`${LogName} Issue ${issueUrl} attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
      }).then(parseHtml);
      logger(`${LogName} Issue request ${++completed}/${issuesUrls.length} done!`);
      // Example: Published: 2016-07-30
      const publishedYear = html.querySelector('div.obj_issue_toc div.published')?.innerText.trim().match(/(?<=Published:\s+)\d{4}(?=-\d\d-\d\d)/)?.[0].toInt();
      if (publishedYear && isFinite(publishedYear) && (isNil(yearFrom) || publishedYear >= yearFrom) && (isNil(yearTo) || publishedYear <= yearTo)) {
        return html.querySelectorAll('ul.articles h3.title a').map(a => a.getAttribute('href')).filter(Boolean);
      }
      return [];
    }, { concurrency: 20, signal: abortController.signal }).then(flatten);
    completed = 0;
    logger.flush();
    /**
     * Добавление статей в очередь
     */
    const articlesFound = articlesUrls.length;
    articlesUrls = await flow(
      urls => urls.slice(0, limit),
      urls => isIgnoreExisting ? this.articleStore.filterNotExisting(urls) : urls,
    )(articlesUrls);
    const articlesEnqueued = await this.queueStore.queueCreateMany(articlesUrls.map(url => ({
      type: QueueElementTypeEnum.ArticleEN,
      url,
    })));
    const response = {
      journals: journalIds.length,
      issues: issuesUrls.length,
      articlesFound,
      articlesEnqueued,
    };
    this.logger.log(`${LogName} Finished: ${util.inspect(response)}`);
    return response;
  }
}
