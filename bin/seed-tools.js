const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI); // db name from local .env
mongoose.connect(process.env.MONGODB_ADMIN_PWD); // admin password from local .env
const Tool = require('../models/tool');

// tools
const tools = [
    {
        name: 'express',
        imageUrl: '/images/tools/expressjs-logo.png',
        description: 'A web application framework for Node.js',
        website: 'https://expressjs.com/',
        documentation: 'http://expressjs.com/en/api.html',
        github: 'https://github.com/expressjs/express',
        technology: 'Javascript'
    },
    {
        name: 'mongoDB',
        imageUrl: '/images/tools/mongoDB-logo.png',
        description: 'A free and open-source cross-platform document-oriented database program',
        website: 'https://www.mongodb.com',
        documentation: 'https://docs.mongodb.com',
        github: 'https://github.com/mongodb/mongo',
        technology: 'NoSQL'
    },
    {
        name: 'mongoose',
        imageUrl: '/images/tools/mongoose-logo.png',
        description: 'Elegant mongodb object modeling for node.js',
        website: 'http://mongoosejs.com/',
        documentation: 'http://mongoosejs.com/docs/guide.html',
        github: 'https://github.com/Automattic/mongoose',
        technology: 'Javascript'
    },
    {
        name: 'CSS',
        imageUrl: '/images/tools/css3-logo.png',
        description: 'The cascading style sheet standard on the web',
        website: 'https://www.w3schools.com/css/',
        documentation: '',
        github: '',
        technology: 'CSS'
    },
    {
        name: 'Node.js',
        imageUrl: '/images/tools/node-js-logo.png',
        description: 'An open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side',
        website: 'https://nodejs.org',
        documentation: 'https://nodejs.org/en/docs/',
        github: 'https://github.com/nodejs/node',
        technology: 'Javascript'
    },
    {
        name: 'Javascript',
        imageUrl: '/images/tools/javascript-logo.png',
        description: 'The standard language for manupulating web pages',
        website: 'https://www.w3schools.com/js/',
        documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        github: '',
        technology: 'Javascript'
    },
    {
        name: 'Google Maps',
        imageUrl: '/images/tools/google-maps-logo.png',
        description: 'A web mapping service developed by Google',
        website: 'https://developers.google.com/maps/',
        documentation: 'https://developers.google.com/maps/documentation/',
        github: '',
        technology: 'API'
    },
    {
        name: 'Vue.js',
        imageUrl: '/images/tools/vue.js-logo.png',
        description: '',
        website: 'https://vuejs.org/',
        documentation: 'https://vuejs.org/v2/guide/',
        github: 'https://github.com/vuejs/vue',
        technology: 'Javascript'
    },
    {
        name: 'ES6',
        imageUrl: '/images/tools/es6-logo.png',
        description: 'ECMAScript 6, later renamed to ECMAScript 2015',
        website: '',
        documentation: 'https://es6.io/',
        github: '',
        technology: 'Javascript'
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