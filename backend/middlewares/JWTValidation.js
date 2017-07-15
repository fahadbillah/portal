var fs = require('fs');
var secretKey = fs.readFileSync('private.key');  // get private key
var jwt = require('jsonwebtoken');
var refreshToken = require('../models/refreshToken');

var checkRefreshToken = function(rToken) {
  console.log(rToken);
  return refreshToken.findOne({"refresh_token": rToken}).exec();
};

var validate = function(token) {
  return new Promise(function (resolve, reject) {


    // invalid token - synchronous
    try {
      // console.log(token);
      var decoded = jwt.verify(token, secretKey);
      resolve({'validated': true});
      // return true;
      console.log(decoded);
    } catch(err) {
      console.log(err);
      var decoded = jwt.decode(token);
      // console.log(decoded.refresh_token);
      
      if (err.name === 'TokenExpiredError') {
        var checkIfRefreshTokenAvailable = function(rToken){
          return new Promise(
            function (resolve, reject) {
              checkRefreshToken(rToken)
              .then(function(data) {
                console.log(1);
                // console.log(data);
                if (data) {
                  resolve({'validated': false, 'refreshable': true});
                } else {
                  resolve({'validated': false, 'refreshable': false});
                }
              }, function(err) {
                console.log(2);
                reject({'validated': false, 'refreshable': false, 'error': err});
              });
            }
          );
        };

        checkIfRefreshTokenAvailable(decoded.refresh_token)
        .then(function(data) {
          console.log(3);
          console.log(data);
          console.log('refresh token promise works', data);
          // return true;
          reject(data);
        }, function(err) {
          console.log(err);
          console.log(4);
          console.log(data);
          console.log('refresh token promise does not work', data);
          // return false;
          reject(err); // reject
        });

      } else {
        // resolve(false);
      }
    }
  });
};


var JWTValidation = function (req, res, next) {
  console.log('hello from JWTValidation');

  var token;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];

    if (token !== 'null') {
      validate(token)
      .then(function(data) {
        console.log('from validate success ', data);
        next();
      }, function(err) {
        console.log('from validate error ', err);
        if (!err.validated && err.refreshable) {
          try{
            console.log('dddd');
            var decoded = jwt.decode(token);

            console.log("decoded", decoded.refresh_token);
            var refreshedJWTToken = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 60,
              refresh_token: decoded.refresh_token
            }, secretKey);
            res.setHeader('refreshedJWTToken', refreshedJWTToken);
            next();
          } catch(err) {
            console.log('errro happened')
            res.status(401).json({
              success: false,
              message: err
            });
          }
        } else if (!err.validated && !err.refreshable) {
          console.log('from validate error ', err);
          res.status(401).json({
            success: false,
            message: err
          });
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Authorization token not available.'
      });
    }
  }else{
    res.status(401).json({
      success: false,
      message: 'Authorization headers not available.'
    });
  }
};


module.exports = JWTValidation;