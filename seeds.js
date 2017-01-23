var monggose 		= require("mongoose");
var Campground 		= require("./models/campground");
var Comment         = require("./models/comment");

var data = [
		{name: "Jenny Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg", description:"Blah blah blah"},
		{name: "MountainView High", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg", description:"Blah blah blah"},
		{name: "Mount Desert", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg", description:"Blah blah blah"},
		{name: "Beer Lake", image: "https://farm4.staticflickr.com/3930/15467715681_f7f583df8b.jpg", description:"Blah blah blah"},
		{name: "Raining Caller", image: "https://farm5.staticflickr.com/4044/4455053417_1f5fac5631.jpg", description:"Blah blah blah"},
]

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err) {
		console.log(err);
		}
		console.log("removed campgrounds!");
		// Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if (err){
					console.log(err);
				} else {
					console.log("Added a campground!");
					// create a comment
					Comment.create(
					{	
						text:"This place is awesome, but not all inclusive =[",
						author:"Homer Simpson"
					}, function(err, comment){
						if(err){
							console.log(err)
						} else {
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");
						}
					});
				}
			})
		});
	});
}

module.exports = seedDB;
