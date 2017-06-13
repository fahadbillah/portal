var fs = require('fs');
var cert = fs.readFileSync('private.key');  // get private key
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var expressJWT = require('express-jwt')
 
/*=================================================
=            mongo database connection start            =
=================================================*/

var mongoose = require('mongoose');
var url="mongodb://127.0.0.1:27017/MAXPORTAL";
mongoose.connect(url, function(error){
  if(error){
    console.log("error found in connecting to mongodb://localhost:27017/MAXPORTAL");
    console.error(error);
  }else{
    console.log("connected to localhost:27017/MAXPORTAL using mongoose");
  }
});

/*=====  End of mongo database connection end  ======*/

var auth = require('./routes/auth');
var employee = require('./routes/employee');

var app = express();
app.use(cors())
app.use(expressJWT({ secret: cert}).unless({path: ['/auth/login']}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/employee', employee);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
