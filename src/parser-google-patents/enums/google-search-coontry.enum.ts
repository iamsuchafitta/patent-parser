import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchCountryEnum {
  WO = 'WO', US = 'US', EP = 'EP', JP = 'JP', KR = 'KR', CN = 'CN', AE = 'AE',
  AG = 'AG', AL = 'AL', AM = 'AM', AO = 'AO', AP = 'AP', AR = 'AR', AT = 'AT',
  AU = 'AU', AW = 'AW', AZ = 'AZ', BA = 'BA', BB = 'BB', BD = 'BD', BE = 'BE',
  BF = 'BF', BG = 'BG', BH = 'BH', BJ = 'BJ', BN = 'BN', BO = 'BO', BR = 'BR',
  BW = 'BW', BX = 'BX', BY = 'BY', BZ = 'BZ', CA = 'CA', CF = 'CF', CG = 'CG',
  CH = 'CH', CI = 'CI', CL = 'CL', CM = 'CM', CO = 'CO', CR = 'CR', CS = 'CS',
  CU = 'CU', CY = 'CY', CZ = 'CZ', DD = 'DD', DE = 'DE', DJ = 'DJ', DK = 'DK',
  DM = 'DM', DO = 'DO', DZ = 'DZ', EA = 'EA', EC = 'EC', EE = 'EE', EG = 'EG',
  EM = 'EM', ES = 'ES', FI = 'FI', FR = 'FR', GA = 'GA', GB = 'GB', GC = 'GC',
  GD = 'GD', GE = 'GE', GH = 'GH', GM = 'GM', GN = 'GN', GQ = 'GQ', GR = 'GR',
  GT = 'GT', GW = 'GW', HK = 'HK', HN = 'HN', HR = 'HR', HU = 'HU', IB = 'IB',
  ID = 'ID', IE = 'IE', IL = 'IL', IN = 'IN', IR = 'IR', IS = 'IS', IT = 'IT',
  JO = 'JO', KE = 'KE', KG = 'KG', KH = 'KH', KM = 'KM', KN = 'KN', KP = 'KP',
  KW = 'KW', KZ = 'KZ', LA = 'LA', LC = 'LC', LI = 'LI', LK = 'LK', LR = 'LR',
  LS = 'LS', LT = 'LT', LU = 'LU', LV = 'LV', LY = 'LY', MA = 'MA', MC = 'MC',
  MD = 'MD', ME = 'ME', MG = 'MG', MK = 'MK', ML = 'ML', MN = 'MN', MO = 'MO',
  MR = 'MR', MT = 'MT', MW = 'MW', MX = 'MX', MY = 'MY', MZ = 'MZ', NA = 'NA',
  NE = 'NE', NG = 'NG', NI = 'NI', NL = 'NL', NO = 'NO', NZ = 'NZ', OA = 'OA',
  OM = 'OM', PA = 'PA', PE = 'PE', PG = 'PG', PH = 'PH', PL = 'PL', PT = 'PT',
  PY = 'PY', QA = 'QA', RO = 'RO', RS = 'RS', RU = 'RU', RW = 'RW', SA = 'SA',
  SC = 'SC', SD = 'SD', SE = 'SE', SG = 'SG', SI = 'SI', SK = 'SK', SL = 'SL',
  SM = 'SM', SN = 'SN', ST = 'ST', SU = 'SU', SV = 'SV', SY = 'SY', SZ = 'SZ',
  TD = 'TD', TG = 'TG', TH = 'TH', TJ = 'TJ', TM = 'TM', TN = 'TN', TR = 'TR',
  TT = 'TT', TW = 'TW', TZ = 'TZ', UA = 'UA', UG = 'UG', UY = 'UY', UZ = 'UZ',
  VC = 'VC', VE = 'VE', VN = 'VN', YU = 'YU', ZA = 'ZA', ZM = 'ZM', ZW = 'ZW',
}

registerEnumType(GoogleSearchCountryEnum, {
  name: 'GoogleSearchCountryEnum',
});
