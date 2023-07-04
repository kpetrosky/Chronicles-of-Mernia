const { Schema, model } = require('mongoose');
const weaponSchema = require ("./Weapon")
const partyMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  class: {
    type: String,
    required: true,
    minlength: 5,
  },
  special: {
    type: String,
    required: true,
    minlength: 5,
  },
  attack: {
    type: Number,
    required: true,
    minlength: 5,
  },
  weapon: weaponSchema,

  level: {
    type: Number,
    required: true,
    minlength: 1,
  },
  damage: {
    type: Number,
    required: true,
    minlength: 1,
  },
});

const PartyMember = model('PartyMember', partyMemberSchema);

module.exports = PartyMember;
