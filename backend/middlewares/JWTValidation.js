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
      var decoded = jwt.verify(token, secretKey);
      console.log(decoded);
    } catch(err) {
      console.log(err);
      var decoded = jwt.decode(token);
      console.log(decoded.refresh_token);
      
      if (err.name === 'TokenExpiredError') {
        var checkIfRefreshTokenAvailable = function(rToken){
          return new Promise(
            function (resolve, reject) {
              checkRefreshToken(rToken)
              .then(function(data) {
                console.log(1);
                console.log(data);
                if (data) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }, function(err, data) {
                console.log(2);
                console.log(data);
                reject(err); // reject
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
          resolve(data);
        }, function(err, data) {
          console.log(err);
          console.log(4);
          console.log(data);
          console.log('refresh token promise does not work', data);
          // return false;
          reject(err); // reject
        });

      } else {

      }
    }
  });
};


var JWTValidation = function (req, res, next) {
  console.log('hello from JWTValidation');

  var token;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];


    if (!!token) {
      validate(token)
      .then(function(data) {
        console.log('from validate success ', data);

        if (data) {
          console.log(data);
          try{
            console.log('testset');

            var decoded = jwt.decode(token);

            res.JWTtoken = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + 60,
              refresh_token: decoded.refresh_token
            }, cert);
            console.log(res);
            next();
            // res.json({
            //   success: true,
            //   token: token,
            //   datas: employeeData
            // });
          } catch(err) {
            console.log('errro happened')
            res.status(401).json({
              success: false,
              message: err
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: 'Refresh token not available.'
          });
        }
      }, function(err, data) {
        console.log('from validate error ', err);
        res.status(401).json({
          success: false,
          message: err
        });
      })
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
  next();
};


module.exports = JWTValidation;