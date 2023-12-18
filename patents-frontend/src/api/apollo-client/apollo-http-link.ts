import { createHttpLink } from '@apollo/client';

/**
 * Connection properties for Apollo Client HTTP.
 */
export const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GQL_ENDPOINT,
  // credentials: import.meta.env.DEV ? 'include' : 'same-origin',
});
