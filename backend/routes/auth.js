var express = require('express');
var router = express.Router();
var employeeSchema = require('../models/employeeSchema');
var Crypt = require('../middlewares/crypt');

/* POST login data. */
router.post('/login', Crypt.passwordEncrypt, function(req, res, next) {
  console.log(req.body);

  Crypt.decrypt();



  res.json(req.body);
});

module.exports = router;
