const request		= require("request");

// get rid of console.log and use callback
// parameter in getWeather??


var getWeather = (lat,lng,callback) => {
	request ({
		url:`https://api.darksky.net/forecast/85113e06189b91279bda1ee10567b43e/${lat},${lng}`,
		json: true
	}, (err, res, body) => {
			if (err) {
				callback("Unable to connect to Forcast.io Server");
			} else if ( !err && res.statusCode === 200) {
				// first argument is undefined becuz no error
				callback ( undefined, {
				summary:   body.currently.summary,
				current:   body.currently.temperature,
				actual:    body.currently.apparentTemperature,
				icon:      body.currently.icon
				});
			} else {
				callback("Unable to fetch Weather")
			}
		})
};

module.exports = {
	getWeather
};
