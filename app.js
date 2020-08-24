const express 	 = require("express"), 
	  app 		 = express(),
	  bodyParser = require("body-parser"),
	  mongoose 	 = require("mongoose");

mongoose.connect('mongodb://localhost:27017/productreviews_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
const productSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	producturl: String
});

const Product = mongoose.model("Product", productSchema);

const products = [
		{name: "Product 1", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/NTg4MTg2YTQt/NTg4MTg2YTQt-ZGI5NWU3ZmMt-w379._SY304_CB409095718_.jpg"},
		{name: "Product 2", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/ZjU0YzQ0Y2It/ZjU0YzQ0Y2It-NTAwNDA3Y2It-w372._SY232_CB428737032_.jpg"},
		{name: "Product 3", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/merch/2020/campaign/91874378/uk-v3-gateway-dashboard-card-758x608._SY608_CB429036539_.jpg"}
];

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/products", function(req, res){	
	Product.find({},function(err, allProducts){
		if(err){
			console.log(err)
			console.log("Something went wrong");
		} else {
			res.render("index", {products: allProducts});
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
	res.render("new.ejs");
});

// Get product based on ID
app.get("/products/:id", function(req, res){
	// Find by id
	Product.findById(req.params.id, function(err, foundProduct){
		if(err) {
			console.log(err)
		} else {
			res.render("show", {product: foundProduct});
		}
	});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has started");
});
