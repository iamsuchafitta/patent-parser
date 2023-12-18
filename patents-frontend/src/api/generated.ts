import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: string; output: string; }
};

export type GApplicationEventCountAggregate = {
  _all: Scalars['Int']['output'];
  asignee: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  inventors: Scalars['Int']['output'];
};

export type GApplicationEventMaxAggregate = {
  asignee?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type GApplicationEventMinAggregate = {
  asignee?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** Концепт */
export type GConcept = {
  Patent?: Maybe<GPatent>;
  count: Scalars['Int']['output'];
  domain: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inchiKey?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  patentNumber?: Maybe<Scalars['String']['output']>;
  queryMatch: Scalars['Float']['output'];
  sections?: Maybe<Array<Scalars['String']['output']>>;
  smiles?: Maybe<Scalars['String']['output']>;
};

export type GConceptAvgAggregate = {
  count?: Maybe<Scalars['Float']['output']>;
  queryMatch?: Maybe<Scalars['Float']['output']>;
};

export type GConceptCountAggregate = {
  _all: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  domain: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  inchiKey: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  patentNumber: Scalars['Int']['output'];
  queryMatch: Scalars['Int']['output'];
  sections: Scalars['Int']['output'];
  smiles: Scalars['Int']['output'];
};

export type GConceptMaxAggregate = {
  count?: Maybe<Scalars['Int']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  inchiKey?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  patentNumber?: Maybe<Scalars['String']['output']>;
  queryMatch?: Maybe<Scalars['Float']['output']>;
  smiles?: Maybe<Scalars['String']['output']>;
};

export type GConceptMinAggregate = {
  count?: Maybe<Scalars['Int']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  inchiKey?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  patentNumber?: Maybe<Scalars['String']['output']>;
  queryMatch?: Maybe<Scalars['Float']['output']>;
  smiles?: Maybe<Scalars['String']['output']>;
};

export type GConceptSumAggregate = {
  count?: Maybe<Scalars['Int']['output']>;
  queryMatch?: Maybe<Scalars['Float']['output']>;
};

export type GMonitorLog = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  parserId: Scalars['String']['output'];
  type: GMonitorLogTypeEnum;
};

export type GMonitorLogCountAggregate = {
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  message: Scalars['Int']['output'];
  parserId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
};

export type GMonitorLogMaxAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  parserId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GMonitorLogTypeEnum>;
};

export type GMonitorLogMinAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  parserId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GMonitorLogTypeEnum>;
};

export enum GMonitorLogTypeEnum {
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}

export type GMonitorStat = {
  createdAt: Scalars['DateTime']['output'];
  currentProcessing?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Scalars['Int']['output']>;
  errorsMax?: Maybe<Scalars['Int']['output']>;
  externalMb?: Maybe<Scalars['Float']['output']>;
  heapMaxMb?: Maybe<Scalars['Float']['output']>;
  heapMb?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  parserId: Scalars['String']['output'];
  rssMb?: Maybe<Scalars['Float']['output']>;
  sighup?: Maybe<Scalars['Int']['output']>;
  sigint?: Maybe<Scalars['Int']['output']>;
  sigterm?: Maybe<Scalars['Int']['output']>;
};

export type GMonitorStatAvgAggregate = {
  currentProcessing?: Maybe<Scalars['Float']['output']>;
  errors?: Maybe<Scalars['Float']['output']>;
  errorsMax?: Maybe<Scalars['Float']['output']>;
  externalMb?: Maybe<Scalars['Float']['output']>;
  heapMaxMb?: Maybe<Scalars['Float']['output']>;
  heapMb?: Maybe<Scalars['Float']['output']>;
  rssMb?: Maybe<Scalars['Float']['output']>;
  sighup?: Maybe<Scalars['Float']['output']>;
  sigint?: Maybe<Scalars['Float']['output']>;
  sigterm?: Maybe<Scalars['Float']['output']>;
};

export type GMonitorStatCountAggregate = {
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  currentProcessing: Scalars['Int']['output'];
  errors: Scalars['Int']['output'];
  errorsMax: Scalars['Int']['output'];
  externalMb: Scalars['Int']['output'];
  heapMaxMb: Scalars['Int']['output'];
  heapMb: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  parserId: Scalars['Int']['output'];
  rssMb: Scalars['Int']['output'];
  sighup: Scalars['Int']['output'];
  sigint: Scalars['Int']['output'];
  sigterm: Scalars['Int']['output'];
};

export type GMonitorStatMaxAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currentProcessing?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Scalars['Int']['output']>;
  errorsMax?: Maybe<Scalars['Int']['output']>;
  externalMb?: Maybe<Scalars['Float']['output']>;
  heapMaxMb?: Maybe<Scalars['Float']['output']>;
  heapMb?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parserId?: Maybe<Scalars['String']['output']>;
  rssMb?: Maybe<Scalars['Float']['output']>;
  sighup?: Maybe<Scalars['Int']['output']>;
  sigint?: Maybe<Scalars['Int']['output']>;
  sigterm?: Maybe<Scalars['Int']['output']>;
};

export type GMonitorStatMinAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currentProcessing?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Scalars['Int']['output']>;
  errorsMax?: Maybe<Scalars['Int']['output']>;
  externalMb?: Maybe<Scalars['Float']['output']>;
  heapMaxMb?: Maybe<Scalars['Float']['output']>;
  heapMb?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parserId?: Maybe<Scalars['String']['output']>;
  rssMb?: Maybe<Scalars['Float']['output']>;
  sighup?: Maybe<Scalars['Int']['output']>;
  sigint?: Maybe<Scalars['Int']['output']>;
  sigterm?: Maybe<Scalars['Int']['output']>;
};

export type GMonitorStatSumAggregate = {
  currentProcessing?: Maybe<Scalars['Int']['output']>;
  errors?: Maybe<Scalars['Int']['output']>;
  errorsMax?: Maybe<Scalars['Int']['output']>;
  externalMb?: Maybe<Scalars['Float']['output']>;
  heapMaxMb?: Maybe<Scalars['Float']['output']>;
  heapMb?: Maybe<Scalars['Float']['output']>;
  rssMb?: Maybe<Scalars['Float']['output']>;
  sighup?: Maybe<Scalars['Int']['output']>;
  sigint?: Maybe<Scalars['Int']['output']>;
  sigterm?: Maybe<Scalars['Int']['output']>;
};

export type GMutation = {
  /** Parse patent */
  patentParse: Scalars['String']['output'];
  /** Add patents to parse queue by search */
  patentsSearch: Scalars['Int']['output'];
  proxyReset: Scalars['Boolean']['output'];
};


export type GMutationPatentParseArgs = {
  patentUrl: Scalars['URL']['input'];
};


export type GMutationPatentsSearchArgs = {
  isIgnoreExisting?: Scalars['Boolean']['input'];
  isOrganisation?: Scalars['Boolean']['input'];
  search: Scalars['String']['input'];
};

export type GPaginationInput = {
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

/** Патент */
export type GPatent = {
  _count: GPatentCount;
  /** Краткое описание */
  abstract?: Maybe<Scalars['String']['output']>;
  /** Пункты формулы изобретения */
  claims?: Maybe<Scalars['JSON']['output']>;
  /** Области технологий, классификации по патентным системам (например, IPC или CPC) */
  classifications?: Maybe<Scalars['JSON']['output']>;
  /** Концепты */
  concepts?: Maybe<Array<GConcept>>;
  /** Полное описание */
  description?: Maybe<Scalars['String']['output']>;
  /** Номер патента */
  id: Scalars['ID']['output'];
  /** Ссылки на другие патенты */
  relations?: Maybe<Array<GPatentRelation>>;
  /** Название патента */
  title?: Maybe<Scalars['String']['output']>;
  /** Ссылка на патент в Google Patents */
  urlGoogle?: Maybe<Scalars['String']['output']>;
  /** Ссылка на патент в Yandex Patents */
  urlYandex?: Maybe<Scalars['String']['output']>;
};

export type GPatentCount = {
  concepts: Scalars['Int']['output'];
  relations: Scalars['Int']['output'];
};

export type GPatentCountAggregate = {
  _all: Scalars['Int']['output'];
  abstract: Scalars['Int']['output'];
  claims: Scalars['Int']['output'];
  classifications: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  urlGoogle: Scalars['Int']['output'];
  urlYandex: Scalars['Int']['output'];
};

export type GPatentMaxAggregate = {
  abstract?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  urlGoogle?: Maybe<Scalars['String']['output']>;
  urlYandex?: Maybe<Scalars['String']['output']>;
};

export type GPatentMinAggregate = {
  abstract?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  urlGoogle?: Maybe<Scalars['String']['output']>;
  urlYandex?: Maybe<Scalars['String']['output']>;
};

export type GPatentParseQueueAvgAggregate = {
  tries?: Maybe<Scalars['Float']['output']>;
};

export type GPatentParseQueueCountAggregate = {
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  startedAt: Scalars['Int']['output'];
  tries: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
};

export type GPatentParseQueueMaxAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  tries?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GPatentParseQueueMinAggregate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  tries?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GPatentParseQueueSumAggregate = {
  tries?: Maybe<Scalars['Int']['output']>;
};

/** Связь между патентами */
export type GPatentRelation = {
  /** Первый патент */
  patentMain: GPatent;
  /** Первый патент */
  patentMainId: Scalars['String']['output'];
  /** Второй патент (может отсутствовать в БД) */
  patentOtherId: Scalars['String']['output'];
  /** Тип связи */
  type: GPatentRelationTypeEnum;
};

export type GPatentRelationCountAggregate = {
  _all: Scalars['Int']['output'];
  patentMainId: Scalars['Int']['output'];
  patentOtherId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
};

export type GPatentRelationMaxAggregate = {
  patentMainId?: Maybe<Scalars['String']['output']>;
  patentOtherId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GPatentRelationTypeEnum>;
};

export type GPatentRelationMinAggregate = {
  patentMainId?: Maybe<Scalars['String']['output']>;
  patentOtherId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<GPatentRelationTypeEnum>;
};

/** Тип связи от первого патента ко второму */
export enum GPatentRelationTypeEnum {
  Citation = 'Citation',
  CitationFamilyToFamily = 'CitationFamilyToFamily',
  CitedBy = 'CitedBy',
  CitedByFamilyToFamily = 'CitedByFamilyToFamily',
  SimilarDocument = 'SimilarDocument',
  Worldwide = 'Worldwide'
}

export type GQuery = {
  healthz: Scalars['String']['output'];
  monitorLogs: Array<GMonitorLog>;
  monitorStats: Array<GMonitorStat>;
  parserIds: Array<Scalars['String']['output']>;
  patent: GPatent;
  patents: Array<GPatent>;
  patentsCount: Scalars['Int']['output'];
  queueLength: GQueueLengthObject;
};


export type GQueryHealthzArgs = {
  db?: InputMaybe<Scalars['Boolean']['input']>;
};


export type GQueryMonitorLogsArgs = {
  pagination?: InputMaybe<GPaginationInput>;
};


export type GQueryMonitorStatsArgs = {
  pagination?: InputMaybe<GPaginationInput>;
  parserId?: InputMaybe<Scalars['String']['input']>;
};


export type GQueryPatentArgs = {
  id: Scalars['String']['input'];
};


export type GQueryPatentsArgs = {
  pagination?: InputMaybe<GPaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GQueueLengthObject = {
  /** Сколько из них сейчас обрабатываются */
  processing: Scalars['Float']['output'];
  /** Сколько всего элементов в очереди */
  total: Scalars['Float']['output'];
};

export type GSubscription = {
  monitorLogCreated: GMonitorLog;
  monitorStatCreated: GMonitorStat;
  patentsCountChanged: Scalars['Int']['output'];
  queueChanged: GQueueLengthObject;
};


export type GSubscriptionMonitorLogCreatedArgs = {
  parserId?: InputMaybe<Scalars['String']['input']>;
};


export type GSubscriptionMonitorStatCreatedArgs = {
  parserId?: InputMaybe<Scalars['String']['input']>;
};

export type GProxyResetMutationVariables = Exact<{ [key: string]: never; }>;


export type GProxyResetMutation = { proxyReset: boolean };

export type GMonitorLogFragmentFragment = { id: string, parserId: string, createdAt: string, type: GMonitorLogTypeEnum, message: string };

export type GMonitorStatFragmentFragment = { id: string, parserId: string, createdAt: string, currentProcessing?: number | null, errors?: number | null, errorsMax?: number | null, rssMb?: number | null, heapMb?: number | null, heapMaxMb?: number | null, externalMb?: number | null, sighup?: number | null, sigint?: number | null, sigterm?: number | null };

export type GMonitorStatsQueryVariables = Exact<{
  parserId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<GPaginationInput>;
}>;


export type GMonitorStatsQuery = { monitorStats: Array<{ id: string, parserId: string, createdAt: string, currentProcessing?: number | null, errors?: number | null, errorsMax?: number | null, rssMb?: number | null, heapMb?: number | null, heapMaxMb?: number | null, externalMb?: number | null, sighup?: number | null, sigint?: number | null, sigterm?: number | null }> };

export type GMonitorLogsQueryVariables = Exact<{
  pagination?: InputMaybe<GPaginationInput>;
}>;


export type GMonitorLogsQuery = { monitorLogs: Array<{ id: string, parserId: string, createdAt: string, type: GMonitorLogTypeEnum, message: string }> };

export type GMonitorStatCreatedSubscriptionVariables = Exact<{
  parserId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GMonitorStatCreatedSubscription = { monitorStatCreated: { id: string, parserId: string, createdAt: string, currentProcessing?: number | null, errors?: number | null, errorsMax?: number | null, rssMb?: number | null, heapMb?: number | null, heapMaxMb?: number | null, externalMb?: number | null, sighup?: number | null, sigint?: number | null, sigterm?: number | null } };

export type GMonitorLogCreatedSubscriptionVariables = Exact<{
  parserId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GMonitorLogCreatedSubscription = { monitorLogCreated: { id: string, parserId: string, createdAt: string, type: GMonitorLogTypeEnum, message: string } };

export type GPatentsQueryVariables = Exact<{
  pagination?: InputMaybe<GPaginationInput>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GPatentsQuery = { patents: Array<{ id: string, urlGoogle?: string | null, urlYandex?: string | null, title?: string | null, abstract?: string | null }> };

export type GPatentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GPatentsCountQuery = { patentsCount: number };

export type GPatentQueryVariables = Exact<{
  patentId: Scalars['String']['input'];
}>;


export type GPatentQuery = { patent: { id: string, urlGoogle?: string | null, urlYandex?: string | null, title?: string | null, abstract?: string | null, description?: string | null, classifications?: any | null, claims?: any | null, concepts?: Array<{ id: string, name: string, domain: string, smiles?: string | null, inchiKey?: string | null, queryMatch: number, sections?: Array<string> | null, count: number, patentNumber?: string | null }> | null, relations?: Array<{ patentMainId: string, type: GPatentRelationTypeEnum, patentOtherId: string }> | null } };

export type GPatentsParseMutationVariables = Exact<{
  patentUrl: Scalars['URL']['input'];
}>;


export type GPatentsParseMutation = { patentParse: string };

export type GPatentsSearchMutationVariables = Exact<{
  search: Scalars['String']['input'];
  isOrganisation: Scalars['Boolean']['input'];
  isIgnoreExisting: Scalars['Boolean']['input'];
}>;


export type GPatentsSearchMutation = { patentsSearch: number };

export type GPatentsCountChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GPatentsCountChangedSubscription = { patentsCountChanged: number };

export type GQueueLengthQueryVariables = Exact<{ [key: string]: never; }>;


export type GQueueLengthQuery = { queueLength: { total: number, processing: number } };

export type GQueueChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GQueueChangedSubscription = { queueChanged: { total: number, processing: number } };

export const MonitorLogFragmentFragmentDoc = gql`
    fragment MonitorLogFragment on MonitorLog {
  id
  parserId
  createdAt
  type
  message
}
    `;
export const MonitorStatFragmentFragmentDoc = gql`
    fragment MonitorStatFragment on MonitorStat {
  id
  parserId
  createdAt
  currentProcessing
  errors
  errorsMax
  rssMb
  heapMb
  heapMaxMb
  externalMb
  sighup
  sigint
  sigterm
}
    `;
export const ProxyResetDocument = gql`
    mutation ProxyReset {
  proxyReset
}
    `;
export type GProxyResetMutationFn = Apollo.MutationFunction<GProxyResetMutation, GProxyResetMutationVariables>;

/**
 * __useProxyResetMutation__
 *
 * To run a mutation, you first call `useProxyResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProxyResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proxyResetMutation, { data, loading, error }] = useProxyResetMutation({
 *   variables: {
 *   },
 * });
 */
export function useProxyResetMutation(baseOptions?: Apollo.MutationHookOptions<GProxyResetMutation, GProxyResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GProxyResetMutation, GProxyResetMutationVariables>(ProxyResetDocument, options);
      }
export type ProxyResetMutationHookResult = ReturnType<typeof useProxyResetMutation>;
export type ProxyResetMutationResult = Apollo.MutationResult<GProxyResetMutation>;
export type ProxyResetMutationOptions = Apollo.BaseMutationOptions<GProxyResetMutation, GProxyResetMutationVariables>;
export const MonitorStatsDocument = gql`
    query MonitorStats($parserId: String, $pagination: PaginationInput) {
  monitorStats(parserId: $parserId, pagination: $pagination) {
    ...MonitorStatFragment
  }
}
    ${MonitorStatFragmentFragmentDoc}`;

/**
 * __useMonitorStatsQuery__
 *
 * To run a query within a React component, call `useMonitorStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonitorStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorStatsQuery({
 *   variables: {
 *      parserId: // value for 'parserId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMonitorStatsQuery(baseOptions?: Apollo.QueryHookOptions<GMonitorStatsQuery, GMonitorStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GMonitorStatsQuery, GMonitorStatsQueryVariables>(MonitorStatsDocument, options);
      }
export function useMonitorStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GMonitorStatsQuery, GMonitorStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GMonitorStatsQuery, GMonitorStatsQueryVariables>(MonitorStatsDocument, options);
        }
export function useMonitorStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GMonitorStatsQuery, GMonitorStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GMonitorStatsQuery, GMonitorStatsQueryVariables>(MonitorStatsDocument, options);
        }
export type MonitorStatsQueryHookResult = ReturnType<typeof useMonitorStatsQuery>;
export type MonitorStatsLazyQueryHookResult = ReturnType<typeof useMonitorStatsLazyQuery>;
export type MonitorStatsSuspenseQueryHookResult = ReturnType<typeof useMonitorStatsSuspenseQuery>;
export type MonitorStatsQueryResult = Apollo.QueryResult<GMonitorStatsQuery, GMonitorStatsQueryVariables>;
export function refetchMonitorStatsQuery(variables?: GMonitorStatsQueryVariables) {
      return { query: MonitorStatsDocument, variables: variables }
    }
export const MonitorLogsDocument = gql`
    query MonitorLogs($pagination: PaginationInput) {
  monitorLogs(pagination: $pagination) {
    ...MonitorLogFragment
  }
}
    ${MonitorLogFragmentFragmentDoc}`;

/**
 * __useMonitorLogsQuery__
 *
 * To run a query within a React component, call `useMonitorLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonitorLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorLogsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMonitorLogsQuery(baseOptions?: Apollo.QueryHookOptions<GMonitorLogsQuery, GMonitorLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GMonitorLogsQuery, GMonitorLogsQueryVariables>(MonitorLogsDocument, options);
      }
export function useMonitorLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GMonitorLogsQuery, GMonitorLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GMonitorLogsQuery, GMonitorLogsQueryVariables>(MonitorLogsDocument, options);
        }
export function useMonitorLogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GMonitorLogsQuery, GMonitorLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GMonitorLogsQuery, GMonitorLogsQueryVariables>(MonitorLogsDocument, options);
        }
export type MonitorLogsQueryHookResult = ReturnType<typeof useMonitorLogsQuery>;
export type MonitorLogsLazyQueryHookResult = ReturnType<typeof useMonitorLogsLazyQuery>;
export type MonitorLogsSuspenseQueryHookResult = ReturnType<typeof useMonitorLogsSuspenseQuery>;
export type MonitorLogsQueryResult = Apollo.QueryResult<GMonitorLogsQuery, GMonitorLogsQueryVariables>;
export function refetchMonitorLogsQuery(variables?: GMonitorLogsQueryVariables) {
      return { query: MonitorLogsDocument, variables: variables }
    }
export const MonitorStatCreatedDocument = gql`
    subscription MonitorStatCreated($parserId: String) {
  monitorStatCreated(parserId: $parserId) {
    ...MonitorStatFragment
  }
}
    ${MonitorStatFragmentFragmentDoc}`;

/**
 * __useMonitorStatCreatedSubscription__
 *
 * To run a query within a React component, call `useMonitorStatCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMonitorStatCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorStatCreatedSubscription({
 *   variables: {
 *      parserId: // value for 'parserId'
 *   },
 * });
 */
export function useMonitorStatCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GMonitorStatCreatedSubscription, GMonitorStatCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GMonitorStatCreatedSubscription, GMonitorStatCreatedSubscriptionVariables>(MonitorStatCreatedDocument, options);
      }
export type MonitorStatCreatedSubscriptionHookResult = ReturnType<typeof useMonitorStatCreatedSubscription>;
export type MonitorStatCreatedSubscriptionResult = Apollo.SubscriptionResult<GMonitorStatCreatedSubscription>;
export const MonitorLogCreatedDocument = gql`
    subscription MonitorLogCreated($parserId: String) {
  monitorLogCreated(parserId: $parserId) {
    ...MonitorLogFragment
  }
}
    ${MonitorLogFragmentFragmentDoc}`;

/**
 * __useMonitorLogCreatedSubscription__
 *
 * To run a query within a React component, call `useMonitorLogCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMonitorLogCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitorLogCreatedSubscription({
 *   variables: {
 *      parserId: // value for 'parserId'
 *   },
 * });
 */
export function useMonitorLogCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GMonitorLogCreatedSubscription, GMonitorLogCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GMonitorLogCreatedSubscription, GMonitorLogCreatedSubscriptionVariables>(MonitorLogCreatedDocument, options);
      }
export type MonitorLogCreatedSubscriptionHookResult = ReturnType<typeof useMonitorLogCreatedSubscription>;
export type MonitorLogCreatedSubscriptionResult = Apollo.SubscriptionResult<GMonitorLogCreatedSubscription>;
export const PatentsDocument = gql`
    query Patents($pagination: PaginationInput, $search: String) {
  patents(pagination: $pagination, search: $search) {
    id
    urlGoogle
    urlYandex
    title
    abstract
  }
}
    `;

/**
 * __usePatentsQuery__
 *
 * To run a query within a React component, call `usePatentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatentsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function usePatentsQuery(baseOptions?: Apollo.QueryHookOptions<GPatentsQuery, GPatentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GPatentsQuery, GPatentsQueryVariables>(PatentsDocument, options);
      }
export function usePatentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GPatentsQuery, GPatentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GPatentsQuery, GPatentsQueryVariables>(PatentsDocument, options);
        }
export function usePatentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GPatentsQuery, GPatentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GPatentsQuery, GPatentsQueryVariables>(PatentsDocument, options);
        }
export type PatentsQueryHookResult = ReturnType<typeof usePatentsQuery>;
export type PatentsLazyQueryHookResult = ReturnType<typeof usePatentsLazyQuery>;
export type PatentsSuspenseQueryHookResult = ReturnType<typeof usePatentsSuspenseQuery>;
export type PatentsQueryResult = Apollo.QueryResult<GPatentsQuery, GPatentsQueryVariables>;
export function refetchPatentsQuery(variables?: GPatentsQueryVariables) {
      return { query: PatentsDocument, variables: variables }
    }
export const PatentsCountDocument = gql`
    query PatentsCount {
  patentsCount
}
    `;

/**
 * __usePatentsCountQuery__
 *
 * To run a query within a React component, call `usePatentsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatentsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatentsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePatentsCountQuery(baseOptions?: Apollo.QueryHookOptions<GPatentsCountQuery, GPatentsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GPatentsCountQuery, GPatentsCountQueryVariables>(PatentsCountDocument, options);
      }
export function usePatentsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GPatentsCountQuery, GPatentsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GPatentsCountQuery, GPatentsCountQueryVariables>(PatentsCountDocument, options);
        }
export function usePatentsCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GPatentsCountQuery, GPatentsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GPatentsCountQuery, GPatentsCountQueryVariables>(PatentsCountDocument, options);
        }
export type PatentsCountQueryHookResult = ReturnType<typeof usePatentsCountQuery>;
export type PatentsCountLazyQueryHookResult = ReturnType<typeof usePatentsCountLazyQuery>;
export type PatentsCountSuspenseQueryHookResult = ReturnType<typeof usePatentsCountSuspenseQuery>;
export type PatentsCountQueryResult = Apollo.QueryResult<GPatentsCountQuery, GPatentsCountQueryVariables>;
export function refetchPatentsCountQuery(variables?: GPatentsCountQueryVariables) {
      return { query: PatentsCountDocument, variables: variables }
    }
export const PatentDocument = gql`
    query Patent($patentId: String!) {
  patent(id: $patentId) {
    id
    urlGoogle
    urlYandex
    title
    abstract
    description
    classifications
    claims
    concepts {
      id
      name
      domain
      smiles
      inchiKey
      queryMatch
      sections
      count
      patentNumber
    }
    relations {
      patentMainId
      type
      patentOtherId
    }
  }
}
    `;

/**
 * __usePatentQuery__
 *
 * To run a query within a React component, call `usePatentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatentQuery({
 *   variables: {
 *      patentId: // value for 'patentId'
 *   },
 * });
 */
export function usePatentQuery(baseOptions: Apollo.QueryHookOptions<GPatentQuery, GPatentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GPatentQuery, GPatentQueryVariables>(PatentDocument, options);
      }
export function usePatentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GPatentQuery, GPatentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GPatentQuery, GPatentQueryVariables>(PatentDocument, options);
        }
export function usePatentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GPatentQuery, GPatentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GPatentQuery, GPatentQueryVariables>(PatentDocument, options);
        }
export type PatentQueryHookResult = ReturnType<typeof usePatentQuery>;
export type PatentLazyQueryHookResult = ReturnType<typeof usePatentLazyQuery>;
export type PatentSuspenseQueryHookResult = ReturnType<typeof usePatentSuspenseQuery>;
export type PatentQueryResult = Apollo.QueryResult<GPatentQuery, GPatentQueryVariables>;
export function refetchPatentQuery(variables: GPatentQueryVariables) {
      return { query: PatentDocument, variables: variables }
    }
export const PatentsParseDocument = gql`
    mutation PatentsParse($patentUrl: URL!) {
  patentParse(patentUrl: $patentUrl)
}
    `;
export type GPatentsParseMutationFn = Apollo.MutationFunction<GPatentsParseMutation, GPatentsParseMutationVariables>;

/**
 * __usePatentsParseMutation__
 *
 * To run a mutation, you first call `usePatentsParseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePatentsParseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [patentsParseMutation, { data, loading, error }] = usePatentsParseMutation({
 *   variables: {
 *      patentUrl: // value for 'patentUrl'
 *   },
 * });
 */
export function usePatentsParseMutation(baseOptions?: Apollo.MutationHookOptions<GPatentsParseMutation, GPatentsParseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GPatentsParseMutation, GPatentsParseMutationVariables>(PatentsParseDocument, options);
      }
export type PatentsParseMutationHookResult = ReturnType<typeof usePatentsParseMutation>;
export type PatentsParseMutationResult = Apollo.MutationResult<GPatentsParseMutation>;
export type PatentsParseMutationOptions = Apollo.BaseMutationOptions<GPatentsParseMutation, GPatentsParseMutationVariables>;
export const PatentsSearchDocument = gql`
    mutation PatentsSearch($search: String!, $isOrganisation: Boolean!, $isIgnoreExisting: Boolean!) {
  patentsSearch(
    search: $search
    isOrganisation: $isOrganisation
    isIgnoreExisting: $isIgnoreExisting
  )
}
    `;
export type GPatentsSearchMutationFn = Apollo.MutationFunction<GPatentsSearchMutation, GPatentsSearchMutationVariables>;

/**
 * __usePatentsSearchMutation__
 *
 * To run a mutation, you first call `usePatentsSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePatentsSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [patentsSearchMutation, { data, loading, error }] = usePatentsSearchMutation({
 *   variables: {
 *      search: // value for 'search'
 *      isOrganisation: // value for 'isOrganisation'
 *      isIgnoreExisting: // value for 'isIgnoreExisting'
 *   },
 * });
 */
export function usePatentsSearchMutation(baseOptions?: Apollo.MutationHookOptions<GPatentsSearchMutation, GPatentsSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GPatentsSearchMutation, GPatentsSearchMutationVariables>(PatentsSearchDocument, options);
      }
export type PatentsSearchMutationHookResult = ReturnType<typeof usePatentsSearchMutation>;
export type PatentsSearchMutationResult = Apollo.MutationResult<GPatentsSearchMutation>;
export type PatentsSearchMutationOptions = Apollo.BaseMutationOptions<GPatentsSearchMutation, GPatentsSearchMutationVariables>;
export const PatentsCountChangedDocument = gql`
    subscription PatentsCountChanged {
  patentsCountChanged
}
    `;

/**
 * __usePatentsCountChangedSubscription__
 *
 * To run a query within a React component, call `usePatentsCountChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePatentsCountChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatentsCountChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePatentsCountChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GPatentsCountChangedSubscription, GPatentsCountChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GPatentsCountChangedSubscription, GPatentsCountChangedSubscriptionVariables>(PatentsCountChangedDocument, options);
      }
export type PatentsCountChangedSubscriptionHookResult = ReturnType<typeof usePatentsCountChangedSubscription>;
export type PatentsCountChangedSubscriptionResult = Apollo.SubscriptionResult<GPatentsCountChangedSubscription>;
export const QueueLengthDocument = gql`
    query QueueLength {
  queueLength {
    total
    processing
  }
}
    `;

/**
 * __useQueueLengthQuery__
 *
 * To run a query within a React component, call `useQueueLengthQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueueLengthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueLengthQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueueLengthQuery(baseOptions?: Apollo.QueryHookOptions<GQueueLengthQuery, GQueueLengthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQueueLengthQuery, GQueueLengthQueryVariables>(QueueLengthDocument, options);
      }
export function useQueueLengthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQueueLengthQuery, GQueueLengthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQueueLengthQuery, GQueueLengthQueryVariables>(QueueLengthDocument, options);
        }
export function useQueueLengthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GQueueLengthQuery, GQueueLengthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GQueueLengthQuery, GQueueLengthQueryVariables>(QueueLengthDocument, options);
        }
export type QueueLengthQueryHookResult = ReturnType<typeof useQueueLengthQuery>;
export type QueueLengthLazyQueryHookResult = ReturnType<typeof useQueueLengthLazyQuery>;
export type QueueLengthSuspenseQueryHookResult = ReturnType<typeof useQueueLengthSuspenseQuery>;
export type QueueLengthQueryResult = Apollo.QueryResult<GQueueLengthQuery, GQueueLengthQueryVariables>;
export function refetchQueueLengthQuery(variables?: GQueueLengthQueryVariables) {
      return { query: QueueLengthDocument, variables: variables }
    }
export const QueueChangedDocument = gql`
    subscription QueueChanged {
  queueChanged {
    total
    processing
  }
}
    `;

/**
 * __useQueueChangedSubscription__
 *
 * To run a query within a React component, call `useQueueChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useQueueChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useQueueChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GQueueChangedSubscription, GQueueChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GQueueChangedSubscription, GQueueChangedSubscriptionVariables>(QueueChangedDocument, options);
      }
export type QueueChangedSubscriptionHookResult = ReturnType<typeof useQueueChangedSubscription>;
export type QueueChangedSubscriptionResult = Apollo.SubscriptionResult<GQueueChangedSubscription>;