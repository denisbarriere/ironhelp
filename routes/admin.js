const express = require('express');
const auth = require('../helpers/auth');
const User = require('../models/user');
const userHelper = require('../helpers/user');
const router  = express.Router();


/**
 * ADMIN LANDING PAGE
**/
router.get('/',
  auth.checkLoggedIn('You must be login', '/login'),
  auth.checkCredentials('ADMIN'),
  function(req, res, next) {
    res.render('admin/index', { user: req.user });
});


/**
 * LIST USERS
**/
router.get('/users', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  function(req, res, next) {
    
    // Search ALL users
    User.find({}, function (err, users) {
      if (err) {
        next(err);
      } else {
        res.render('admin/user/list', { users } );
      }
    })
});


/**
 * ADD NEW USER
**/
router.get('/user/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  function (req, res, next) {
    
    // Display the new user view
    res.render('admin/user/new');
});

// On new user form submit
router.post('/users',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.newUser
);


/**
 * SHOW USER DATA
**/
router.get('/user/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.showUser
);


/**
 * EDIT USER DATA
**/
router.get('/user/:id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),  
  userHelper.showEditUserPage
);

// On edit user form submit
router.post('/user/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.editUser
);


/**
 * DELETE USER
**/
router.post('/user/:id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.deleteUser  
);

module.exports = router;