import { values } from 'lodash-es';
import { YandexSearchCountryEnum, YandexSearchDateTypeEnum, YandexSearchTypeEnum, YandexSearchOrderByEnum } from '../../parser-yandex-patents/models/yandex-search-enums.js';
import type { YandexSearchInput, YandexSearchSettings } from '../../parser-yandex-patents/models/yandex-search.input.js';

export class YandexSearchUrl extends URL {
  public static default = {
    countries: values(YandexSearchCountryEnum),
    types: [YandexSearchTypeEnum.Patent],
    orderBy: YandexSearchOrderByEnum.Newest,
    dateIntervalType: YandexSearchDateTypeEnum.PublicationDate,
    pageFrom: 1,
    perPage: 500,
    concurrent: 3,
    isIgnoreExisting: true,
  } as const satisfies Partial<YandexSearchInput & YandexSearchSettings>;

  private readonly keys = {
    applicationTitle: 'anu',
    authors: 'dau',
    countries: 'dco',
    dateFrom: 'dfr',
    searchInput: 'text',
    name: 'dna',
    documentTitle: 'dnu',
    patentOwners: 'dou',
    dateIntervalType: 'dt',
    dateTo: 'dto',
    types: 'dty',
    orderBy: 's',
    page: 'sp',
    perPage: 'spp',
  };

  constructor(args: YandexSearchInput | YandexSearchUrl) {
    super(args instanceof YandexSearchUrl ? args.href : 'https://yandex.ru/patents/search');
    if (args instanceof YandexSearchUrl) return;
    args.applicationTitle && this.searchParams.append(this.keys.applicationTitle, args.applicationTitle);
    args.authors && this.searchParams.append(this.keys.authors, args.authors);
    (args.countries).forEach((country) => this.searchParams.append(this.keys.countries, ({
      [YandexSearchCountryEnum.RussianFederation]: 'RU',
      [YandexSearchCountryEnum.SovietUnion]: 'SU',
    })[country]));
    args.dateFrom && this.searchParams.append(this.keys.dateFrom, args.dateFrom);
    this.searchParams.append('dl', 'ru'); // Unknown key, but was always presented
    args.name && this.searchParams.append(this.keys.name, args.name);
    args.documentTitle && this.searchParams.append(this.keys.documentTitle, args.documentTitle);
    args.patentOwners && this.searchParams.append(this.keys.patentOwners, args.patentOwners);
    this.searchParams.append(this.keys.dateIntervalType, ({
      [YandexSearchDateTypeEnum.ApplicationDate]: '0',
      [YandexSearchDateTypeEnum.PublicationDate]: '1',
      [YandexSearchDateTypeEnum.ApplicationPublicationDate]: '2',
      [YandexSearchDateTypeEnum.PatentFilingStartDate]: '3',
    })[args.dateIntervalType]);
    args.dateTo && this.searchParams.append(this.keys.dateTo, args.dateTo);
    (args.types).forEach((type) => this.searchParams.append(this.keys.types, ({
      [YandexSearchTypeEnum.Application]: '1',
      [YandexSearchTypeEnum.Patent]: '2',
    })[type]));
    this.searchParams.append(this.keys.orderBy, ({
      [YandexSearchOrderByEnum.Relevant]: '0',
      [YandexSearchOrderByEnum.Newest]: '1',
      [YandexSearchOrderByEnum.Oldest]: '2',
    })[args.orderBy]);
    this.searchParams.set(this.keys.page, (args.parserSettings.pageFrom - 1).toString());
    this.searchParams.append(this.keys.perPage, args.parserSettings.perPage.toString());
    this.searchParams.append('st', '0'); // Unknown key, but was always presented
    args.text && this.searchParams.append(this.keys.searchInput, args.text);
  }

  public setPage(page: number): YandexSearchUrl {
    const url = new YandexSearchUrl(this);
    url.searchParams.set(this.keys.page, (page - 1).toString());
    return url;
  }

  public getPage(): number {
    return +this.searchParams.get(this.keys.page)! + 1;
  }
}
