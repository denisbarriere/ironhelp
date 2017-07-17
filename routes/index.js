const express = require('express');
const router  = express.Router();
const auth    = require('../helpers/auth');
const Tool    = require('../models/tool');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('secret', { user: JSON.stringify(req.user) });
});

 
router.get('/home', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  Tool.find( (err, tools) => {
    res.render('home', { user: JSON.stringify(req.user), tools });
  })
});


router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
