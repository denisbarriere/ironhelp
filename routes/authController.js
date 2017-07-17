const express  = require('express');
const bcrypt   = require('bcrypt');
const User     = require('../models/user');
const passport = require('../helpers/passport');

const router     = express.Router();
const bcryptSalt = 10;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { 'message': req.flash('error') });
});

router.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  if (email === '' || password === '') {
  	req.flash('error', 'Indicate email and password' );
    res.render('auth/signup', { 'message': req.flash('error') });
    return;
  }

  User.findOne({ email }, 'email', (err, user) => {
    if (user !== null) {
    	req.flash('error', 'This email address already exists' );
      res.render('auth/signup', { message: req.flash('error') });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'This email address already exists' );
        res.render('auth/signup', { message: req.flash('error') });
      } else {
        passport.authenticate('local')(req, res, function () {
           res.redirect('/home');
        });
      }
    });
  });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { 'message': req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties 
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');
  
  
});

module.exports = router;
