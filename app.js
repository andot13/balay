var express          = require('express');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var flash            = require('connect-flash');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var session          = require('express-session');
var expressValidator = require('express-validator');
var mongoose         = require('mongoose');
var multer           = require('multer');
var passport         = require('passport');
var localStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var config           = require('./config');

var app = express();

mongoose.connect(config.database.uri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



// Handle Express Sessions
app.use(session({ 
  secret: 'andypogi', 
  saveUninitialized: true,
  resave: true
}));


require('./config/passport')(app);


// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


//Flash
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/app')));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


app.use(session({secret: 'andypogi', saveUninitialized: true, resave: false }));

// Passport 
require('./config/passport')(app);

var routes           = require('./routes/index');
var users            = require('./routes/users');
var propertiesRouter = require('./routes/properties');
var areas            = require('./routes/areas');
var auth             = require('./routes/auth');
var account             = require('./routes/account');

var apiProperties    = require('./routes/api/properties');
var apiUsers= require('./routes/api/users');

app.use('/', routes); // Public routes
app.use('/api/properties', apiProperties); // Property Routes
app.use('/api/users', apiUsers);
app.use('/users', users);
app.use('/properties', propertiesRouter);
app.use('/areas', areas);
app.use('/auth', auth);
app.use('/account', account);


var User = require('./models/User');


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
