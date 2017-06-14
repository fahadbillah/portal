var fs = require('fs');
var express = require('express');
var router = express.Router();
var employee = require('../models/employee');
var Crypt = require('../middlewares/crypt');
var jwt = require('jsonwebtoken');
/* POST login data. */
router.post('/login', function(req, res, next) {
  // console.log(req.body);
  // res.json(req.body);

  // employee.findOne({'contact_info.email': req.body.email},function() {})


  employee.findOne({ 'contact_info.email': req.body.userName })
  .select('-password')
  .exec(function(error, data) {
    if (error) {
      res.json({
        success: false,
        data: error
      });
    } else {
      var cert = fs.readFileSync('private.key');  // get private key
      var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 2*60,
        data: data
      }, cert);
      res.json({
        success: true,
        token: token
      });
    }
  });
});


/* GET login status. */
router.get('/login_status', function(req, res, next) {
  res.send("not expired");
});



module.exports = router;
