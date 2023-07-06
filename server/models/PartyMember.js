const { Schema, model } = require('mongoose');

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
  maxHp: {
    type: Number,
    required: true,
  },
  currentHp: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Array,
    required: true,
  },
  dodge: {
    type: Number,
    required: true,
  },
  weapon: {
    type: Schema.Types.ObjectId,
    ref: "Weapon"
  },
  position: {
    type: Number
  }
});

const PartyMember = model('PartyMember', partyMemberSchema);

module.exports = PartyMember;
