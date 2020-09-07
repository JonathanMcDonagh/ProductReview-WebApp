const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Index Route
router.get("/", function(req, res){	
	Product.find({},function(err, allproducts){
		if(err){
			console.log(err)
			console.log("Something went wrong");
		} else {
			res.render("products/index", {products: allproducts});
		}
	});
});

// Create Route
router.post("/", function(req, res){
	// Get data from form 
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const producturl = req.body.producturl;
	
	const newProduct = {name: name, image: image, description: desc, producturl: producturl}
	Product.create(newProduct, function(err, addedProduct){
		if(err) {
			console.log(err)
			console.log("Something Went Wrong!")
		} else {
			console.log("Added new product");
			console.log(addedProduct);
			// Redirect back to products page
			res.redirect("/products");
		}
	});
});

// Form Route
router.get("/new", function(req, res){
	res.render("products/new.ejs");
});

// Get product based on ID // SHOW
router.get("/:id", function(req, res){
	// Find by id
	Product.findById(req.params.id).populate("comments").exec(function(err, foundproduct){
		if(err) {
			console.log(err)
		} else {
			console.log(foundproduct);
			res.render("products/show", {product: foundproduct});
		}
	});
});

module.exports = router;