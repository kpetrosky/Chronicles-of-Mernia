const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const giantWaspSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    max: 1,
  },
  attack: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  health: {
    type: String,
    required: true,
    minlength: 5,
  },
  speed: {
    type: String,
    required: true,
    minlength: 5,
  },
});

const koboldSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    max: 1,
  },
  attack: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  health: {
    type: String,
    required: true,
    minlength: 5,
  },
  speed: {
    type: String,
    required: true,
    minlength: 5,
  },
});

const orcSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      max: 1,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    health: {
      type: String,
      required: true,
      minlength: 5,
    },
    speed: {
      type: String,
      required: true,
      minlength: 5,
    },
  });
  const tigerSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      max: 1,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    health: {
      type: String,
      required: true,
      minlength: 5,
    },
    speed: {
      type: String,
      required: true,
      minlength: 5,
    },
  });const goblinSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      max: 1,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    health: {
      type: String,
      required: true,
      minlength: 5,
    },
    speed: {
      type: String,
      required: true,
      minlength: 5,
    },
  });const bearSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      max: 1,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    health: {
      type: String,
      required: true,
      minlength: 5,
    },
    speed: {
      type: String,
      required: true,
      minlength: 5,
    },
  });
  const elderitchOozeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      max: 1,
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    health: {
      type: String,
      required: true,
      minlength: 5,
    },
    speed: {
      type: String,
      required: true,
      minlength: 5,
    },
  });
const forestMonsterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  giantWasp: giantWaspSchema, // Embedding the giantWasp submodel
  kobold: koboldSchema, // Embedding the kobold submodel
  vulture: vultureSchema,
  orc: orcSchema,
  tiger: tigerSchema,
  bear: bearSchema,
  elderitchOoze: elderitchOozeSchema,

});

const ForestMonster = model('ForestMonster', forestMonsterSchema);

module.exports = ForestMonster;
