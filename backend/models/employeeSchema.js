var mongoose=require("mongoose");
var timestamps = require('mongoose-timestamp');
var bcrypt=require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var saltRounds = 10;


var employeeSchema = new mongoose.Schema({
  first_name : {type:String, required:true},
  middle_name : {type:String},
  last_name : {type:String, required:true},
  password : {type:String, required:true},
  gender : {
    type : String, 
    enum : ['male', 'female'],
    required : true
  },
  contact_info : {
    email : {type:String, required:true, unique:true},
    mobile : {type:String},
    phone : {type:String}
  },
  account_status : {
    type : String, 
    enum: ['not_yet_activated', 'active', 'deactivated'],
    required : true
  },
  access : {type:Array},
  profile_picture : {type: String},
}); 


employeeSchema.plugin(timestamps);


employeeSchema.pre('save', function(next) {
    var employee = this;
    if (!employee.isModified('password')) {
      return next()
    };
    bcrypt.hash(employee.password, saltRounds, function(error, hash) {
      // Store hash in your password DB. 
      if(error) {
        return next(error);
      };
      employee.password=hash;
      next();
    });
});

employeeSchema.methods.comparePassword = function(candidatePassword, callback) {
    var myPassword=this.password;
    bcrypt.compare(candidatePassword, myPassword)
    .then(function(d){
      callback(null,d);
    });
};

module.exports=mongoose.model("employee",employeeSchema);