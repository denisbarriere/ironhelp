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
 *  USERS                     *
 *                            *
 * ****************************/
/**
 * EDIT USER DATA
**/
router.get('/:user_id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  userHelper.showEditUserPage
);

// On edit user form submit
router.post('/:user_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  userHelper.editUser
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
  postHelper.showAllPostsByUserId
);

module.exports = router;