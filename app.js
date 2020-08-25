const express 	 = require("express"), 
	  app 		 = express(),
	  bodyParser = require("body-parser"),
	  mongoose 	 = require("mongoose"),
	  Product 	 = require("./models/product"),
	  Comment	 = require("./models/comment"),
	  seedDB 	 = require("./seeds");

seedDB();

mongoose.connect('mongodb://localhost:27017/productreviews_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("landing")
});


// ********************
// PRODUCT ROUTES
// ********************
app.get("/products", function(req, res){	
	Product.find({},function(err, allProducts){
		if(err){
			console.log(err)
			console.log("Something went wrong");
		} else {
			res.render("products/index", {products: allProducts});
		}
	});
});

app.post("/products", function(req, res){
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

app.get("/products/new", function(req, res){
	res.render("products/new.ejs");
});

// Get product based on ID
app.get("/products/:id", function(req, res){
	// Find by id
	Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
		if(err) {
			console.log(err)
		} else {
			res.render("products/show", {product: foundProduct});
		}
	});
});

// ********************
// COMMENT ROUTES
// ********************
app.get("/products/:id/comments/new", function(req, res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {product: product});
		}
	})
});

app.post("/products/:id/comments", function(req, res){
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
					product.comments.push(comment);
					product.save();
					res.redirect("/products/" + product._id);
				}
			});
		}
	});
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has started");
});
