const express        = require('express');
const path           = require('path');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session        = require("express-session");
const auth           = require('./helpers/auth');
const flash          = require("connect-flash");
const mongoose       = require("mongoose");

const index          = require('./routes/index');
const authController = require('./routes/authController');
const apiRouter       = require('./routes/api/apiRouter');
const admin          = require('./routes/admin');
const profile        = require('./routes/profile');

require("dotenv").config();

let app = express();

// Connection to DB
mongoose.connect(process.env.MONGODB_URI);

app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.title = 'IronHelp';

// session
app.use(session({
  secret           : "passport-local-strategy",
  resave           : true,
  saveUninitialized: true,
  cookie           : { maxAge: parseInt(process.env.COOKIE_MAX_AGE) }
}));

app.use(flash());
const passport = require('./helpers/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(auth.setCurrentUser);

app.use('/', authController);
app.use('/admin', admin);
app.use('/profile', profile);
app.use('/api', apiRouter);
app.use('/', index);


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
