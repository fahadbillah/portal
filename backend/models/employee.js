var mongoose=require("mongoose");
var timestamps = require('mongoose-timestamp');
var bcrypt=require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var saltRounds = 10;
var employeeContact = require('./employeeContact').employeeContact;
var shortEmployeeContact = require('./employeeContact').shortEmployeeContact;

var employee = new mongoose.Schema({
  first_name : {type:String, required:true},
  middle_name : {type:String},
  last_name : {type:String, required:true},
  password : {type:String, required:true},
  gender : {
    type : String, 
    enum : ['male', 'female'],
    required : true
  },
  contact_info : shortEmployeeContact,
  account_status : {
    type : String, 
    enum: ['not_yet_activated', 'active', 'deactivated'],
    required : true
  },
  access : {type:Array},
  profile_picture : {type: String},
}); 


employee.plugin(timestamps);


employee.pre('save', function(next) {
  console.log(this);
  var employeeData = this;
  console.log(employeeData.contact_info);
  var contactOfEmployee = new employeeContact(employeeData.contact_info);
  contactOfEmployee.save(function(error){
    if(error){
      console.log(error);
      return next(error);
    }else{
      console.log("a new employee saved");
    }
  });
  if (!employeeData.isModified('password')) {
    return next();
  }
  bcrypt.hash(employeeData.password, saltRounds, function(error, hash) {
    if(error) {
      return next(error);
    }
    employeeData.password=hash;
    next();
  });
});

employee.methods.comparePassword = function(candidatePassword, callback) {
    var myPassword=this.password;
    bcrypt.compare(candidatePassword, myPassword)
    .then(function(d){
      callback(null, d);
    }, function(e, d) {
      callback(e, d);
    });
};

module.exports=mongoose.model("employee",employee);