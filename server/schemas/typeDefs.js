const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    progression: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String, password: String, progression: Int): Auth
    login(username: String, password: String): Auth

  }
`;

module.exports = typeDefs;
