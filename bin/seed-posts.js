const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI); // db name from local .env
const Post = require('../models/post');
const User = require('../models/user');

// posts
const posts = [
    {
        user: "596d42b889c0e72d70b1fa05",
        category: "596d445f5c439ebf0ec5b564",
        tool: "596d42b889c0e72d70b1fa01",
        title: 'foo',
        summary: 'bar',
        content: 'baz'
    },
]

Post.create(posts, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((post) => {
    console.log(post.title)
  });
  mongoose.connection.close();
});