let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let products = [
		{name: "Product 1", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/NTg4MTg2YTQt/NTg4MTg2YTQt-ZGI5NWU3ZmMt-w379._SY304_CB409095718_.jpg"},
		{name: "Product 2", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/ZjU0YzQ0Y2It/ZjU0YzQ0Y2It-NTAwNDA3Y2It-w372._SY232_CB428737032_.jpg"},
		{name: "Product 3", image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/merch/2020/campaign/91874378/uk-v3-gateway-dashboard-card-758x608._SY608_CB429036539_.jpg"}
];

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/products", function(req, res){	
	res.render("products", {products: products});
});

app.post("/products", function(req, res){
	// Get data from form 
	let name = req.body.name;
	let image = req.body.image;
	
	let newProduct = {name: name, image: image}
	products.push(newProduct);
	
	res.redirect("/products");
});

app.get("/products/new", function(req, res){
	res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has started");
})
