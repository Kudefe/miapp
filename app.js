var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//passport, mongoose, connect-flash, express-session, express-validator
const passport = require('passport');
const session = require('express-session')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const config = require('./config/database')

//conectar a db
mongoose.connect(config.database)
let db = mongoose.connection

//check coneccion
db.once('open', () =>{
  console.log('conectado a Mongo');
})

//check errores en db
db.on('error', (err) =>{
  console.log(err);
})

//aqui poner models


//routes
var routes = require('./routes/index');
var users = require('./routes/users');
const games = require('./routes/games')
const admin = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
  secret:'Para que es el secreto?',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

//express messages middleware
app.use(require('connect-flash')())
app.use((req, res, next) =>{
  res.locals.messages = require('express-messages')(req, res)
  next()
})

//express validator middleware
app.use(expressValidator({
  errorFormatter: (params, msg, value) => {
    let namespace = params.split('.')
    , root = namespace.shift()
    , formParams = root

    while(namespace.length) {
      formParams += '[' + namespace.shift() + ']'
    }
    return{
      params : formParams,
      msg    : msg,
      value  : value
    }
  }
}))

//passport config
require('./config/passport')(passport)
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', routes);
app.use('/users', users);
app.use('/games', games)
app.use('/admin', admin)

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
