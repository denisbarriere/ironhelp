const express = require('express');
const auth = require('../helpers/auth');
const userHelper = require('../helpers/user');
const postHelper = require('../helpers/post');
const User = require('../models/user');
const Post = require('../models/post');
const router  = express.Router();


/**
 * ADMIN LANDING PAGE
**/
router.get('/',
  auth.checkLoggedIn('You must be login', '/login'),
  auth.checkCredentials('ADMIN'),
  (req, res, next) => {
    res.render('admin/index', { user: req.user });
});


/******************************
 *                            * 
 *  USERS                     *
 *                            *
 * ****************************/
/**
 * LIST USERS
**/
router.get('/users', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.showAllUsers
);


/**
 * ADD NEW USER
**/
router.get('/user/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => {
    
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
router.get('/user/:user_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.showUser
);


/**
 * EDIT USER DATA
**/
router.get('/user/:user_id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),  
  userHelper.showEditUserPage
);

// On edit user form submit
router.post('/user/:user_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.editUser
);


/**
 * DELETE USER
**/
router.post('/user/:user_id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.deleteUser  
);


/******************************
 *                            * 
 *  POSTS                     *
 *                            *
 * ****************************/
/**
 * LIST POSTS
**/
router.get('/posts',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  postHelper.showAllPosts
);


/**
 * ADD NEW POST
**/
router.get('/post/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  postHelper.showNewPostForm
);

// On new user form submit
router.post('/posts',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  postHelper.newPost
);


/**
 * SHOW POST
**/
router.get('/post/:post_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.showUser
);


/**
 * EDIT POST
**/
router.get('/post/:post_id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),  
  userHelper.showEditUserPage
);

// On edit user form submit
router.post('/post/:post_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.editUser
);


/**
 * DELETE POST
**/
router.post('/post/:post_id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  userHelper.deleteUser  
);

module.exports = router;