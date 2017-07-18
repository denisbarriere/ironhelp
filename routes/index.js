const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const Tool = require('../models/tool');
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/login'), function (req, res, next) {
  res.render('secret', { user: JSON.stringify(req.user) });
});


router.get('/home', auth.checkLoggedIn('You must be login', '/login'), function (req, res, next) {
  Tool.find((err, tools) => {
    res.render('home', { user: JSON.stringify(req.user), tools });
  })
});


router.get('/gotcha/:id', (req, res, next) => {
  Tool.findOne({ '_id': req.params.id }, (err, tool) => {
    if (err) return next(err);
    res.render('gotcha', { tool });
  })
  // res.redirect('/posts/')

});

router.get('/awesome/:id', (req, res, next) => {
  Tool.findOne({ '_id': req.params.id }, (err, tool) => {
    if (err) return next(err);
    res.render('awesome', { tool });
  })

});

router.get('/doc/:id', (req, res, next) => {
  Tool.findOne({ '_id': req.params.id }, (err, tool) => {
    if (err) return next(err);
    res.render('doc', { tool });
  })

});

// TODO unclear route: this is for a route with a tool with given ID
router.get('/post/:id', (req, res, next) => {

  Tool.find({}, (err, tools) => {
    if (err) return next(err);
    Category.find({}, (err, categories) => {
      if (err) return next(err);
      
      const selectedTool = tools.filter( tool => tool._id === req.params.id)[0];

      res.render('post', {tools, categories, selectedTool});
    });

  })

});

// TODO change to be admin specific route
router.get('/posts/', (req, res, next) => {
  Post.find({})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.locals.maybeHiddenClass = 'hidden';
      res.locals.toggle = () => res.locals.maybeHiddenClass === 'hidden' ? '' : 'hidden';
      res.render('posts', { posts });
    });
});

router.get('/profile/posts/:id', (req, res, next) => {
  Post.find({user:req.params.id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.locals.maybeHiddenClass = 'hidden';
      res.locals.toggle = () => res.locals.maybeHiddenClass === 'hidden' ? '' : 'hidden';
      res.render('posts', { posts });
    });
});

router.get('/posts/category/:category_id', (req, res, next) => {
  Post.find({user: req.user._id, category:req.params.category_id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.locals.maybeHiddenClass = 'hidden';
      res.locals.toggle = () => res.locals.maybeHiddenClass === 'hidden' ? '' : 'hidden';
      res.render('posts', { posts });
    });
});

router.get('/posts/tool/:tool_id', (req, res, next) => {
  Post.find({tool:req.params.tool_id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.locals.maybeHiddenClass = 'hidden';
      res.locals.toggle = () => res.locals.maybeHiddenClass === 'hidden' ? '' : 'hidden';
      res.render('posts', { posts });
    });
});

router.get('/posts/category/:category_id/tool/:tool_id', (req, res, next) => {
  Post.find({user: req.user._id, tool:req.params.tool_id, category: req.params.category_id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.locals.maybeHiddenClass = 'hidden';
      res.locals.toggle = () => res.locals.maybeHiddenClass === 'hidden' ? '' : 'hidden';
      res.render('posts', { posts });
    });
});

router.post('/posts', (req, res, next) => {

  const obj = {
    title: req.body.title,
    user: req.user._id,
    category: req.body.category,
    tool: req.body.tool,
    summary: req.body.summary,
    content: req.body.content

  };

  Post.create(obj, (err, data) => {
    if (err) return next(err);
    console.log('got there')
    res.redirect('/home');
  });
});

module.exports = router;
