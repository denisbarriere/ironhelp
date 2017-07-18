const Category = require('../models/category');
const Post = require('../models/post');
const Tool = require('../models/tool');

module.exports = {
  showAllPosts: (req, res, next) => {

    // Retrieve all posts
    Post.find({})
    .populate('user')
    .exec( (err, posts) => {
      if (err) {
        return next(err);
      }
      
      // Display all the posts, based on the user role 
      if (req.user.role === 'ADMIN') {
        res.render('admin/post/list', { posts });
      } else {
        res.render('posts', { posts });
      }
    });
    
  },
  showNewPostForm: (req, res, next) => {
      
    // Retrieve the whole list of tools from the db
    Tool.find({}, (err, tools) => {
      if (err) {
        return next(err);
      }

      let selectedTool = {};

      // If the tool ID is found in the route, then
      if (req.params.id) {
        // Retrieve the tool selected by the user
        selectedTool = tools.find( (tool) => {
          return tool._id == req.params.id;
        });
      } else { // else set the _id as a dummy value
        selectedTool._id = 0;
      }

      // Retrieve all the categories from the db
      Category.find({}, (err, categories) => {
        if (err) {
          return next(err);
        } 
      
        // Render the new post form
        res.render('post/new', {tools, categories, selectedTool});
      });
    });

  },
  newPost: (req, res, next) => {
    
    // Retrieve post info
    const postInfo = {
      user: req.user._id,
      category: req.body.category,
      tool: req.body.tool,
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
    };
  
    // Create the new post in the db
    const newPost = new Post(postInfo);
    newPost.save( (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else { 
        
        // Redirect on success, based on the user
        if (req.user.role === 'ADMIN') {
          res.redirect('/admin/posts');
        } else {
          res.redirect('/posts')
        }
      }
    });

  },
}