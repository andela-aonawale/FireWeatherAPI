var express = require("express");
var	Firebase = require("firebase");
var CronJob = require ("cron").CronJob;
var request = require("request");
var async = require("async");
var config = require("./config/config")();
var rootRef = new Firebase("https://fireweather.firebaseio.com/");

var app = express();
var cities = ["lagos", "calabar", "oyo", "ogun"];

var getWeatherForcast = new CronJob({
	cronTime: "*/5 * * * * *",
	onTick: function() {
		async.waterfall([
	    function(callback){
	      setWeatherForcast(cities, "5days");
	      callback(null);
	    },
	    function(callback){
	      setWeatherForcast(cities, "daily");
	      callback(null);
	    }
		],
		// optional callback
		function(err, results){
		  //
		});
	},
	start: false
});

var setWeatherForcast = function(cities, typeOfForcast) {
	cities.forEach(function(city) {
		var url, ref;
		if(typeOfForcast === "daily"){
			url = "http://api.openweathermap.org/data/2.5/weather?q=" +city+ ",ng&units=metric";
			ref = rootRef.child("cities/" +city+ "/dailyForcast");
		} else {
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +city+ ",ng&units=metric&cnt=5";
			ref = rootRef.child("cities/" +city+ "/5DaysForcast");
		}
		request(url, function(err, res, body){
			console.log(body);
			ref.set(JSON.parse(body));
		});
	})
};

app.listen(config.port, function() {
	getWeatherForcast.start();
	console.log('Express app listening on port: ' +config.port);
});