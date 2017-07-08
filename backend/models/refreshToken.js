var mongoose=require("mongoose");
// var timestamps = require('mongoose-timestamp');

var refreshToken = new mongoose.Schema({
  refresh_token : {type:String, required:true},
  user_info : { type: Object },
  expiredAt : { type: Date, expires: 10 }
}); 

// refreshToken.plugin(timestamps);