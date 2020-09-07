const express = require("express");
const router = express.Router({mergeParams: true});
const product = require("../models/product");
const Comment = require("../models/comment");


// Comments New
router.get("/new", isLoggedIn, function(req, res){
	product.findById(req.params.id, function(err, product){
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
	product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
			res.redirect("/products");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					product.comments.push(comment);
					product.save();
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