const express = require('express');
const auth    = require('../helpers/auth');
const userHelper = require('../helpers/user');
const User     = require('../models/user');
const router  = express.Router();


/**
 * /profile 
 * SHOW USER DATA
**/
router.get('/',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'),
  userHelper.showUser
);

/**
 * EDIT USER DATA
**/
router.get('/:id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  userHelper.showEditUserPage
);

// On edit user form submit
router.post('/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  userHelper.editUser
);

module.exports = router;