var express 	= require("express");
var router  	= express.Router();
var passport	= require("passport");
var User 		= require("../models/user");


//============
// ROOT ROUTES
//============
router.get("/", function(req, res){
	res.render("landing");
});


//============
// AUTH ROUTES
//============
	// SHOW SIGN UP FORM
router.get("/register", function(req, res){
	res.render("register");
});

	// POST
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//============
// LOGIN ROUTES
//============

	// SHOW LOGIN FORM
router.get("/login", function (req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), 
	 function (req, res){
});

	// Logout 
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have successfully Logged Out")
	res.redirect("/campgrounds");
});


	// Middleware
function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}

module.exports = router;