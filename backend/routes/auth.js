var fs = require('fs');
var express = require('express');
var router = express.Router();
var employee = require('../models/employee');
var Crypt = require('../middlewares/crypt');
var jwt = require('jsonwebtoken');
/* POST login data. */
router.post('/login', function(req, res, next) {
  console.log(req.body);

  // employee.findOne({'contact_info.email': req.body.email},function() {})


  employee.findOne({ 'contact_info.email': req.body.userName })
  .select('-password')
  .exec(function(error, data) {
    var cert = fs.readFileSync('private.key');  // get private key

    var token = jwt.sign(data, cert);

    res.json(token);
  })
});

module.exports = router;
