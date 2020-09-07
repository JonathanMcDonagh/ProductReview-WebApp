const express = require("express");
const router = express.Router({mergeParams: true});
const Product = require("../models/product");
const Comment = require("../models/comment");


// Comments New
router.get("/new", isLoggedIn, function(req, res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {product: product});
		}
	})
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
	// Lookup product using ID
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
			res.redirect("/products");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					product.comments.push(comment);
					product.save();
					console.log(comment);
					res.redirect("/products/" + product._id);
				}
			});
		}
	});
});

//Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;