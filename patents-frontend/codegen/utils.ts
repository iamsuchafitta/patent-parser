import { join, resolve } from 'node:path';

/* Utils */
export const getSrcDir = (...subDirs: string[]): string => join(process.cwd(), 'src', ...subDirs);

/* Plugins */
export const SchemaClientPlugin = resolve('codegen', 'plugins', 'schema-client.plugin');

/* Env */
export const API_GRAPHQL_ENDPOINT = process.env.VITE_API_GRAPHQL_ENDPOINT;

/* Paths */
export const srcApiDir = getSrcDir('api');
export const generatedTs = getSrcDir('api', 'generated.ts');
export const schemaGql = getSrcDir('api', 'schema.gql');
export const schemaJson = getSrcDir('api', 'schema.json');
