var express 		= require("express"),
	app 			= express(),
	bodyParser  	= require("body-parser"),
	mongoose		= require("mongoose"),
	flash			= require("connect-flash"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground  	= require("./models/campground"),
	Comment     	= require("./models/comment"),
	User			= require("./models/user"),
	seedDB      	= require("./seeds")
	
// Requiring routes
var	commentsRoutes		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index")

// mongoose.connect("mongodb://localhost/yelp_camp");

mongoose.connect("mongodb://HeyTY:A1b2c3d4e5@dbh85.mlab.com:27857/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed the Database



// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Password OneTwoThree",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser 	= req.user;
	res.locals.error		= req.flash("error");
	res.locals.success		= req.flash("success");
	next();
});





app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);


app.listen(3000, function(){
	console.log("Server Deployed!");
});