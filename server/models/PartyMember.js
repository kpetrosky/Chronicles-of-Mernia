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
    
  },
  special: {
    type: Number,
    required: true,
    
  },
  attack: {
    type: Number,
    required: true,
    
  },
  weapon: weaponSchema,

  attack: {
    type: Number,
    required: true,
  },
  // level: {
  //   type: Number,
  //   required: true,
  // },

});
//current hp, max, hp, defense, speed, dodge,
const PartyMember = model('PartyMember', partyMemberSchema);

module.exports = PartyMember;
