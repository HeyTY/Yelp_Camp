var express = require("express");
var app = express();


app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Jenny Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
		{name: "MountainView High", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
		{name: "Mount Desert", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
	]
	res.render("campgrounds", {campgrounds: campgrounds});
});




app.listen(3000, function(){
	console.log("Server Deployed!");
});