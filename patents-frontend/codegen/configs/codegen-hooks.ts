import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';
import { generatedTs, srcApiDir } from '../utils';

export default {
  schema: join(srcApiDir, '{schema,schema-client}.gql'),
  overwrite: true,
  documents: join(srcApiDir, 'documents', '**', '*.{gql,graphql}'),
  config: {
    typesPrefix: 'G',
    skipTypename: true,
    strictScalars: true,
    // avoidOptionals: {
    //   field: true,
    //   inputValue: false,
    //   object: true,
    //   defaultValue: true,
    // },
    scalars: {
      ID: 'string',
      DateTime: 'string',
      EmailAddress: 'string',
      UUID: 'string',
      URL: 'string',
      JSON: 'any',
    },
    // maybeValue: 'T | null',
    // inputMaybeValue: 'T | null | undefined',
  },
  generates: {
    [generatedTs]: {
      // hooks: {afterOneFileWrite: ['eslint --fix']},
      plugins: [
        // {add: {content: '/* eslint-disable */'}},
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withRefetchFn: true,
      },
      // preset: 'client',
    },
  },
} satisfies CodegenConfig;
