/* eslint-disable @typescript-eslint/ban-ts-comment */
import events from 'node:events';
import net from 'node:net';
import process from 'node:process';
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import Axios, { type AxiosInstance, type AxiosError } from 'axios';
import { random, compact } from 'lodash-es';
import ms from 'ms';
import puppeteer from 'puppeteer-extra';
import { SocksProxyAgent } from 'socks-proxy-agent';
import UserAgent from 'user-agents';
import { AppConfig } from '../common/app-config.js';

@Injectable()
export class AnonymousService {
  private readonly logger = new Logger(AnonymousService.name);
  private readonly userAgentGenerator = new UserAgent();
  /** Количество ошибок, после которого происходит сброс прокси */
  public readonly ERRORS_TO_PROXY_RESET = Math.ceil(AppConfig.proxy.ports.length * 0.35);
  /** Счетчик ошибок */
  private errorsCount = 0;
  /** Индекс следующего используемого порта прокси */
  private currentIndex = random(0, AppConfig.proxy.ports.length - 1);
  /** Промис, который уже сбрасывает прокси */
  private thereWasExceptionPromise: Promise<void> | null = null;
  /** Анонимный axios со случайным IP и UserAgent при каждом запросе */
  public readonly axios: AxiosInstance;

  constructor() {
    // Увеличиваем лимит количества слушателей событий для избежания утечек при использовании AbortController и запуске браузеров.
    process.setMaxListeners(AppConfig.concurrent.summaryLimit * 2);
    events.setMaxListeners(100);
    // Создание анонимного axios
    this.axios = Axios.create({
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: false,
    });
    this.axios.interceptors.request.use(async (config) => {
      const agent = new SocksProxyAgent(await this.getNextProxyUrl());
      config.httpAgent = agent;
      config.httpsAgent = agent;
      config.headers['User-Agent'] = this.userAgentGenerator.random().toString();
      return config;
    });
    this.axios.interceptors.response.use(undefined, async (error: AxiosError) => {
      // https://icanhazip.com
      // https://api.ipify.org
      // https://jsonip.com
      // const { data: ip } = await axios.get('https://api.ipify.org', {
      //   xsrfCookieName: 'csrftoken',
      //   xsrfHeaderName: 'X-CSRFToken',
      //   withCredentials: false,
      //   httpAgent: error.config!.httpAgent,
      //   httpsAgent: error.config!.httpsAgent,
      //   headers: { 'User-Agent': this.userAgentGenerator.random().toString() },
      // });
      if (error.code !== 'ERR_CANCELED') await this.thereWasException();
      throw error;
    });
  }

  /**
   * Получение следующего порта прокси
   * @returns {number} порт прокси
   */
  private async getNextProxyUrl(): Promise<string> {
    await this.thereWasExceptionPromise;
    const port = AppConfig.proxy.ports[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % AppConfig.proxy.ports.length;
    return `socks5://${AppConfig.proxy.host}:${port}`;
  }

  /**
   * Получение HTML страницы с использованием прокси
   * @param options параметры запроса
   */
  // public async getHtml(options: {
  //   url: string, // URL страницы
  //   waitSelector: string, // Селектор, который нужно дождаться для загрузки страницы
  //   evaluate?: () => void, // Функция, которая будет выполнена на странице
  // }) {
  //   const evaluateReturn = () => document.body.outerHTML;
  //   const browser = await this.startPuppeteer();
  //   const [page] = await browser.pages();
  //   try {
  //     await page.goto(options.url, { timeout: ms('60s') });
  //     await page.waitForSelector(options.waitSelector, { timeout: ms('60s') });
  //     if (options.evaluate) await page.evaluate(options.evaluate);
  //     return await page.evaluate(evaluateReturn);
  //   } catch (e) {
  //     await this.thereWasException();
  //     throw e;
  //   } finally {
  //     await browser.close();
  //   }
  // }

  /**
   * Запуск браузера с использованием прокси
   */
  public async startPuppeteer({ blockCSS = true, blockImg }: { blockCSS?: boolean, blockImg?: boolean } = {}) {
    const browser = await puppeteer.default.launch({
      args: [`--proxy-server=${await this.getNextProxyUrl()}`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
      headless: 'shell',
      // headless: true,
      // headless: false,
      ignoreHTTPSErrors: true,
    });
    const [page] = await browser.pages();
    if (blockCSS || blockImg) {
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const [url, resourceType] = [req.url(), req.resourceType()] as const;
        const isBlockedExt = blockImg && ['.jpg', '.png', '.svg'].some((ext) => url.endsWith(ext));
        const isBlockedType = compact<string>([blockImg && 'image', blockCSS && 'stylesheet']).includes(resourceType);
        return isBlockedType || isBlockedExt ? req.abort() : req.continue();
      });
    }
    return { browser, page };
  }

  /**
   * Запуск Axios с использованием прокси
   */
  // public async startAxios() {
  //   const agent = new SocksProxyAgent(await this.getNextProxyUrl());
  //   return Axios.create({
  //     headers: { 'User-Agent': this.userAgentGenerator.random().toString() },
  //     httpsAgent: agent,
  //     httpAgent: agent,
  //     xsrfCookieName: 'csrftoken',
  //     xsrfHeaderName: 'X-CSRFToken',
  //     withCredentials: false,
  //   });
  // }

  /**
   * Увеличение счетчика ошибок и сброс прокси, если счетчик достигнет лимита
   */
  public async thereWasException(ip?: string) {
    this.errorsCount += 1;
    const warnMsg = compact([
      `ExceptionsСount=${this.errorsCount}/${this.ERRORS_TO_PROXY_RESET}`,
      ip && `LastIP=${ip}`,
    ]).join(', ');
    if (this.errorsCount < this.ERRORS_TO_PROXY_RESET) {
      this.logger.warn(warnMsg);
    } else {
      if (!this.thereWasExceptionPromise) {
        this.logger.warn(`${warnMsg}. Resetting proxies...`);
        this.thereWasExceptionPromise = this.resetProxies().catch((error) => {
          this.logger.error(`Error resetting proxies: ${error.message}`);
          throw error;
        }).finally(() => this.thereWasExceptionPromise = null);
      }
      await this.thereWasExceptionPromise;
    }
  }

  /**
   * Сброс прокси
   */
  @Interval(ms('30m'))
  public async resetProxies() {
    const host = AppConfig.proxy.host;
    const port = AppConfig.proxy.controlPort;
    const command = 'SIGNAL NEWNYM'; // Команда для сброса прокси

    await new Promise((resolve, reject) => {
      const client = net.createConnection({ port, host }, () => {
        client.write('AUTHENTICATE ""\r\n'); // TODO: подставить пароль, если требуется
        client.write(`${command}\r\n`);
        client.write('QUIT\r\n');
      });
      client.on('error', (err) => reject(err));
      client.on('data', () => client.end());
      client.on('end', () => {
        this.logger.log(`Sent "${command}" to Tor ControlPort (${host}:${port}) successfully`);
        this.errorsCount = 0;
        resolve(true);
      });
    });
  }
}
