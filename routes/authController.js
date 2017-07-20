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
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') {
  	req.flash('error', 'Please, enter an email address and password' );
    res.render('auth/signup', { 'message': req.flash('error') });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }
    
    if (existingUser !== null) {
    	req.flash('error', `The email ${emailInput} is already in use.` );
      res.render('auth/signup', { message: req.flash('error') });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      email: emailInput,
      password: hashPass
    };

    const newUser = new User(userSubmission);

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'An account with this email address already exists' );
        res.render('auth/signup', { message: req.flash('error') });
        return;
      }
      
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
        });

    });
  });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { 'message': req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  }), (req, res) => {
    if (req.user.role === 'ADMIN') {
      res.redirect('/admin/users');
    } else {
      res.redirect('/');
    }
  });

router.get('/logout', (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties 
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');
  
  
});

module.exports = router;
