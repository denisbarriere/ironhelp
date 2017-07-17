const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironhelp');
const Tool = require('../models/tool');

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

  docs.forEach((tool) => {
    console.log(tool.name)
  });
  mongoose.connection.close();
});