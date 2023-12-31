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
    type: Number,
    required: true,
    default: 1,
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
    type: Number,
    required: true,
    default: 1,
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
      type: Number,
    required: true,
    default: 1,
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
      type: Number,
      required: true,
      default: 1,
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
      type: Number,
    required: true,
    default: 1,
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
      type: Number,
    required: true,
    default: 1,
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
      type: Number,
    required: true,
    default: 1,
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
  goblin: goblinSchema,
//can change to an array to make it possible to have multiple of the same creature
});

const ForestMonster = model('ForestMonster', forestMonsterSchema);

module.exports = ForestMonster;
