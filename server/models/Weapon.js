const { Schema, model } = require('mongoose');

const weaponSchema = new Schema({
name:{
    type: String,
    require: true,
},
damage:{
    type: Array,
    require: true,
},
class:{
    type: String,
    require: true,
},
});

const Weapon = model("Weapon", weaponSchema);

module.exports = Weapon;