const { Schema, model } = require('mongoose');

const partySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "PartyMember"
  }],
  encounters: [{
    type: Schema.Types.ObjectId,
    ref: "Encounter"
  }]
});

const Party = model('Party', partySchema);

module.exports = Party;

