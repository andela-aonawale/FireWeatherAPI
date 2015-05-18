var express = require("express");
var	Firebase = require("firebase");
var CronJob = require ("cron").CronJob;
var request = require("request");
var config = require("./config/config")();
var rootRef = new Firebase(config[process.env.NODE_ENV].firebaseUrl);

var app = express();
var cities = ["lagos", "abeokuta", "ibadan", "port-harcourt", "calabar"];
var daysOfTheWeek = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];

var getDailyForecast = new CronJob({
	cronTime: config[process.env.NODE_ENV].dailyCronTime,
	onTick: function() {
		setWeatherForecast(cities, "daily");
	},
	start: false
});

var get5daysForecast = new CronJob({
	cronTime: config[process.env.NODE_ENV].fiveDaysCronTime,
	onTick: function() {
		setWeatherForecast(cities, "5days");
	},
	start: false
});

var setWeatherForecast = function(cities, typeOfForecast) {
	cities.forEach(function(city) {
		var url, ref;
		if(typeOfForecast === "daily"){
			url = "http://api.openweathermap.org/data/2.5/weather?q=" +city+ ",ng&units=metric";
			ref = rootRef.child("cities/" +city+ "/dailyForcast");
		} else {
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +city+ ",ng&units=metric&cnt=6";
			ref = rootRef.child("cities/" +city+ "/5DaysForcast");
		}
		request(url, function(error, response, body){
			console.log(body);
			if(typeOfForecast !== "daily" && response.statusCode === 200){
				var days = [], number=0;
				JSON.parse(body).list.forEach(function(day){
					var today = new Date(day.dt * 1000);
					days[number] = {
						day: daysOfTheWeek[today.getDay()],
						humidity: day.humidity,
						speed: day.speed,
						temperature: {
							min: Math.round(day.temp.min),
							max: Math.round(day.temp.max)
						},
						weather: day.weather[0]
					}
					++number;
				});
				ref.set(days);
			} else if(typeOfForecast === "daily" && response.statusCode === 200) {
				ref.set(JSON.parse(body));
			}
		});
	})
};

app.listen(config.port, function() {
	getDailyForecast.start();
	get5daysForecast.start();
	console.log('Express app listening on port: ' +config.port);
});