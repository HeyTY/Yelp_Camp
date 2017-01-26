var mongoose 		= require("mongoose");
var Campground 		= require("./models/campground");
var Comment         = require("./models/comment");

var data = [
		{name: "Jenny Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg", description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "MountainView High", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg", description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Mount Desert", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg", description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Beer Lake", image: "https://farm4.staticflickr.com/3930/15467715681_f7f583df8b.jpg", description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Raining Caller", image: "https://farm5.staticflickr.com/4044/4455053417_1f5fac5631.jpg", description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Desert Lizard ", image: "https://farm2.staticflickr.com/1330/862780835_7131bbfac1.jpg" , description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Rusty Rule Lake", image: "https://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg" , description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Apex Mountain", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg" , description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."},
		{name: "Fujimoto Hills", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg" , description:"Tumblr readymade hammock, typewriter pour-over microdosing DIY fap succulents green juice paleo seitan bushwick echo park man braid. Bitters chicharrones edison bulb tofu wayfarers you probably haven't heard of them. Vaporware chicharrones taxidermy poke intelligentsia activated charcoal. Prism fixie ugh, polaroid beard meh cray celiac chia heirloom tumblr migas. Jean shorts yr humblebrag, wayfarers cred hashtag four loko. Microdosing lumbersexual asymmetrical hoodie bespoke, you probably haven't heard of them thundercats. +1 distillery austin letterpress, iceland ethical unicorn jianbing green juice."}
]

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		// if(err) {
		// console.log(err);
		// }
		// console.log("removed campgrounds!");
		// // Add a few campgrounds
		// data.forEach(function(seed){
		// 	Campground.create(seed, function(err, campground){
		// 		if (err){
		// 			console.log(err);
		// 		} else {
		// 			console.log("Added a campground!");
		// 			// create a comment
		// 			Comment.create(
		// 			{	
		// 				text:"This place is awesome, but not all inclusive =[",
		// 				author:"Homer Simpson"
		// 			}, function(err, comment){
		// 				if(err){
		// 					console.log(err)
		// 				} else {
		// 				campground.comments.push(comment);
		// 				campground.save();
		// 				console.log("Created new comment");
		// 				}
		// 			});
		// 		}
		// 	})
		// });
	});
}

module.exports = seedDB;
