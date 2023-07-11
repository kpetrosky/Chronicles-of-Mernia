//preplanned critters, and postions, encounter model, when we seed the database

//enemy: name, attack, hp, speed
const { Schema, model } = require('mongoose');

const enemySchema = new Schema({
    _id:{
        type: String,
    },
    name: {
        type: String,
    },
    attack: {
        type: Number,
    },
    hp: {
        type: Number,
    },
    speed: {
        type: Array,
    },
});

const Enemy = model('Enemy', enemySchema);

module.exports = Enemy;

