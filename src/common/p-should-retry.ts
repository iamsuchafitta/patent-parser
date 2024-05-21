import util from 'node:util';
import { HttpStatus } from '@nestjs/common';
import { type AxiosError } from 'axios';
import type { FailedAttemptError } from 'p-retry';
import { TimeoutError, PuppeteerError } from 'puppeteer';

export function pShouldRetry(abortController?: AbortController) {
  return (err_: FailedAttemptError) => {
    const err = err_ as FailedAttemptError & Partial<AxiosError> & Partial<PuppeteerError>;
    const isTimeout = err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED'
      || err instanceof TimeoutError || /Navigation timeout of \d+ ms exceeded/i.test(err.message)
    || /Waiting for selector .+? failed: Waiting failed: \d+ms exceeded/i.test(err.message);
    const tooManyRequests = err.response?.status === HttpStatus.TOO_MANY_REQUESTS;
    const serviceUnavailable = err.response?.status === HttpStatus.SERVICE_UNAVAILABLE;
    const isProxyTimeout = /Proxy connection timed out|Socks5 proxy rejected connection - Failure|socket hang up/i.test(err.message)
     || /net::ERR_CONNECTION_CLOSED|net::ERR_SOCKS_CONNECTION_FAILED|net::ERR_SOCKET_NOT_CONNECTED/i.test(err.message);
    const doRetry = isTimeout || tooManyRequests || serviceUnavailable || isProxyTimeout;
    if (!doRetry/* && !(err instanceof CanceledError)*/ && !abortController?.signal.aborted) {
      abortController?.abort(err.message);
      // Log will help to know how to add an uncaught error to the retry:
      console.error(`[${err?.request?.url}] Should not be retried! ErrorInfo: ${util.inspect({
        // General info
        name: err.name,
        message: err.message,
        constructor: err.constructor.name,
        // AxiosError
        code: err.code,
        status: err.status,
        responseStatus: err.response?.status,
        responseStatusText: err.response?.statusText,
      })}`);
    }
    return doRetry;
  };
}
