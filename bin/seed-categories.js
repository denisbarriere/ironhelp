const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI); // db name from local .env
mongoose.connect(process.env.MONGODB_ADMIN_PWD); // admin password from local .env
const Category = require('../models/category');

const categories = [
    {
        name: 'Gotcha',
        imageUrl: 'http://bulma.io/images/placeholders/128x128.png',
        description: ''
    },
    {
        name: 'Awesome',
        imageUrl: 'http://bulma.io/images/placeholders/128x128.png',
        description: ''
    },
    {
        name: 'Doc',
        imageUrl: 'http://bulma.io/images/placeholders/128x128.png',
        description: ''
    },
]

Category.create(categories, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((category) => {
    console.log(category.name)
  });
  mongoose.connection.close();
});