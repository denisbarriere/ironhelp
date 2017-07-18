const User = require('../models/user');
const bcrypt = require('bcrypt');

// Const used for password encryption
const bcryptSalt = 10;

module.exports = {
  newUser: function(req, res, next) {
    
    // Encrypt password
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    // Retrieve user info
    const userInfo = {
      email: req.body.email,
      username: req.body.username,
      password: hashPass,
      imageUrl: req.body.imageUrl,
      role: req.body.role.toUpperCase(),
    }
  
    // Create the new users in the db
    const newUser = new User(userInfo);
    newUser.save( function (err) {
      if (err) {
        console.log(err);
        next(err);
      } else { // Redirect on success
        res.redirect('/admin/users')
      }
    })

  },
  showUser: function(req, res, next) {
    

    // Retrieve user ID from URL
    let userID = 0;

    // From the URL is there
    if (req.params.id) {
      userID = req.params.id;
    } else {
      // Else get it from the sessions
      userID = res.locals.currentUser.user._id;
    }
    
    // Search for yhe user information based on the ID
    User.findById(userID, function(err, user) {
      if (err) {
        return next(err);
      }
    
      // Show the user information view 
      res.render('user/show', { user, role: req.user.role });
    })

  },
  showEditUserPage: function(req, res, next) {
  
    // Retrieve user ID from URL
    const userID = req.params.id;

    // Search for yhe user information based on the ID
    User.findById(userID, function(err, user) {
      if (err) {
        return next(err);
      }

      // Display the edit user view
      res.render('user/edit', { user, role: req.user.role })
    })

  },
  editUser: function (req, res, next) {
    
    // Retrieve user ID from URL
    const userID = req.params.id;
    
    // Encrypt password
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    // Retrieve user info
    const userUpdate = {
        email: req.body.email,
        username: req.body.username,
        password: hashPass,
        imageUrl: req.body.imageUrl,
        role: req.body.role.toUpperCase(),
    }

    // Update the user data in the db
    User.findByIdAndUpdate(userID, userUpdate, function(err, user) {
      if (err) { 
        return next(err); 
      }    
      // If the data was saved properly, then go back to:
      // the user listing page, if you are an admin editing a user
      if(req.user.role === 'ADMIN') {
        res.redirect('/admin/users');
      // the user profile page, if you are a user editing your profile
      } else {
        res.redirect('/profile');
      }
    })
    
  },
  deleteUser: function(req, res, next) {
  
    // Retrieve user ID from URL
    const userID = req.params.id;

    // Delete the user from the db
    User.findByIdAndRemove(userID, function(err, user) {
      if (err) { 
        return next(err);
      }
      // If the user was properly deleted, then go back to the user listing page
      console.log('user', user);
      res.redirect('/admin/users');
    })

  },
}