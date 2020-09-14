const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const middleware = require("../middleware");

// Index Route
router.get("/", function(req, res){	
	Product.find({},function(err, allProducts){
		if(err){
			console.log(err)
			console.log("Something went wrong");
		} else {
			res.render("products/index", {products: allProducts});
		}
	});
});

// Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
	// Get data from form 
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const producturl = req.body.producturl;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	
	const newProduct = {name: name, image: image, description: desc, producturl: producturl, author: author}
	Product.create(newProduct, function(err, newlyCreatedProduct){
		if(err) {
			console.log(err)
			console.log("Something Went Wrong!")
		} else {
			console.log("Added new product");
			console.log(newlyCreatedProduct);
			// Redirect back to products page
			res.redirect("/products");
		}
	});
});

// Form Route
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("products/new.ejs");
});

// Get product based on ID // SHOW
router.get("/:id", function(req, res){
	// Find by id
	Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
		if(err) {
			console.log(err)
		} else {
			console.log(foundProduct);
			res.render("products/show", {product: foundProduct});
		}
	});
});

// EDIT Product
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res){
	Product.findById(req.params.id, function(err, foundProduct){
		console.log(foundProduct);
		res.render("products/edit", {product: foundProduct});
	});
});

// UPDATE Product
router.put("/:id", middleware.checkProductOwnership, function(req, res){
	Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
		if(err){
			console.log(err);
			res.redirect("/products");
		} else {
			res.redirect("/products/" + req.params.id);
		}
	});
});


// Destory Product Route
router.delete("/:id", middleware.checkProductOwnership, function(req, res){
	Product.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/products");
		} else {
			res.redirect("/products");
		}
	});
});
	
module.exports = router;

	
