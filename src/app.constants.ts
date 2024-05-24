import ms from 'ms';

export const PROCESSING_TIMEOUT = {
  ms: ms('5m'),
  getDate: () => new Date(Date.now() - PROCESSING_TIMEOUT.ms),
};

export const CHUNK_PRISMA_LIMIT = 30_000;
export const CHUNK_CLICKHOUSE_LIMIT = 1_000;
