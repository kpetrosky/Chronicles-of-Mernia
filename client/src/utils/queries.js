import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
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