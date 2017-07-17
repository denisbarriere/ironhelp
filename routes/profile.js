const express = require('express');
const auth    = require('../helpers/auth');
const User     = require('../models/user');
const router  = express.Router();


// /profile route
router.get('/', auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), function(req, res, next) {
  User.find({}, (err, products) => {
    if (err) {
      next(err);
    } else {
      res.render('profile/index', { products } );
    }
  })
});

module.exports = router;