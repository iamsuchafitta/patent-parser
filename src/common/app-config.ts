import type { NodeClickHouseClientConfigOptions } from '@clickhouse/client/dist/config.js';
import { values } from 'lodash-es';
import { EnvModeEnum } from './env-mode.enum.js';
import { joi } from './joi-configured.js';
import { QueueElementTypeEnum } from '../store/queue-store/queue.types.js';

interface IConfig {
  mode: EnvModeEnum;
  port: number;
  concurrent: {
    summaryLimit: number;
  } & Record<QueueElementTypeEnum, number>,
  proxy: {
    host: string;
    controlPort: number;
    ports: number[];
  };
  pgUrl: string;
  clickhouse: NodeClickHouseClientConfigOptions;
}

class AppConfigClass implements IConfig {
  public readonly mode: IConfig['mode'];
  public readonly port: IConfig['port'];
  public readonly concurrent: IConfig['concurrent'];
  public readonly proxy: IConfig['proxy'];
  public readonly pgUrl: IConfig['pgUrl'];
  public readonly clickhouse: IConfig['clickhouse'];

  constructor() {
    const config = this.validateEnv();
    this.mode = config.ENV_MODE;
    this.port = +config.PORT;
    this.concurrent = {
      summaryLimit: +config.CONCURRENT_SUMMARY_LIMIT,
      [QueueElementTypeEnum.GooglePatent]: +config.CONCURRENT_PATENTS_GOOGLE,
      [QueueElementTypeEnum.YandexPatent]: +config.CONCURRENT_PATENTS_YANDEX,
      [QueueElementTypeEnum.ArticleRU]: +config.CONCURRENT_ARTICLE_IOFFE_RU,
      [QueueElementTypeEnum.ArticleEN]: +config.CONCURRENT_ARTICLE_RAJPUB_EN,
    };
    this.proxy = {
      host: config.PROXY_HOST,
      controlPort: +config.PROXY_CONTROL_PORT,
      ports: config.PROXY_PORTS,
    };
    this.pgUrl = config.DATABASE_URL;
    this.clickhouse = {
      url: config.CH_URL,
      username: config.CH_USERNAME,
      password: config.CH_PASSWORD,
      database: config.CH_DATABASE,
    };
  }

  private validateEnv() {
    // Main validation
    const { value, error } = joi.object<NodeJS.ProcessEnv>({
      ENV_MODE: joi.string().valid(...values(EnvModeEnum)).required(),
      PORT: joi.number().port().optional().default(5000),
      CONCURRENT_SUMMARY_LIMIT: joi.number().integer().min(1).required(),
      CONCURRENT_PATENTS_GOOGLE: joi.number().integer().min(1).default(0).optional(),
      CONCURRENT_PATENTS_YANDEX: joi.number().integer().min(1).default(0).optional(),
      CONCURRENT_ARTICLE_IOFFE_RU: joi.number().integer().min(1).default(0).optional(),
      CONCURRENT_ARTICLE_RAJPUB_EN: joi.number().integer().min(1).default(0).optional(),
      PROXY_HOST: joi.string().hostname().required(),
      PROXY_CONTROL_PORT: joi.number().port().required(),
      PROXY_PORTS: joi.string().pattern(/^(\d{4,5},)*\d{4,5}$/).required(),
      DATABASE_URL: joi.string().uri().required(),
      CH_URL: joi.string().required(),
      CH_USERNAME: joi.string().required(),
      CH_PASSWORD: joi.string().allow('').required(),
      CH_DATABASE: joi.string().required(),
    }).validate(process.env);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    // Additional validation
    const PROXY_PORTS = value.PROXY_PORTS.split(',').map(port => +port);
    const PROXY_PORTS_duplicates = PROXY_PORTS.filter((port, index) => PROXY_PORTS.indexOf(port) !== index);
    const errors: string[] = [];
    const maxConcurrent = Math.max(
      +value.CONCURRENT_PATENTS_GOOGLE,
      +value.CONCURRENT_PATENTS_YANDEX,
      +value.CONCURRENT_ARTICLE_IOFFE_RU,
      +value.CONCURRENT_ARTICLE_RAJPUB_EN,
    );
    if (PROXY_PORTS.length < maxConcurrent) {
      errors.push(`Condition count(PROXY_PORTS) >= max(CONCURRENT_*) is not met`);
    }
    if (maxConcurrent < 1) {
      errors.push(`At least one service in CONCURRENT_* must be greater than 0`);
    }
    PROXY_PORTS.forEach(port => isFinite(port) && port >= 0 && port < 2 ** 16 || errors.push(`PROXY_PORTS has incorrect port ${port}`));
    if (PROXY_PORTS_duplicates.length) {
      errors.push(`PROXY_PORTS contains duplicates: ${PROXY_PORTS_duplicates.join(', ')}`);
    }
    if (errors.length) {
      throw new Error(`Config additional validation error:\n\t${errors.join(';\n\t')}.`);
    }
    // Validations passed
    return {
      ...value,
      PROXY_PORTS,
    };
  }
}

export const AppConfig = new AppConfigClass();
