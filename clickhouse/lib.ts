import process from 'node:process';
import { createClient } from '@clickhouse/client';
import type { NodeClickHouseClient } from '@clickhouse/client/dist/client.js';
import { joi } from '../src/common/joi-configured.js';

export class MigrationManager {
  private appliedCount = 0;

  private constructor(private readonly client: NodeClickHouseClient) {
    this.migrate = this.migrate.bind(this);
  }

  static async run(migrationsFn: (migrate: typeof MigrationManager.prototype.migrate) => Promise<void>) {
    const client = clientInit();
    // language=ClickHouse
    await client.command({ query: `CREATE TABLE IF NOT EXISTS migrations (id String, date DateTime64 DEFAULT now64()) ENGINE = MergeTree() PRIMARY KEY (id);` });
    const manager = new MigrationManager(client);
    await migrationsFn(manager.migrate);
    manager.finish();
  }

  private async migrate(fn: (client: NodeClickHouseClient) => Promise<void>, id: string) {
    if (!await this.isMigrated(id)) {
      console.log(`Migration applying: "${id}"...`);
      await fn(this.client);
      await this.client.insert({
        table: 'migrations',
        values: { id },
        format: 'JSONEachRow',
      });
      this.appliedCount += 1;
      console.log(`Migration applied: "${id}"!`);
    }
  }

  private finish() {
    if (this.appliedCount === 0) {
      console.log('Finish: No migrations needed to apply');
    } else {
      console.log(`Finish: Applied ${this.appliedCount} migrations`);
    }
  }

  private async isMigrated(id: string) {
    const result = await this.client.query({
      // language=ClickHouse
      query: `SELECT TRUE AS value
              FROM migrations
              WHERE id = {id: String}
              LIMIT 1;`,
      query_params: { id },
      format: 'JSONEachRow',
    });
    const data = await result.json<{ value: boolean }>();
    return data.at(0)?.value === true;
  }
}

export function clientInit() {
  const { error, value: config } = joi.object({
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().allow('').required(),
    database: joi.string().required(),
  }).rename('CH_URL', 'url')
    .rename('CH_USERNAME', 'username')
    .rename('CH_PASSWORD', 'password')
    .rename('CH_DATABASE', 'database')
    .validate(process.env);

  if (error) {
    throw new Error(`ClickHouse client config error: ${error.message}`);
  }

  return createClient(config);
}
