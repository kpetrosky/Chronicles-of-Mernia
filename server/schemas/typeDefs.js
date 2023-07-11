const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    party: Party
    progression: Int
  }

  type Weapon {
    _id: ID
    name: String
    damage: [Int]
    characterClass: String
  }

  type PartyMember {
    _id: ID!
    name: String!
    characterClass: String!
    special: Int!
    maxHp: Int!
    currentHp: Int!
    attack: Int!
    defense: Int!
    speed: [Int!]!
    dodge: Int!
    weapon: Weapon!
    position: Int!
  }

  type Party {
    _id: ID!
    members: [PartyMember]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    weapons: [Weapon]
    party(_id: ID): Party
  }

  type Mutation {
    addUser(username: String, password: String, progression: Int): Auth
    login(username: String, password: String): Auth
    addPartyMember(
      name: String!
      characterClass: String!
      special: Int!
      maxHp: Int!
      currentHp: Int!
      attack: Int!
      defense: Int!
      speed: [Int!]!
      dodge: Int!
      weapon: ID!
      position: Int!): PartyMember
    addParty(members: [ID!]): Party
    updateUserParty(party: ID!): User
    updateUserProgression(progression: Int): User
  }
`;

module.exports = typeDefs;
