const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


// Root Route
router.get("/", function(req, res){
	res.render("landing")
});

// Register Form Route
router.get("/register", function(req, res){
	res.render("register");
});

// Sign Up Route
router.post("/register", function(req, res){
	req.body.username
	req.body.password
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err)
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/products");
		});
	});
});

// Login Form Route
router.get("/login", function(req, res){
	res.render("login");
});

// Logins user
router.post("/login", passport.authenticate("local", {
	successRedirect: "/products",
	failureRedirect: "/login"
}), function(req, res){
});

// Logout Routes
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;