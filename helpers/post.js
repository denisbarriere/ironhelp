const Category = require('../models/category');
const Post = require('../models/post');
const Tool = require('../models/tool');

module.exports = {

  showPosts: (onProfile, req, res, next) => {
    res.render('posts', {onProfile});
  },
  
  showNewPostForm: (onProfile, req, res, next) => {
      
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
        res.render('post/new', {tools, categories, selectedTool, onProfile});
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
    newPost.save( (err, post) => {
      if (err) {
        console.log(err);
        next(err);
      } else { 
        
        // Redirect on success, based on the user
        if (req.user.role === 'ADMIN') {
          res.redirect('/admin/posts');
        } else {
          // TODO: how about from 'my posts' ???
          res.redirect('/posts/tool/' + post.tool);
        }
      }
    });

  },
  showPost: (req, res, next) => {
    
    // Retrieve post ID from URL
    let postID = req.params.post_id;
      
    // Search for yhe user information based on the ID
    Post.findById({'_id': postID})
      .populate('user')
      .populate('tool')
      .populate('category')
      .exec((err, post) => { 
        if (err) {
          return next(err);
        }
      
      // Show the post details
        res.render('post/show', { post });
    });
      
  },
  showEditPostPage: (req, res, next) => {
    
    // Retrieve post ID from URL
    const postID = req.params.post_id;

    // Search for yhe post details based on the ID
    Post.findById(postID, (err, post) => {
      if (err) {
        return next(err);
      }

      // Retrieve the whole list of tools from the db
      Tool.find({}, (err, tools) => {
        if (err) {
          return next(err);
        }

        // Retrieve all the categories from the db
        Category.find({}, (err, categories) => {
          if (err) {
           return next(err);
          } 
      
          // Render the new post form
          res.render('post/edit', { post, tools, categories });
        });
      });
    });
    
  },
  editPost: (req, res, next) => {
    
    // Retrieve post ID from URL
    const postID = req.params.post_id;

    // Retrieve post info
    const postUpdate = {
      category: req.body.category,
      tool: req.body.tool,
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,  
    };

    // Update the post data in the db
    Post.findByIdAndUpdate(postID, postUpdate, (err, post) => {
      if (err) { 
        return next(err); 
      }    
      // If the data was saved properly, then go back to:
      // the post listing page, if you are an admin editing a post
      if(req.user.role === 'ADMIN') {
        res.redirect('/admin/posts');
      // the profile posts page, if you are a user editing your profile
      } else {
        res.redirect('/profile/' + currentUser.user._id + '/posts');
      }
    });
    
  },
  deletePost: (req, res, next) => {
  
    // Retrieve post ID from URL
    const postID = req.params.post_id;

    // Delete the post from the db
    Post.findByIdAndRemove(postID, (err, post) => {
      if (err) { 
        return next(err);
      }
      // If the post was properly deleted, then go back to the post listing page
      console.log('post', post);
      res.redirect('/admin/posts');
    });

  },
}