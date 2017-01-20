var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
		{name: "Weeping Morning", image: "https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg"}
	]


app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	//get data from form and ad to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	// redirect back to campgrounds page default is to GET
	res.redirect("/campgrounds");
}); 

app.get("/campgrounds/new", function(req, res){
	res.render("new")
});



app.listen(3000, function(){
	console.log("Server Deployed!");
});