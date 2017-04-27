var mongoose = require('mongoose');  

var classRoomSchema = new mongoose.Schema({  
  name: String,
  students: [{
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Students'
  }]
});

module.exports = mongoose.model('Classroom', classRoomSchema);