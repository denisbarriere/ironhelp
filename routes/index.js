const express = require('express');
const router  = express.Router();
const auth    = require('../helpers/auth');
const Tool    = require('../models/tool');
const Post    = require('../models/post');
const Category    = require('../models/category');


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

router.get('/gotcha/:id', (req, res, next) => {
  Tool.findOne({'_id': req.params.id}, (err, tool) => {
    if (err) return next(err);
    res.render('gotcha', {tool});
  })
  
});

router.get('/awesome/:id', (req, res, next) => {
  Tool.findOne({'_id': req.params.id}, (err, tool) => {
    if (err) return next(err);
    res.render('awesome', {tool});
  })
  
});

router.get('/doc/:id', (req, res, next) => {
  Tool.findOne({'_id': req.params.id}, (err, tool) => {
    if (err) return next(err);
    res.render('doc', {tool});
  })
  
});

// TODO unclear route: this is for a route with a tool with given ID
router.get('/post/:id', (req, res, next) => {
  Tool.findOne({'_id': req.params.id}, (err, tool) => {
    if (err) return next(err);
    Category.find({}, (err, categories => {
      if (err) return next(err);
      console.log('user', res.locals.currentUser);
      res.render('post', {tool, categories});
    }));
    
  })
  
});

router.get('/posts/', (req, res, next) => {
  Post.find({})
  .populate('user')
  .exec( (err, posts) => {
    if (err) return next(err);
    res.render('posts', { posts });
  });
});

router.post('/posts', (req, res, next) => {

  const obj = {
    title: req.body.title,
    user: req.user._id,
    category: 'Gotcha',
    summary: req.body.summary,
    content: req.body.content

  };

  Post.create(obj, (err, data) => {
    if (err) return next(err);
    res.redirect('/home');
  });
});

module.exports = router;
