var express = require('express');
var router  = express.Router();
const User = require('../../models/user');
const Post = require('../../models/post');

router.get('/users', function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return res.status(500);
    res.status(200).json(users);
  });
});

router.get('/users/:id', function(req, res, next) {
  User.findOne({_id : req.params.id}, (err, user) => {
    if (err) return res.status(500);
    res.status(200).json(user);
  });
});

router.get('/posts', function(req, res, next) {
  Post.find({})
    .populate('user')
    .populate('category')
    .populate('tool')
    .exec( (err, posts) => {
        if (err) return res.status(500);
        const payload = {
          posts,
          loggedIn : req.user
        }
        res.status(200).json(payload);
    });
});

// get posts filtered by tool
router.get('/posts/tool/:tool_id', function(req, res, next) {
  Post.find({ tool: req.params.tool_id})
    .populate('user')
    .populate('category')
    .populate('tool')
    .exec( (err, posts) => {
        if (err) return res.status(500);
        const payload = {
          posts,
          loggedIn : req.user
        }
        res.status(200).json(payload);
    });
});

// get posts limited to current user
router.get('/posts/user', function(req, res, next) {
  Post.find({ user : req.user._id})
    .populate('user')
    .populate('category')
    .populate('tool')
    .exec( (err, posts) => {
        if (err) return res.status(500);
        const payload = {
          posts,
          loggedIn : req.user
        }
        res.status(200).json(payload);
    });
});



module.exports = router;
