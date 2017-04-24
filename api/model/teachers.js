var mongoose = require('mongoose');  

var teachersSchema = new mongoose.Schema({  
  name: String,
  username: String,
  email: String,
  password: String

});

module.exports = mongoose.model('Teachers', teachersSchema);