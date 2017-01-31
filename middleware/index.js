var Campground 		= require("../models/campground");
var Comment 		= require("../models/comment");



// All middleware goes here
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
	// is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// does user own the campground? Mongoose method
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You are not authorized to access this page");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged to access this page");
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next){
	// is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				res.redirect("back");
			} else {
				// does user own the comment? Mongoose method
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You are not authorized to access this page");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You must be logged in to access this page");
		res.redirect("back");
	}
}


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in first to do that");
	res.redirect("/login");
}


module.exports = middlewareObj




