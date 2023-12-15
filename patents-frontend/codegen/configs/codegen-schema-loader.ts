import type { CodegenConfig } from '@graphql-codegen/cli';
import { API_GRAPHQL_ENDPOINT, schemaGql, schemaJson } from '../utils';

export default {
  schema: API_GRAPHQL_ENDPOINT,
  overwrite: true,
  generates: {
    [schemaGql]: {
      plugins: ['schema-ast'],
    },
    [schemaJson]: {
      plugins: ['introspection'],
      config: { minify: true },
    },
  },
} satisfies CodegenConfig;
