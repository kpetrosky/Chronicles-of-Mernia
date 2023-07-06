import { gql } from '@apollo/client';


// modify mutations once typeDefs and resolvers are set up
export const ADD_USER = gql`
  mutation addUser($username: String, $password: String) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;