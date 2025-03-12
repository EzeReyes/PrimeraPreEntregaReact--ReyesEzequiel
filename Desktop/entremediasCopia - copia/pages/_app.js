// ./pages/_app.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { CarritoProvider } from '../context/cartContext';
import '../styles/globals.css'; // Asegúrate de que la ruta sea correcta
import { ProductProvider } from '@/context/productsContext';
import { EnvioProvider } from '@/context/envioContext';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);


  return (
    <ApolloProvider client={apolloClient}>
          <ProductProvider>
          <CarritoProvider>
          <EnvioProvider>
            <Component {...pageProps} />
          </EnvioProvider>
          </CarritoProvider>
          </ProductProvider>
    </ApolloProvider>
  );
}

export default MyApp;
