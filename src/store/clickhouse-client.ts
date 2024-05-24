import { createClient } from '@clickhouse/client';
import { AppConfig } from '../common/app-config.js';

export const clickhouseClient = createClient(AppConfig.clickhouse);
