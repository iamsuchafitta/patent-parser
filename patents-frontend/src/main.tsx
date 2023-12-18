import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { apolloClient } from './api/apollo-client/apollo-client.ts';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ApolloProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
