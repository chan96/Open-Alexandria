var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();
app.get('*', function(req, res, next) {
  if (req.get('x-forwarded-proto') != "https") {
    res.set('x-forwarded-proto', 'https');
    res.redirect('https://' + req.get('host') + req.url);
  } else {
    next();     
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var testing = path.normalize(path.join(__dirname, '../../front_end/ui'));
console.log(testing);
app.use(express.static(testing));
app.use('/documents', express.static("/uploads"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods: GET, POST");
  res.header("Access-Control-Allow-Headers: Content-Type, *");
  res.header("Access-Control-Allow-Origin", "http://openalexandria.us.to");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/', routes);
app.set('json spaces', 2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
