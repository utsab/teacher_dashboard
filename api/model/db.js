import mongoose from 'mongoose';
var mongoURI = "mongodb://psaigal:password@ds161630.mlab.com:61630/fcc-test-db";
var db = mongoose.connect(mongoURI, function(err){
  if(err){
    console.log(err);
  } else{
    console.log('Finally connected!!!');
    console.log('In database!!!!!!');
  }
});

module.exports = db;
