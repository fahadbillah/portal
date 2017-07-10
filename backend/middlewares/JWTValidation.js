const jwt = require('jsonwebtoken');

var JWTValidation = function (req, res, next) {
  console.log('hello from JWTValidation');
  next();
}

module.exports = JWTValidation;