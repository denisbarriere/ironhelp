const bcrypt        = require("bcrypt");
const passport 			= require('passport');
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy    = require('passport-facebook').Strategy;
const User          = require('../models/user');

require("dotenv").config();
const FACEBOOK_CLIENT_ID    = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENTSECRET = process.env.FACEBOOK_CLIENTSECRET;


passport.serializeUser((user, cb)   => { cb(null, user) });
passport.deserializeUser((user, cb) => { cb(null, user) });

passport.use(new LocalStrategy({
		passReqToCallback: true
	}, (req, username, password, next) => {
	  User.findOne({ username }, (err, user) => {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      return next(null, false, { message: "Incorrect username" });
	    }
	    if (!bcrypt.compareSync(password, user.password)) {
	      return next(null, false, { message: "Incorrect password" });
	    }

	    return next(null, user);
	  });
	}));

passport.use(new FbStrategy({
	  clientID: FACEBOOK_CLIENT_ID,
	  clientSecret: FACEBOOK_CLIENTSECRET,
	  callbackURL: "http://localhost:3000/auth/facebook/callback"
	}, (accessToken, refreshToken, profile, done) => {
	  done(null, profile);
	}));

	
module.exports = passport;