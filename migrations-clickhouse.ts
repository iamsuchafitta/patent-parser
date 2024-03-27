import { createClient } from '@clickhouse/client';
import type { ClickHouseClient } from '@clickhouse/client-common/dist/client';
import process from 'node:process';
import type Stream from 'node:stream';
import { joi } from './src/common/joi-configured';

let client: ClickHouseClient<Stream.Readable>;
let migrationsManager: MigrationManager;

class MigrationManager {
  private constructor() {}

  private appliedCount = 0;

  static async create() {
    // language=ClickHouse
    await client.command({ query: 'CREATE TABLE IF NOT EXISTS migrations (id String, name String) ENGINE = MergeTree() ORDER BY id;' });
    return new MigrationManager();
  }

  async migrate(fn: () => Promise<void>, id: string, name: string) {
    if (!await this.isMigrated(id)) {
      await fn();
      await client.command({
        // language=ClickHouse
        query: `INSERT INTO migrations (id, name)
                VALUES ({id: String}, {name: String});`,
        query_params: { id, name },
      });
      this.appliedCount += 1;
      console.log(`Applied migration: ${id} (${name})`);
    }
  }

  finish() {
    if (this.appliedCount === 0) {
      console.log('No migrations needed to apply');
    } else {
      console.log(`Applied ${this.appliedCount} migrations`);
    }
  }

  async isMigrated(id: string) {
    const result = await client.query({
      // language=ClickHouse
      query: `SELECT true as value
              FROM migrations
              WHERE id = {id: String}
              LIMIT 1;`,
      query_params: { id },
      format: 'JSONEachRow',
    });
    const data = await result.json<{ value: boolean }[]>();
    return data.at(0)?.value === true;
  }
}

function clientInit() {
  const configSchema = joi.object({
    host: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().allow('').required(),
    database: joi.string().required(),
  }).rename('CH_URL', 'host')
    .rename('CH_USERNAME', 'username')
    .rename('CH_PASSWORD', 'password')
    .rename('CH_DATABASE', 'database');

  const { error, value: config } = configSchema.validate(process.env);
  if (error) {
    throw new Error(`ClickHouse client config error: ${error.message}`);
  }

  return createClient(config);
}

async function main() {
  client = clientInit();
  migrationsManager = await MigrationManager.create();
  await migrationsManager.migrate(initMigration, 'init', 'Init migration');
  migrationsManager.finish();
}

async function initMigration() {
  await client.command({
    // language=ClickHouse
    query: `
CREATE OR REPLACE TABLE patents (
  id String,
  urlGoogle Nullable(String),
  urlYandex Nullable(String),
  title Nullable(String),
  abstract Nullable(String),
  description Nullable(String),
  classifications String, -- Используется String для хранения JSON, т.к. ClickHouse не поддерживает JSON как тип данных
  claims String, -- Аналогично classifications
  concepts Array(String), -- Для концептов и связей, предполагается, что будет использоваться дополнительная таблица
  relations Array(String) -- Для связей между патентами, используется массив строк
) ENGINE = MergeTree()
ORDER BY id;
  `.trim(),
  }).then(() => console.log('CREATE OR REPLACE TABLE "patents"'));

  await client.command({
    // language=ClickHouse
    query: `
CREATE OR REPLACE TABLE patent_relations
(
    patentMainId  String,
    type Enum('Citation' = 1, 'CitationFamilyToFamily' = 2, 'CitedBy' = 3, 'CitedByFamilyToFamily' = 4, 'Worldwide' = 5, 'SimilarDocument' = 6),
    patentOtherId String,
    PRIMARY       KEY ( type, patentMainId, patentOtherId)
) ENGINE = MergeTree()
      ORDER BY (type, patentMainId, patentOtherId);
    `.trim(),
  }).then(() => console.log('CREATE OR REPLACE TABLE "patent_relations"'));

  await client.command({
    // language=ClickHouse
    query: `
CREATE OR REPLACE TABLE concepts
(
    id String,
    name String,
    domain String,
    smiles Nullable(String),
    inchiKey Nullable(String),
    queryMatch Float32,
    sections Array(String),
    count Int32,
    patentNumber Nullable(String) -- Связь с патентами реализуется через отдельное поле, ссылочная целостность не обеспечивается
) ENGINE = MergeTree()
ORDER BY id;
    `.trim(),
  }).then(() => console.log('CREATE OR REPLACE TABLE "concepts"'));

  await client.command({
    // language=ClickHouse
    query: `
CREATE OR REPLACE TABLE application_events
(
    id String,
    date DateTime,
    asignee String,
    inventors Array(String) -- Массив строк для хранения inventors
) ENGINE = MergeTree()
ORDER BY date;
    `.trim(),
  }).then(() => console.log('CREATE OR REPLACE TABLE "application_events"'));
}

main()
  .then(() => console.log('Migrations script finished successfully'))
  .catch(console.error);
