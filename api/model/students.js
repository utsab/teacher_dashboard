var mongoose = require('mongoose');  

var studentsSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  githubUsername: String,
  email: String,
  notes: String,
  lastSubmittedAssignment: String,
  daysInactive: String,
  teacher: {type: mongoose.Schema.Types.ObjectId, ref:'Teachers'}
});

module.exports = mongoose.model('Students', studentsSchema);

