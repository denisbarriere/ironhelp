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
  Tool.find( (err, tools) => {
    res.render('home', { user: JSON.stringify(req.user), tools });
  })
});



router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
	// console.log(req.user);
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
