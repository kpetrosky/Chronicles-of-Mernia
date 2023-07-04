const { Schema, model } = require('mongoose');

const weaponSchema = new Schema({
name:{
    type: String,
    require: true,
},
  damage:{
    type:Number,
    require: true,
  }  
})
module.exports = weaponSchema;