var express 		= require("express"),
	app 			= express(),
	bodyParser  	= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	Campground  	= require("./models/campground"),
	Comment     	= require("./models/comment"),
	User			= require("./models/user"),
	seedDB      	= require("./seeds")



mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();



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




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});





// Campground.create( 
// {
// 	name: "Weeping Morning", 
// 	image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg",
// 	description: "This morning the weather was so bad, felt like all the trees were weeping."

// }, function(err, campground){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log("==== NEW CAMPGROUND CREATED ====")
// 		console.log(campground);
// 	}
// });


var campgrounds = [
		{name: "Jenny Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
		{name: "MountainView High", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
		{name: "Mount Desert", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
		{name: "Beer Lake", image: "https://farm4.staticflickr.com/3930/15467715681_f7f583df8b.jpg"},
		{name: "Raining Caller", image: "https://farm5.staticflickr.com/4044/4455053417_1f5fac5631.jpg"},
		{name: "Desert Lizard ", image: "https://farm2.staticflickr.com/1330/862780835_7131bbfac1.jpg"},
		{name: "Rusty Rule Lake", image: "https://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg"},
		{name: "Apex Mountain", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
		{name: "Fujimoto Hills", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
	]


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});	
});

//CREATE - All new campgrounds to DB
app.post("/campgrounds", function(req, res){
	//get data from form and ad to campgrounds array
	var name 			= req.body.name;
	var image 			= req.body.image;
	var description 	= req.body.description
	var newCampground 	= {name: name, image: image, description: description}
	// Create a new campground and save to database
	Campground.create(newCampground, function (err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page default is to GET
			res.redirect("/campgrounds")
		}
	});
}); 

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")
});

// SHOW- shows more info about a campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground id with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});



//=====================================
//		COMMENTS ROUTES
//=====================================

// COMMENT FORM - route to the form 
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


// COMMENT POST ROUTE
app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
	// create new comment
	Comment.create(req.body.comment, function(err, comment){
		if (err) {
			console.log(err);
		} else {
			campground.comments.push(comment);
			campground.save();
			res.redirect("/campgrounds/" + campground._id);
		}
		});
		}
	});
})

//============
// AUTH ROUTES
//============
	// SHOW SIGN UP FORM
app.get("/register", function(req, res){
	res.render("register");
});

	// POST
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//============
// LOGIN ROUTES
//============

	// SHOW LOGIN FORM
app.get("/login", function (req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), 
	 function (req, res){
});

	// Logout 
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}


app.listen(3000, function(){
	console.log("Server Deployed!");
});