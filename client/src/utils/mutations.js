import { gql } from '@apollo/client';


// modify mutations once typeDefs and resolvers are set up
export const ADD_USER = gql`
  mutation addUser($username: String, $password: String, $progression: Int) {
    addUser(username: $username, password: $password, progression: $progression) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PARTY_MEMBER = gql`
  mutation AddPartyMember(
    $name: String!
    $characterClass: String!
    $special: Int!
    $maxHp: Int!
    $currentHp: Int!
    $attack: Int!
    $defense: Int!
    $speed: [Int!]!
    $dodge: Int!
    $weapon: ID!
    $position: Int!) {
    addPartyMember(
      name: $name,
      characterClass: $characterClass,
      special: $special,
      maxHp: $maxHp,
      currentHp: $currentHp,
      attack: $attack,
      defense: $defense,
      speed: $speed,
      dodge: $dodge,
      weapon: $weapon,
      position: $position
    ) {
      _id
      name
      characterClass
      special
      maxHp
      currentHp
      attack
      defense
      speed
      dodge
      weapon {
        _id
        damage
        characterClass
      }
      position
    }
  }
`
export const ADD_PARTY = gql`
  mutation addParty($members: [ID!]) {
    addParty(members: $members) {
      _id
      members
    }
  }
`
export const UPDATE_USER_PARTY = gql`
  mutation updateUserParty($party: ID!) {
    updateUserParty(party: $party) {
      _id
      party {
        _id
      }
    }
  }
`
export const UPDATE_USER_PROGRESSION = gql`
  mutation updateUserProgression($progression: Int) {
    updateUserProgression(progression: $progression) {
      _id
      progression
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        progression
      }
    }
  }
`;