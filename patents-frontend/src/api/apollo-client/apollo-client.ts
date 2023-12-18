/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { wsLink } from './apollo-ws-link.ts';
import { httpLink } from './apollo-http-link.ts';

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  queryDeduplication: true,
  connectToDevTools: true, //import.meta.env.DEV,
  defaultOptions: {
    query: {
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      // @ts-ignore
      notifyOnNetworkStatusChange: true,
    },
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});
