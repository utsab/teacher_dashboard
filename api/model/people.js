var mongoose = require('mongoose');  

var peopleSchema = new mongoose.Schema({  
  name: String,
  age: Number,
  isloved: Boolean
});

module.exports = mongoose.model('People', peopleSchema);