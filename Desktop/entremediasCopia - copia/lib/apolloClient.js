// apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useMemo } from 'react';

const httpLink = createHttpLink({
  uri: 'https://entremedias-shop.vercel.app/graphql', // Asegúrate de que la URL sea correcta
  // uri: 'http://localhost:4002/graphql', // Asegúrate de que la URL sea correcta
  // uri: 'https://aba7-2800-2503-123-b7ec-ed9d-73d3-2ad9-389b.ngrok-free.app/graphql', // Asegúrate de que la URL sea correcta
});

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
