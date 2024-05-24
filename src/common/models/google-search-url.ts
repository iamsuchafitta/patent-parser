import dayjs, { type Dayjs } from 'dayjs';
import { GoogleSearchDateIntervalType } from '../../parser-google-patents/enums/google-search-date-interval-type.enum.js';
import { GoogleSearchLanguageEnum } from '../../parser-google-patents/enums/google-search-language.enum.js';
import { GoogleSearchTypeEnum } from '../../parser-google-patents/enums/google-search-type.enum.js';
import type { GoogleSearchSettingsInput } from '../../parser-google-patents/inputs/google-search-settings.input.js';
import type { GoogleSearchInput } from '../../parser-google-patents/inputs/google-search.input.js';
import { splitDateInterval } from '../split-date-interval.js';

const dateIntervalParse = (date: string) => date.split(':').at(0) as GoogleSearchDateIntervalType;
const dateSerialize = (date: Dayjs | Date, type: GoogleSearchDateIntervalType) => `${type}:${dayjs(date).utc(true).format('YYYYMMDD')}`;
const dateParse = (date: string) => dayjs(date.replace(/\w+:/, ''), 'YYYYMMDD').utc(true);

export class GoogleSearchUrl extends URL {
  public static default = {
    dateIntervalType: GoogleSearchDateIntervalType.Publication,
    languages: [GoogleSearchLanguageEnum.Russian],
    type: GoogleSearchTypeEnum.Patent,
    splitDateIntervalByDays: 21,
    isIgnoreExisting: true,
  } as const satisfies Partial<GoogleSearchInput & GoogleSearchSettingsInput>;


  private readonly keys = {
    searchTerm: 'q', // string[]
    dateFrom: 'after',
    dateTo: 'before',
    inventor: 'inventor', // string[]
    assignee: 'assignee', // string[]
    country: 'country', // string[]
    language: 'language', // string[]
    status: 'status',
    type: 'type',
    litigation: 'litigation',
  } as const;

  private constructor(
    args: GoogleSearchInput | GoogleSearchUrl,
    private readonly settings: GoogleSearchSettingsInput,
  ) {
    super(args instanceof GoogleSearchUrl ? args.href : 'https://patents.google.com');
    if (args instanceof GoogleSearchUrl) return;
    args.searchTerms?.forEach((searchTerm) => this.searchParams.append(this.keys.searchTerm, searchTerm));
    this.searchParams.append(this.keys.dateTo, dateSerialize(args.dateTo, args.dateIntervalType));
    this.searchParams.append(this.keys.dateFrom, dateSerialize(args.dateFrom, args.dateIntervalType));
    args.inventors?.length && this.searchParams.append(this.keys.inventor, args.inventors.join(','));
    args.countries?.length && this.searchParams.append(this.keys.country, args.countries.join(','));
    args.status && this.searchParams.append(this.keys.status, args.status);
    args.languages?.length && this.searchParams.append(this.keys.language, args.languages.join(','));
    args.type && this.searchParams.append(this.keys.type, args.type);
    args.litigation && this.searchParams.append(this.keys.litigation, args.litigation);
  }

  private partitioned(): string[] {
    const intervalDaysMax = this.settings.splitDateIntervalByDays;
    if (!intervalDaysMax) return [this.urlDownloadCSV];
    const dateIntervalType = dateIntervalParse(this.searchParams.get(this.keys.dateFrom)!);
    return splitDateInterval({
      dateFrom: dateParse(this.searchParams.get(this.keys.dateFrom)!),
      dateTo: dateParse(this.searchParams.get(this.keys.dateTo)!),
      intervalDaysMax,
    }).map(({ dateFrom, dateTo }) => {
      const url = new GoogleSearchUrl(this, this.settings);
      url.searchParams.set(this.keys.dateFrom, dateSerialize(dateFrom, dateIntervalType));
      url.searchParams.set(this.keys.dateTo, dateSerialize(dateTo, dateIntervalType));
      return url.urlDownloadCSV;
    });
  }

  public static createPartitioned(args: GoogleSearchInput, settings: GoogleSearchSettingsInput) {
    return new GoogleSearchUrl(args, settings).partitioned();
  }

  private get urlDownloadCSV() {
    const download = new URL('https://patents.google.com/xhr/query');
    download.searchParams.set('url', global.decodeURIComponent(this.searchParams.toString()));
    download.searchParams.append('exp', '');
    download.searchParams.append('download', 'true');
    // download.searchParams.append('download_format', 'csv');
    return download.href;
  }
}
