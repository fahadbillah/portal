var mongoose=require("mongoose");
// var timestamps = require('mongoose-timestamp');

var refreshToken = new mongoose.Schema({
  refresh_token : {type:String, required:true},
  user_info : { type: Object },
  expiredAt : { type: Date, expires: 3600, default: Date.now }
}); 

module.exports=mongoose.model("refreshToken",refreshToken);
