var mongoose = require('mongoose');  

var teachersSchema = new mongoose.Schema({  
  name: String,
  username: String,
  email: String,
  password: String,
  students: [{
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Students'
  }]
});

module.exports = mongoose.model('Teachers', teachersSchema);