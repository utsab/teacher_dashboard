var mongoose = require('mongoose');  

var usersSchema = new mongoose.Schema({  
  name: String,
  password: String,
  email: String
});

module.exports = mongoose.model('Users', usersSchema);