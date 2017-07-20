const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth');
const Tool = require('../models/tool');
const Post = require('../models/post');
const postHelper = require('../helpers/post');


/* GET home page. */
router.get('/', (req, res, next) => {
  Tool.find((err, tools) => {
    Post.find((err, posts) => {
    res.render('home', { user: JSON.stringify(req.user), tools, posts });
  })
  })
});

/* non logged in user posts list */
router.get('/posts/tool/:tool_id', (req, res, next) => { 
  postHelper.showPosts(false, req, res, next);
}); 

// router.post('/posts', (req, res, next) => {

//   const obj = {
//     title: req.body.title,
//     user: req.user._id,
//     category: req.body.category,
//     tool: req.body.tool,
//     summary: req.body.summary,
//     content: req.body.content

//   };

//   Post.create(obj, (err, data) => {
//     if (err) return next(err);
//     console.log('got there')
//     res.redirect('/home');
//   });
// });


module.exports = router;
