const { AuthenticationError } = require('apollo-server-express');
const { User, Weapon, PartyMember, Party } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate({
          path: 'party',
          model: 'Party',
          populate: {
            path: 'members',
            model: 'PartyMember',
            populate: {
              path: 'weapon',
              model: 'Weapon'
            }
          }
        });
      }
    },
    weapons: async (parent, args) => {
      return Weapon.find({});
    },
    party: async (parent, { _id }) => {
      return await Party.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, password, progression }) => {
      const user = await User.create({ username, password, progression });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user with this username found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPartyMember: async (parent, { 
      name,
      characterClass,
      special,
      maxHp,
      currentHp,
      attack,
      defense,
      speed,
      dodge,
      weapon,
      position
     }) => {
      const partyMember = {
        name,
        characterClass,
        special,
        maxHp,
        currentHp,
        attack,
        defense,
        speed,
        dodge,
        weapon,
        position
      };
      const newPartyMember = await PartyMember.create(partyMember);
      await newPartyMember.populate('weapon');
      return newPartyMember;
    },
    addParty: async (parent, { members }) => {
      const partyMemberArray = []
      for (const member of members) {
        const partyMemberData = await PartyMember.findOne({ _id: member }).populate('weapon');
        partyMemberArray.push(partyMemberData);
      }
      const newParty = await Party.create({ members: partyMemberArray })
      return newParty;
    },
    updateUserParty: async (parent, { party }, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, { $set: { party } }, { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateUserProgression: async (parent, { progression }, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, { $set: { progression } }, { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updatePartyMemberHp: async (parent, { _id, currentHp }) => {
      return PartyMember.findOneAndUpdate({ _id }, { $set: { currentHp }}, { new: true });
    },
  },
};

module.exports = resolvers;
