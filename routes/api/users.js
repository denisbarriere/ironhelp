var express = require('express');
var router  = express.Router();
var auth    = require('../../helpers/auth');
const User = require('../../models/user');

router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return res.status(500);
    res.status(200).json(users);
  });
});

router.get('/:id', function(req, res, next) {
  User.findOne({_id : req.params.id}, (err, user) => {
    if (err) return res.status(500);
    res.status(200).json(user);
  });
});


module.exports = router;
