module.exports = {
	setCurrentUser: function(req, res, next) {
	  if (req.session.passport) {
	    res.locals.currentUser = req.session.passport;
			res.locals.isUserLoggedIn = true;
			
			// if the user is an admin, set a flag to true
			res.locals.isUserAdmin = false;

			if (res.locals.currentUser.user.role === 'ADMIN') { res.locals.isUserAdmin = true; }
	
	  } else {
	  	// delete res.locals.currentUser;
			res.locals.isUserLoggedIn = false;
			res.locals.isUserAdmin = false;
	  }
	  next();
	},

	checkLoggedIn: function(message, route) {
	  return function(req, res, next) {
	    if (req.isAuthenticated()) {
	      return next(); 
	    } else {
	    	req.flash('error', message )
	    	
	      res.redirect(route)
	    }
	  }
	},

	checkCredentials: function(role) {
	  return function(req, res, next) {
	    if (req.user.role === role) {
	      return next(); 
	    } else {
	    	req.flash('error', "you don't have permission" );
	      res.redirect('/login');
	    }
	  }
	},
}