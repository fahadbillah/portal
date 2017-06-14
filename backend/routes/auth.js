var fs = require('fs');
var express = require('express');
var router = express.Router();
var employee = require('../models/employee');
var Crypt = require('../middlewares/crypt');
var jwt = require('jsonwebtoken');

/* POST login data. */
router.post('/login', function(req, res, next) {
  employee.findOne({ 'contact_info.email': req.body.userName })
  .exec(function(error, employeeData) {
    if (error) {
      res.json({
        success: false,
        data: error
      });
    } else {

      var loginCandidate = new employee(employeeData);
      loginCandidate.comparePassword(req.body.password, function(match) {
        if (match) {
          employeeData = JSON.parse(JSON.stringify(employeeData));

          delete employeeData.password

          var cert = fs.readFileSync('private.key');  // get private key
          var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 2*60,
            data: employeeData
          }, cert);
          res.json({
            success: true,
            token: token,
            data: employeeData
          });
        } else {
          res.json({
            success: false,
            data: {
              message: 'password mismatch!'
            }
          });
        }
      })
    }
  });
});


/* GET login status. */
router.get('/login_status', function(req, res, next) {
  res.send("not expired");
});



module.exports = router;
