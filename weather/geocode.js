const request		= require("request");


					
var geocodeAddress = (address, callback) => {

	var query = encodeURIComponent(address);
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${query}`,
		json: true
	}, (err, res, body) => {

		if (err) {
			callback("Unable to connect to Google Server");
			} else if (body.status === "ZERO_RESULTS") {
			callback("Unable to find that address, Try again")
		} else if (body.status === "OK") {
			callback(undefined, {
				address: 	body.results[0].formatted_address,
				latitude: 	body.results[0].geometry.location.lat,
				longitude:  body.results[0].geometry.location.lng
			})
		}
	});
};


module.exports = {
	geocodeAddress
};