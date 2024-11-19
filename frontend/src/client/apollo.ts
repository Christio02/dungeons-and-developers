import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          user: {
            keyArgs: ['id'],
            merge(existing = {}, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
      User: {
        keyFields: ['id'],
        fields: {
          favoritedMonsters: {
            merge: false,
          },
          dungeonName: {
            merge: false,
          },
          class: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          race: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
      Class: {
        keyFields: ['name'],
      },
      Race: {
        keyFields: ['name'],
      },
      Monster: {
        keyFields: ['id'],
      },
    },
  }),
});

export default client;
