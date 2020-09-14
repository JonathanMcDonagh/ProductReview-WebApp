const Product = require("../models/product");
const Comment = require("../models/comment");
// all the middleware goes here
const middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next) {
	// is user logged in 
	if(req.isAuthenticated()){
		Product.findById(req.params.id, function(err, foundProduct){
			if(err){
				console.log(err)
				res.redirect("back");
			} else {
				// does the user own the post 
				if(foundProduct.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back")
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// is user logged in 
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log(err)
				res.redirect("back");
			} else {
				// does the user own the comment 
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back")
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = middlewareObj;