import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink
} from '@apollo/client/core';

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    const token = import.meta.env.VITE_APP_GITHUB_TOKEN;

    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }));

    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: 'https://api.github.com/graphql' })
]);

const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache()
});

export default apolloClient;
