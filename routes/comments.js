const express = require("express");
const router = express.Router({mergeParams: true});
const Product = require("../models/product");
const Comment = require("../models/comment");
const middleware = require("../middleware");


// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {product: product});
		}
	})
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
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

// EDIT Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {product_id: req.params.id, comment: foundComment});	
		}
	});
});

// UPDATE Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/products/" + req.params.id);
		}
	});
});

// Destory Product Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/products/" + req.params.id);
		}
	});
});


module.exports = router;