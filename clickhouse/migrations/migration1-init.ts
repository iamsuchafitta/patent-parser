import type { NodeClickHouseClient } from '@clickhouse/client/dist/client.js';

export async function migration1Init(client: NodeClickHouseClient) {
  // language=ClickHouse
  await client.command({query: `
    CREATE OR REPLACE TABLE article (
      url           String,
      title         Nullable(String),
      journalName   Nullable(String),
      authors       Array(Tuple(
        name          Nullable(String),
        organizations Array(UInt8)
      )),
      organizations Array(String),
      date          Nullable(String),
      abstract      Nullable(String),
      pdfUrl        Nullable(String),

      parsedAt      DateTime64 DEFAULT now64()
    ) ENGINE = MergeTree() PRIMARY KEY (url);
  `}).then(() => console.log('-- CREATE OR REPLACE TABLE article'));

  // language=ClickHouse
  await client.command({query: `
    CREATE OR REPLACE TABLE patent_google (
      id  String,
      url String,
      title Nullable(String),
      assignee Nullable(String),
      inventorOrAuthor Nullable(String),
      priorityDate Nullable(String),
      filingOrCreationDate Nullable(String),
      publicationDate Nullable(String),
      grantDate Nullable(String),
      abstract Nullable(String),
      description Nullable(String),
      classifications Array(Tuple(
        id Nullable(String),
        description Nullable(String)
      )), 
      claims Array(Tuple(
        index UInt32,
        text String,
        isDependent Boolean)
      ),
      concepts Array(Tuple(
        name Nullable(String),
        domain Nullable(String),
        smiles Nullable(String),
        inchiKey Nullable(String),
        sections Array(String),
        count Nullable(UInt32)
      )),
      relations Tuple(
        citations Array(String),
        citationsFamilyToFamily Array(String),
        citedBy Array(String),
        citedByFamilyToFamily Array(String),
        similarDocuments Array(String)
      ),
      applicationEvents Array(Tuple(
        date Nullable(String),
        assignee Nullable(String)
      )),

      parsedAt      DateTime64 DEFAULT now64()
    ) ENGINE = MergeTree() PRIMARY KEY (url);
  `}).then(() => console.log('-- CREATE OR REPLACE TABLE patent_google'));

  // language=ClickHouse
  await client.command({query: `
    CREATE OR REPLACE TABLE patent_yandex (
      id String,
      url String,
      title Nullable(String),
      authors Array(String),
      assignees Array(String),
      applicationDate Nullable(String),
      publishedDate Nullable(String),
      abstract Nullable(String),
      claims Nullable(String),
      description Nullable(String),
      classifications Array(String),
      relations Tuple(
        citations Array(String),
        citedBy Array(String),
        similarDocuments Array(String)
      ),
      fipsUrl Nullable(String),

      parsedAt      DateTime64 DEFAULT now64()
    ) ENGINE = MergeTree() PRIMARY KEY (url);
  `}).then(() => console.log('-- CREATE OR REPLACE TABLE patent_yandex'));
}
