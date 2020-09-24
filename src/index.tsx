import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import {HomeLayout} from "./components/HomeLayout";
import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const client = new ApolloClient({
  link, cache,
  connectToDevTools: true,
});

const HelloWorld = () => {
    return (
        <h1>Hello World</h1>
    )
}

ReactDOM.render(
  <HomeLayout/>,
  document.getElementById('root'),
);
