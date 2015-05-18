var express = require("express");
var	Firebase = require("firebase");
var CronJob = require ("cron").CronJob;
var request = require("request");
var async = require("async");
var config = require("./config/config")();
var rootRef = new Firebase("https://fireweather.firebaseio.com/");

var app = express();
var cities = ["lagos", "calabar", "oyo", "ogun"];

var getDailyForcast = new CronJob({
	cronTime: "*/5 * * * * *",
	onTick: function(){
		setForcastValue(cities, "daily");
	},
	start: false
});

var get5DaysForcast = new CronJob({
	cronTime: "*/7 * * * * *",
	onTick: function(){
		setForcastValue(cities, "5days");
	},
	start: false
});

var setForcastValue = function(cities, typeOfForcast) {
	cities.forEach(function(city) {
		var url, ref;
		if(typeOfForcast === "daily"){
			url = "http://api.openweathermap.org/data/2.5/weather?q=" +city+ ",ng&units=metric";
			ref = rootRef.child("cities/" +city+ "/dailyWeather");
		} else {
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +city+ ",ng&units=metric&cnt=5";
			ref = rootRef.child("cities/" +city+ "/5DaysForecast");
		}
		request(url, function(err, res, body){
			console.log(body);
			ref.set(JSON.parse(body));
		});
	})
};

app.listen(config.port, function() {
	async.series([getDailyForcast.start(), get5DaysForcast.start()]);
	console.log('Express app listening on port: ' +config.port);
});