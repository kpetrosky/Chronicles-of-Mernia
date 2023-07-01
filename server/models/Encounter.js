const { Schema, model } = require('mongoose');


const encounterSchema = new Schema({
  initiative: {
    type: String,
    required: 'You are entering a encounter!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  encounter: {
    type: String,
    required: true,
    trim: true,
  },

});

const Encounter = model('Encounter', encounterSchema);

module.exports = Encounter;
