Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

var request = require('request');

// Getting the ISS's latitude and longitude

request('http://api.open-notify.org/iss-now.json', function(error, response, body) {

    if (!error && response.statusCode === 200) {
        var theResult = JSON.parse(body);

        var issLat = theResult.iss_position.latitude;
        var issLon = theResult.iss_position.longitude;

        // console.log(issLat + ", " + issLon);

        var prompt = require('prompt');

        prompt.get(['location'], function(err, result) {

            // Getting the user's latitude and longitude

            request('https://maps.googleapis.com/maps/api/geocode/json?address=' + result.location, function(err, response, body) {

                if (!error && response.statusCode === 200) {
                    var theResult = JSON.parse(body);

                    var userLat = theResult.results[0].geometry.location.lat;
                    var userLon = theResult.results[0].geometry.location.lng;
                    //console.log(userLat + ", " + userLon);
                }

                var R = 6371000; // metres
                var φ1 = userLat.toRadians();
                var φ2 = issLat.toRadians();
                var Δφ = (issLat - userLat).toRadians();
                var Δλ = (issLon - userLon).toRadians();

                var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                var d = R * c;
                var e = d.toFixed(2);

                console.log("The distance betweeen you and the ISS is " + e/1000 + " kms!");
            });
        });
    }
});