const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const Tool = require('../models/tool');
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  Tool.find((err, tools) => {
    Post.find((err, posts) => {
    res.render('home', { user: JSON.stringify(req.user), tools, posts });
  })
  })
});


/* GET Posts page, listing tools: Links from the homepage */
router.get('/posts/tool/:tool_id', (req, res, next) => {
  Post.find({tool:req.params.tool_id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
      res.render('posts', { posts, user: req.user });
    });
});



// TODO: refactor to combine with similar tool and docs
router.get('/gotcha/:tool_id', (req, res, next) => {
    Category.findOne({name:'Gotcha'}, (err, category) => {
      if (err) return next(err);
      res.redirect(`/posts/category/${category._id}/tool/${req.params.tool_id}`)
    });
});

router.get('/awesome/:tool_id', (req, res, next) => {
    Category.findOne({name:'Awesome'}, (err, category) => {
      if (err) return next(err);
      res.redirect(`/posts/category/${category._id}/tool/${req.params.tool_id}`)
    });
});

router.get('/doc/:tool_id', (req, res, next) => {
    Category.findOne({name:'Doc'}, (err, category) => {
      if (err) return next(err);
      res.redirect(`/posts/category/${category._id}/tool/${req.params.tool_id}`)
    });
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
router.get('/post/:id', 
  auth.checkLoggedIn('Access Denied. You must login to access this content', '/login'), 
  function(req, res, next) {
  
  // Retrieve the whole list of tools from the db
  Tool.find({}, function (err, tools) {
    if (err) {
      return next(err);
    }

    // Retrieve the tool selected by the user
    const selectedTool = tools.find( function(tool) {
      return tool._id == req.params.id;
    });

    // Retrieve all the categories from the db
    Category.find({}, (err, categories) => {
      if (err) {
        return next(err);
      } 
      
      // Render the new post form
      res.render('post/new', {tools, categories, selectedTool});
    });
  });

});


router.get('/profile/posts/:user_id', (req, res, next) => {
  Post.find({user:req.params.user_id})
    .populate('user')
    .populate('tool')
    .populate('category')
    .exec((err, posts) => {
      if (err) return next(err);
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
      res.render('posts', { posts, user: req.user });
    });
});

router.get('/posts/category/:category_id/tool/:tool_id', (req, res, next) => {
  // Post.find({tool:req.params.tool_id, category: req.params.category_id})
  //   .populate('user')
  //   .populate('tool')
  //   .populate('category')
  //   .exec((err, posts) => {
  //     if (err) return next(err);
      res.render('posts', { posts, user: req.user });
  //   });
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


router.get('/posts/new', (req, res, next) => {
  res.render('admin/user/new');
});

module.exports = router;
