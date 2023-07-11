import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query singleUser {
    user {
      _id
      username
      progression
      party {
        _id
        members {
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
            name
            damage
            characterClass
          }
          position
        }
      }
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

export const QUERY_PARTY = gql`
  query Party($id: ID) {
    party(_id: $id) {
      _id
      members
    }
  }
`

export const QUERY_PARTY_MEMBER = gql`
  query PartyMember($id: ID) {
    partyMember(_id: $id) {
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
        name
        damage
        characterClass
      }
      position
    }
  }
`