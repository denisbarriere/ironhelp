const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI); // db name from local .env
mongoose.connect(process.env.MONGODB_ADMIN_PWD); // admin password from local .env
const Tool = require('../models/tool');
const User = require('../models/user');
const bcryptSalt = 10;

// tools
const tools = [
    {
        name: 'Express JS',
        imageUrl: '',
        description: ''
    },
    {
        name: 'Chart.js',
        imageUrl: '',
        description: ''
    },
    {
        name: 'Node.js',
        imageUrl: '',
        description: ''
    },
]

Tool.create(tools, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('TOOLS:');
  docs.forEach((tool) => {
    console.log(tool.name)
  });
  mongoose.connection.close();
});


// Admin users
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(process.env.MONGODB_ADMIN_PWD, salt);

const admins = [
    {
        email: 'jb.tellez@gmail.com',
        username: 'jb',
        password: hashPass,
        profileImageUrl: 'https://avatars5.githubusercontent.com/u/364081?v=4&s=400',
        role: 'ADMIN',
    },
    {
        email:'denis.barriere@gmail.com',
        username: 'denis',
        password: hashPass,
        profileImageUrl: 'https://avatars4.githubusercontent.com/u/28688064?v=4&s=400',
        role: 'ADMIN',
    },
]

// Add the admin users to the db
User.create(admins, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('---------------');
  console.log('ADMIN USERS:');
  
  docs.forEach((admin) => {
    console.log(admin.username)
  });
  mongoose.connection.close();
});
