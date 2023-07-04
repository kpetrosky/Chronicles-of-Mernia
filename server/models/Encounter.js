const { Schema, model } = require('mongoose');


const encounterSchema = new Schema({
    initiativeOrder1: {
    type: String,
    trim: true,
  },
  initiativeOrder2: {
    type: String,
    trim: true,
  },
  initiativeOrder3: {
    type: String,
    trim: true,
  },
  initiativeOrder4: {
    type: String,
    trim: true,
  }, 
  initiativeOrder5: {
    type: String,
    trim: true,
  }, 
  initiativeOrder6: {
    type: String,
    trim: true,
  },
   initiativeOrder7: {
    type: String,
    trim: true,
  },
   initiativeOrder8: {
    type: String,
    trim: true,
  }, 
  

});

const Encounter = model('Encounter', encounterSchema);

module.exports = Encounter;
