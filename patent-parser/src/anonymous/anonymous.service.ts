/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AppConfig } from '../common/app-config';
import Axios from 'axios';
import net from 'node:net';
import { SocksProxyAgent } from 'socks-proxy-agent';
import ms from 'ms';
import { Interval } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { random } from 'lodash';
import { EngineEnum } from '../parser/parser.constants';
import process from 'node:process';

@Injectable()
export class AnonymousService {
  private readonly logger = new Logger(AnonymousService.name);

  private readonly ERRORS_TO_PROXY_RESET = Math.ceil(AppConfig.proxy.ports.length * 0.35);
  private errorsCount = 0;

  private currentIndex = random(0, AppConfig.proxy.ports.length - 1);

  private thereWasExceptionPromise: Promise<void> | null = null;

  constructor() {
    process.setMaxListeners(AppConfig.concurrentRequests * 2);
  }

  getNextProxyPort() {
    const port = AppConfig.proxy.ports[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % AppConfig.proxy.ports.length;
    return port;
  }

  public async getHtml(options: {
    url: string,
    engine: EngineEnum,
    waitSelector: string,
    evaluate?: () => void,
    evaluateReturn?: () => string,
  }) {
    const evaluateReturn = () => document.body.outerHTML;
    if (options.engine === EngineEnum.Nightmare) {
      throw new InternalServerErrorException(`Engine ${options.engine} is unavailable`);
      // const browser = this.startNightmare().goto(options.url).wait(options.waitSelector);
      // if (options.evaluate) await browser.evaluate(options.evaluate);
      // return await browser.evaluate(evaluateReturn).end() as string;
    }
    if (options.engine === EngineEnum.Puppeteer) {
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
    throw new InternalServerErrorException(`Engine ${options.engine satisfies never} not implemented`);
  }

  // public startNightmare() {
  //   return new Nightmare({
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     switches: {
  //       'proxy-server': `socks5://${AppConfig.proxy.host}:${this.getNextProxyPort()}`,
  //       'ignore-certificate-errors': true,
  //       'images': 0,
  //     },
  //     waitTimeout: ms('20s'),
  //     show: false,
  //   });
  // }

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

  public startAxios() {
    const agent = new SocksProxyAgent(`socks5://${AppConfig.proxy.host}:${this.getNextProxyPort()}`);
    return Axios.create({
      headers: { 'User-Agent': 'Mozilla/5.0' },
      httpsAgent: agent,
      httpAgent: agent,
    });
  }

  public async thereWasException() {
    this.errorsCount += 1;
    this.logger.warn(`Connection exceptions count: ${this.errorsCount}/${this.ERRORS_TO_PROXY_RESET}`);
    if (this.errorsCount >= this.ERRORS_TO_PROXY_RESET) {
      if (!this.thereWasExceptionPromise) {
        this.logger.warn('Resetting proxies...');
        this.thereWasExceptionPromise = this.resetProxies().catch((error) => {
          this.logger.error('Error resetting proxies:', error);
        });
      }
      await this.thereWasExceptionPromise;
      this.thereWasExceptionPromise = null;
    }
  }

  @Interval(ms('30m'))
  public async resetProxies() {
    const host = AppConfig.proxy.host;
    const port = AppConfig.proxy.controlPort;
    const command = 'SIGNAL NEWNYM';

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
