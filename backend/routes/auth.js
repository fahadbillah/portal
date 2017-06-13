var express = require('express');
var router = express.Router();
var employeeSchema = require('../models/employee');
var Crypt = require('../middlewares/crypt');

/* POST login data. */
router.post('/login', function(req, res, next) {
  console.log(req.body);

  employeeSchema.

  res.json(req.body);
});

module.exports = router;
