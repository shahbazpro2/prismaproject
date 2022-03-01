import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';

function MyApp({ Component, pageProps }: AppProps) {

  const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    let err: any = []
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        err.push(`${message}`)
      }
      );
    }
    if (networkError) err.push(`Response not successful`)
    console.log(err, graphQLErrors)
  });

  const httpLink = createHttpLink({
    uri: '/api/graphql/',
  });

  const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp
