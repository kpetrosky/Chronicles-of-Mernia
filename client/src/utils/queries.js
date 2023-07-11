import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query singleUser {
    user {
      _id
      username
      progression
    }
  }
`;

export const QUERY_WEAPONS = gql`
  query weapons {
    weapons {
      _id
      damage
      characterClass
    }
  }
`