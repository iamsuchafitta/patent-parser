import { joi } from './joi-configured';
import { values } from 'lodash';
import { EnvModeEnum } from './env-mode.enum';

interface IConfig {
  mode: EnvModeEnum;
  parserId: string;
  port: number;
  concurrentRequests: number;
  proxy: {
    host: string;
    controlPort: number;
    ports: number[];
  };
  databaseUrl: string;
}

class AppConfigClass {
  public readonly mode: IConfig['mode'];
  public readonly parserId: IConfig['parserId'];
  public readonly port: IConfig['port'];
  public readonly concurrentRequests: IConfig['concurrentRequests'];
  public readonly proxy: IConfig['proxy'];
  public readonly databaseUrl: IConfig['databaseUrl'];

  constructor() {
    const config = this.validateEnv();
    this.mode = config.ENV_MODE;
    this.parserId = config.PARSER_ID;
    this.port = parseInt(config.PORT, 10);
    this.concurrentRequests = parseInt(config.CONCURRENT_REQUESTS, 10);
    this.proxy = {
      host: config.PROXY_HOST,
      controlPort: parseInt(config.PROXY_CONTROL_PORT, 10),
      ports: config.PROXY_PORTS,
    };
    this.databaseUrl = config.DATABASE_URL;
    console.log(`=== AppConfig initialized ===`);
  }

  private validateEnv() {
    // Main validation
    const { value, error } = joi.object<NodeJS.ProcessEnv>({
      ENV_MODE: joi.string().valid(...values(EnvModeEnum)).required(),
      PARSER_ID: joi.string().required(),
      PORT: joi.number().port().optional().default(5000),
      CONCURRENT_REQUESTS: joi.number().integer().min(1).required(),
      PROXY_HOST: joi.string().hostname().required(),
      PROXY_CONTROL_PORT: joi.number().port().required(),
      PROXY_PORTS: joi.string().pattern(/^(\d{4,5},)*\d{4,5}$/).required(),
      DATABASE_URL: joi.string().uri().required(),
    }).validate(process.env);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    // Additional validation
    const PROXY_PORTS = value.PROXY_PORTS.split(',').map(port => parseInt(port, 10));
    const PROXY_PORTS_duplicates = PROXY_PORTS.filter((port, index) => PROXY_PORTS.indexOf(port) !== index);
    const errors: string[] = [];
    if (PROXY_PORTS.length < +value.CONCURRENT_REQUESTS) {
      errors.push(`Condition portsCount(PROXY_PORTS) >= CONCURRENT_REQUESTS is not met`);
    }
    PROXY_PORTS.forEach(port => (port < 0 || port >= 2 ** 16) && errors.push(`PROXY_PORTS has incorrect port ${port}`));
    if (PROXY_PORTS_duplicates.length) {
      errors.push(`PROXY_PORTS contains duplicates: ${PROXY_PORTS_duplicates.join(', ')}`);
    }
    if (errors.length) {
      throw new Error(`Config additional validation error: ${errors.join(', ')}`);
    }
    // Validation passed
    return {
      ...value,
      PROXY_PORTS,
    };
  }
}

export const AppConfig = new AppConfigClass();
