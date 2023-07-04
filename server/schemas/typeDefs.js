const { gql } = require('apollo-server-express');

// About type definitions
const aboutTypeDefs = gql`
  type About {
    _id: ID!
    aboutText: String!
    aboutAuthor: String!
    createdAt: String!
  }

  extend type Query {
    abouts: [About]
    about(aboutId: ID!): About
  }

  extend type Mutation {
    addAbout(aboutText: String!, aboutAuthor: String!): About
    removeAbout(aboutId: ID!): About
  }
`;

// Product type definitions
const productTypeDefs = gql`
  type Product {
    _id: ID!
    productName: String!
    productDescription: String!
    createdAt: String!
  }

  extend type Query {
    products: [Product]
    product(productId: ID!): Product
  }

  extend type Mutation {
    addProduct(productName: String!, productDescription: String!): Product
    removeProduct(productId: ID!): Product
  }
`;

// CustomWork type definitions
const customWorkTypeDefs = gql`
  type CustomWork {
    _id: ID!
    customWorkName: String!
    customWorkDescription: String!
    createdAt: String!
  }

  extend type Query {
    customWorks: [CustomWork]
    customWork(customWorkId: ID!): CustomWork
  }

  extend type Mutation {
    addCustomWork(customWorkName: String!, customWorkDescription: String!): CustomWork
    removeCustomWork(customWorkId: ID!): CustomWork
  }
`;

module.exports = [aboutTypeDefs, productTypeDefs, customWorkTypeDefs];
