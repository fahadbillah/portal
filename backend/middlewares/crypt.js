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
      if(error) {
        next(error);
      }
      req.body.password = hash;
      console.log('ecryptttt111')
      next();
    });
  },
  decrypt: function(req, res, next) {
    console.log('hollllaa');
    next();
  },
  passwordHash: function(password, callback) {
    bcrypt.hash(password, this._saltRound, function(err, hash) {
      if (err) return callback(err);
      this.passwordHash = hash;
      callback(null, hash);
    }.bind(this));
  }
};

module.exports = Crypt;