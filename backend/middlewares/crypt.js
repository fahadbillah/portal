var bcrypt=require('bcryptjs');


var Crypt = {
  _saltWorkFactor: 10,
  _saltRound: 10,
  passwordEncrypt: function(req, res, next) {
    if (!req.body.password) {
      next();
    }
    console.log('ecryptttt')
    bcrypt.hash(req.body.password, this._saltRound, function(error, hash) {
      // Store hash in your password DB. 
      if(error) {
        next(error);
      }
      req.body.password = hash;
      console.log('ecryptttt111')
      next();
    });
    // console.log('ecryptttt222')
    // next();
  },
  decrypt: function(req, res, next) {
    console.log('hollllaa');
    next();
  }
};


module.exports = Crypt;
// function(req, res, next) {
//   console.log('hellloww');
//   next();
// };