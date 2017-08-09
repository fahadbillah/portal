var mongoose=require("mongoose");
var timestamps = require('mongoose-timestamp');

var employeeContact = new mongoose.Schema({
  email : {type:String, required:true, unique:true},
  phone : {type:String},
  secondaryPhone : {type:String},
  emergencyContactPerson: {
    name : {type:String},
    phone : {type:String},
    relation : {type:String}
  },
  address: {
    current : {type:String},
    permanent : {type:String}
  }
});

employeeContact.plugin(timestamps);

module.exports=mongoose.model("employee_contacts",employeeContact);
