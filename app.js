const express 	 			= require("express"), 
	  app 		 			= express(),
	  bodyParser 			= require("body-parser"),
	  mongoose 	 			= require("mongoose"),
	  passport   			= require("passport"),
	  LocalStrategy 		= require("passport-local"),
	  methodOverride 		= require("method-override"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  Product 	 			= require("./models/product"),
	  Comment	 			= require("./models/comment"),
	  User 		 			= require("./models/user"),
	  seedDB 	 			= require("./seeds");

const commentRoutes 		= require("./routes/comments"),
	  productRoutes  	= require("./routes/products"),
	  indexRoutes 			= require("./routes/index");

// seedDB();
mongoose.connect('mongodb://localhost:27017/productreviews_db_final', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// ********************
// PASSPORT 
// ********************
app.use(require("express-session")({
	secret: "This is a express session secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server has started");
});
