import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { client } from './api/client.ts';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
