import ms from 'ms';

export const PROCESSING_TIMEOUT = {
  ms: ms('3m'),
  getDate: () => new Date(Date.now() - PROCESSING_TIMEOUT.ms),
};
