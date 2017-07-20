const express = require('express');
const router  = express.Router();

// Helpers
const auth = require('../helpers/auth');
const modelHelper = require('../helpers/model');
const userHelper = require('../helpers/user');
const postHelper = require('../helpers/post');

// Models
const Tool = require('../models/tool');
const Category = require('../models/category');


/**
 * ADMIN LANDING PAGE
**/
router.get('/',
  auth.checkLoggedIn('You must be login', '/login'),
  auth.checkCredentials('ADMIN'),
  (req, res, next) => {
    res.redirect('/admin/users');
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
  (req, res, next) => { userHelper.showEditUserPage(false, req, res, next) }
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
  (req, res, next) => { postHelper.showPosts(false, req, res, next); }
);


/**
 * ADD NEW POST
**/
router.get('/post/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => { postHelper.showNewPostForm(false, req, res, next); }
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
  postHelper.showPost
);


/**
 * EDIT POST
**/
router.get('/post/:post_id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),  
  postHelper.showEditPostPage
);

// On edit user form submit
router.post('/post/:post_id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  postHelper.editPost
);


/**
 * DELETE POST
**/
router.post('/post/:post_id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  postHelper.deletePost  
);


/******************************
 *                            * 
 *  TOOLS                     *
 *                            *
 * ****************************/
/**
 * LIST TOOLS
**/
router.get('/tools',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showAllDocuments(Tool, req, res, next)
);


/**
 * ADD NEW TOOL
**/
router.get('/tool/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showNewDocumentsForm(Tool, req, res, next)
);

// On new document form submit
router.post('/tools',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.newDocument(Tool, req, res, next)
);


/**
 * SHOW TOOL
**/
router.get('/tool/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showDocument(Tool, req, res, next)
);


/**
 * EDIT TOOL
**/
router.get('/tool/:id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showEditDocumentForm(Tool, req, res, next)
);

// On edit user form submit
router.post('/tool/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.editDocument(Tool, req, res, next)
);


/**
 * DELETE TOOL
**/
router.post('/tool/:id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.deleteDocument(Tool, req, res, next)
);


/******************************
 *                            * 
 *  CATEGORIES                *
 *                            *
 * ****************************/
/**
 * LIST CATEGORIES
**/
router.get('/categories',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showAllDocuments(Category, req, res, next)
);

/**
 * ADD NEW CATEGORY
**/
router.get('/category/new', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showNewDocumentsForm(Category, req, res, next)
);

// On new document form submit
router.post('/categories',
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.newDocument(Category, req, res, next)
);


/**
 * SHOW CATEGORY
**/
router.get('/category/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showDocument(Category, req, res, next)
);


/**
 * EDIT CATEGORY
**/
router.get('/category/:id/edit', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.showEditDocumentForm(Category, req, res, next)
);

// On edit user form submit
router.post('/category/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.editDocument(Category, req, res, next)
);

/**
 * DELETE CATEGORY
**/
router.post('/category/:id/delete', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  auth.checkCredentials('ADMIN'),
  (req, res, next) => modelHelper.deleteDocument(Category, req, res, next)
);


module.exports = router;