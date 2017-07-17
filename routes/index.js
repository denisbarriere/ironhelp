var express = require('express');
var router  = express.Router();
var auth    = require('../helpers/auth');
var Tool    = require('../models/tool');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('secret', { user: JSON.stringify(req.user) });
});


router.get('/home', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  
  // If the admin is logged in, then redirect to the /admin page
  if ( req.user.role === 'ADMIN' ) {
    res.redirect('/admin');
  } else {
    Tool.find( (err, tools) => {
      res.render('home', { user: JSON.stringify(req.user), tools });
    })
    }
});


router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
