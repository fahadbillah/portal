var express = require('express');
var router = express.Router();
var employeeSchema = require('../models/employeeSchema');

/* GET employee listing. */
router.get('/', function(req, res, next) {
  res.send('List of employee');
});

/* GET employee listing. */
router.post('/setup/:token', function(req, res, next) {
  var token = req.params.token;
  if (token !== 'MdoyAhZUXKdIAnExBYE') {
    res.send('not authorized');
  }
  console.log('setup');
  var setupEmployee = {
    first_name : 'Fahad',
    last_name : 'Billah',
    password : 123,
    gender : 'male',
    contact_info : {
      email : 'fahadbillah@yahoo.com'
    },
    account_status : 'active',
    profile_picture: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/17630116_10211178721376789_6914022446268479040_n.jpg?oh=55249b0c95137d8d9aef45e3aa97d785&oe=59E4248A'
  };

  employeeSchema.findOne({ 'contact_info.email' : 'fahadbillah@yahoo.com' },function(err, employee) {
    if(err){
      console.log("error found in /employee/employee_change_password at employeeSchema.findOne()");
      console.error(err);
      res.status(500).json(err);
    }else{
      if (employee === null) {
        var firstEmployee = new employeeSchema(setupEmployee);
        firstEmployee.save(function(error){
          if(error){
            console.log(error);
            res.status(500).json(error);
          }else{
            console.log("a new employee saved");
            res.send("a new employee saved");
          }
        });
      }else{
        res.json(employee);
      }
    }
  });

});

/* GET single employee. */
router.get('/profile/:_id', function (req, res) {
  employeeSchema.findOne({ '_id' : req.params._id },function(err, employee) {
    if(err){
      console.log("no employee found with this id");
      res.json(err);
    }else{
      res.json(employee);
    }
  });
});

module.exports = router;
