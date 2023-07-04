const { Schema, model } = require('mongoose');

const partySchema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   trim: true,
  // },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "PartyMember"
  }],
  // encounters: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Encounter"
  // }]
  //
  //need progress-number, excounters, creates login, are all going to be depended on global position. 
});

const Party = model('Party', partySchema);

module.exports = Party;

