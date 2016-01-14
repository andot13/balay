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
var config           = require('./config');

var app = express();


//Format date with moment
app.locals.moment = require('moment');

// Multer config
var upload = multer({ dest: 'uploads/' });

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


mongoose.connect(config.database.uri);

// Handle Express Sessions
app.use(session({ 
  secret: 'andypogi', 
  saveUninitialized: true,
  resave: true
}));

// Passport 
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.get('*', function(req, res, next){
  if (!req.user) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  }
  next();
});


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


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var routes           = require('./routes/index');
var users            = require('./routes/users');
var propertiesRouter = require('./routes/properties');
var apiProperties    = require('./routes/api/properties');
var areas            = require('./routes/areas');

app.use('/', routes); // Public routes
app.use('/api/properties', apiProperties); // Property Routes
app.use('/users', users);
app.use('/properties', propertiesRouter);
app.use('/areas', areas);

var User = require('./models/User');



// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new localStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

  // asynchronous
  // User.findOne wont fire unless data is sent back
  process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email': email}, function(err, user) {
      // if there are any errors, return the error
      if (err)
        return done(err);

      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

        // if there is no user with that email
        // create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        // save the user
        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }

    });    

  });

}));


passport.use('local-login', new localStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  User.findOne({ 'local.email' :  email}, function(err, user) {
    // if there are any errors, return the error before anything else
    if (err)
      return done(err);

    // if no user is found, return the message
    if (!user)
      return done(null, false, req.flash('info', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

    // if the user is found but the password is wrong
    if (!user.validPassword(password))
      return done(null, false, req.flash('info', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

    // all is well, return successful user
    return done(null, user);
  });

}));



app.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  next();
});








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
