const { Schema, model } = require('mongoose');

const weaponSchema = new Schema({
name:{
    type: String,
    require: true,
},
damage:{
    type:Number,
    require: true,
},  
});

const Weapon = model("Weapon", weaponSchema);

module.exports = Weapon;