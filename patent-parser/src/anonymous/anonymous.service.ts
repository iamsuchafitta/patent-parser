/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from '../common/app-config';
import Axios from 'axios';
import net from 'node:net';
import { SocksProxyAgent } from 'socks-proxy-agent';
import ms from 'ms';
import { Interval } from '@nestjs/schedule';
import puppeteer from 'puppeteer-extra';
import { random } from 'lodash';
import process from 'node:process';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin())

@Injectable()
export class AnonymousService {
  private readonly logger = new Logger(AnonymousService.name);
  /* Количество ошибок, после которого происходит сброс прокси */
  public readonly ERRORS_TO_PROXY_RESET = Math.ceil(AppConfig.proxy.ports.length * 0.35);
  /* Счетчик ошибок */
  private errorsCount = 0;
  /* Индекс следующего используемого порта прокси */
  private currentIndex = random(0, AppConfig.proxy.ports.length - 1);
  /* Промис, который уже сбрасывает прокси */
  private thereWasExceptionPromise: Promise<void> | null = null;

  constructor() {
    // Увеличиваем лимит на количество слушателей событий, чтобы избежать предупреждений NodeJS.
    process.setMaxListeners(AppConfig.concurrentRequests * 2);
  }

  /**
   * Получение следующего порта прокси
   * @returns {number} порт прокси
   */
  getNextProxyPort(): number {
    const port = AppConfig.proxy.ports[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % AppConfig.proxy.ports.length;
    return port;
  }

  /**
   * Получение HTML страницы с использованием прокси
   * @param options параметры запроса
   */
  public async getHtml(options: {
    url: string, // URL страницы
    waitSelector: string, // Селектор, который нужно дождаться для загрузки страницы
    evaluate?: () => void, // Функция, которая будет выполнена на странице
  }) {
    const evaluateReturn = () => document.body.outerHTML;
    const browser = await this.startPuppeteer();
    const [page] = await browser.pages();
    try {
      await page.goto(options.url);
      await page.waitForSelector(options.waitSelector, { timeout: ms('20s') });
      if (options.evaluate) await page.evaluate(options.evaluate);
      return await page.evaluate(evaluateReturn);
    } catch (e) {
      await this.thereWasException();
      throw e;
    } finally {
      await browser.close();
    }
  }

  /**
   * Запуск браузера с использованием прокси
   */
  public async startPuppeteer() {
    return puppeteer.launch({
      args: [
        `--proxy-server=socks5://${AppConfig.proxy.host}:${this.getNextProxyPort()}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
      headless: 'new',
      ignoreHTTPSErrors: true,
    });
  }

  /**
   * Запуск Axios с использованием прокси
   */
  public startAxios() {
    const agent = new SocksProxyAgent(`socks5://${AppConfig.proxy.host}:${this.getNextProxyPort()}`);
    return Axios.create({
      // headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0' },
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36' },
      httpsAgent: agent,
      httpAgent: agent,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: false,
    });
  }

  /**
   * Увеличение счетчика ошибок и сброс прокси, если счетчик достигнет лимита
   */
  public async thereWasException() {
    this.errorsCount += 1;
    this.logger.warn(`Connection exceptions count: ${this.errorsCount}/${this.ERRORS_TO_PROXY_RESET}`);
    if (this.errorsCount >= this.ERRORS_TO_PROXY_RESET) {
      if (!this.thereWasExceptionPromise) {
        this.logger.warn('Resetting proxies...');
        this.thereWasExceptionPromise = this.resetProxies().catch((error) => {
          this.logger.error(`Error resetting proxies: ${error.message}`);
        });
      }
      await this.thereWasExceptionPromise;
      this.thereWasExceptionPromise = null;
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
