const express = require('express');
const auth    = require('../helpers/auth');
const userHelper = require('../helpers/user');
const postHelper = require('../helpers/post');
// const User     = require('../models/user');
const router  = express.Router();


/**
 * /profile 
 * SHOW USER DATA
**/
router.get('/',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'),
  userHelper.showUser
);


/******************************
 *                            * 
 *  POSTS                     *
 *                            *
 * ****************************/
/**
 * MY POSTS
**/
router.get('/posts/:user_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  (req, res, next) => { postHelper.showPosts(true, req, res, next); }
);

/**
 * ADD NEW POST
**/
router.get('/post/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  (req, res, next) => { postHelper.showNewPostForm(true, req, res, next) }
);

// On new user form submit
router.post('/posts',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  postHelper.newPost
);

/******************************
 *                            * 
 *  USERS                     *
 *                            *
 * ****************************/
/**
 * EDIT USER DATA
**/
router.get('/:user_id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  (req, res, next) => { userHelper.showEditUserPage(true, req, res, next) }

);

// On edit user form submit
router.post('/:user_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  userHelper.editUser
);

module.exports = router;