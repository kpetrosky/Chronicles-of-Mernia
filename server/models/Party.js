const { Schema, model } = require('mongoose');

const partySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  speed: {
    type: String,
    required: true,
    minlength: 5,
  },
  health: {
    type: String,
    required: true,
    minlength: 5,
  },
  members: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const Party = model('Party', partySchema);

module.exports = Party;

