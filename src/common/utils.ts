import dayjs from 'dayjs';
import { isUndefined, isPlainObject, keys } from 'lodash-es';
import { omitDeepBy } from 'lodash-omitdeep';
import neatCsv from 'neat-csv';
import type { PatentGoogleTempCreateInput } from '../store/patent-google-store/patent-google.types.js';

export const nullable = true;

export function clearDeepUndefinedAndEmptyArrays<T extends object>(v: T) {
  return omitDeepBy(v, function (v: any) {
    return isUndefined(v)
      || v?.length === 0
      || isPlainObject(v) && keys(v).length === 0;
  }) as T;
}

export function getFirstAndLastMonthsDaysOfYear(year: number): [string, string][] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
    const start = dayjs(new Date(year, month, 1), { utc: true }).format('YYYYMMDD');
    const end = dayjs(new Date(year, month + 1, 0), { utc: true }).format('YYYYMMDD');
    return [start, end];
  });
}

export async function parseGooglePatentSearchCSV(csvString: string) {
  const data = await neatCsv(csvString, { headers: false });
  return data.slice(2).map((row) => ({
    id: row[0],
    title: row[1],
    assignee: row[2],
    inventorOrAuthor: row[3],
    priorityDate: row[4],
    filingOrCreationDate: row[5],
    publicationDate: row[6],
    grantDate: row[7],
    url: row[8],
  } satisfies PatentGoogleTempCreateInput));
}
