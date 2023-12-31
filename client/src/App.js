import React from "react";
import Map from "./Map";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
const deployedUrl = 'https://mighty-depths-85532-6b358948c948.herokuapp.com/graphql'
const httpLink = createHttpLink({
uri: deployedUrl,
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
function App() {
    return (
        <ApolloProvider client={client}>
            <Map />
        </ApolloProvider>
    );
}
export default App;
