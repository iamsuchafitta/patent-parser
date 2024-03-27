/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/consistent-type-definitions */
// noinspection JSUnusedGlobalSymbols

/**
 * Global environment variables of process.env.*
 */
namespace NodeJS {
  import { EnvModeEnum } from './config/env-mode.enum';

  type ProcessEnv = {
    ENV_MODE: EnvModeEnum;
    PARSER_ID: string;
    PORT: string;

    CONCURRENT_REQUESTS: string;

    PROXY_HOST: string;
    PROXY_CONTROL_PORT: string;
    PROXY_PORTS: string;

    DATABASE_URL: string;

    CH_URL: string;
    CH_USERNAME: string;
    CH_PASSWORD: string;
    CH_DATABASE: string;

    // S3_ENDPOINT: string;
    // S3_PORT: string;
    // S3_IS_SSL?: string;
    // S3_ACCESS_KEY: string;
    // S3_SECRET_KEY: string;
    // S3_BUCKET_NAME: string;
  };
}
