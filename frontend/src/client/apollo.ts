import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReviewType } from '../interfaces/ReviewProps.ts';

/**
 * Apollo Client for interacting with GraphQL server
 * Implements authorization, caching
 * **/
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
/**
 * Configures authorization by given the 'Bearer' token to the request header.
 **/
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

/**
 * Apollo Client configuration.
 * With custom cache behaviour for types and fields.
 * Implements custom Merge behaviours
 **/
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  devtools: {
    enabled: true,
  },
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
            merge(_, incoming) {
              return incoming;
            },
          },

          race: {
            merge(_, incoming) {
              return incoming;
            },
          },
          equipments: {
            merge(_, incoming) {
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
      Ability: {
        keyFields: ['id'],
      },
      Equipment: {
        keyFields: ['name'],
      },
      Monster: {
        keyFields: ['id'],
        fields: {
          reviews: {
            merge: false,
          },
        },
      },
      Review: {
        keyFields: ['id'],
      },
    },
  }),
});

export default client;
