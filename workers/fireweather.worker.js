var	Firebase = require("firebase");
var CronJob = require ("cron").CronJob;
var request = require("request");
var config = require("./../config/config")();
var rootRef = new Firebase(config.firebaseUrl);

var cities = ["lagos,ng", "abeokuta,ng", "ibadan,ng", "port-harcourt,ng", "calabar,ng"];
var daysOfTheWeek = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"];

var setWeatherForecast = function(cities, typeOfForecast) {
	cities.forEach(function(city) {
		var url, ref;
		if(typeOfForecast === "daily"){
			url = config.dailyWeatherUrl + city;
			ref = rootRef.child("cities/" +city+ "/dailyForcast");
		} else {
			url = config.fiveDaysWeatherUrl + city;
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
						windSpeed: day.speed,
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

module.exports = {
	getDailyForecast: new CronJob({
		cronTime: config[process.env.NODE_ENV].dailyCronTime,
		onTick: function() {
			setWeatherForecast(cities, "daily");
		},
		start: true
	}),

	get5daysForecast: new CronJob({
		cronTime: config[process.env.NODE_ENV].fiveDaysCronTime,
		onTick: function() {
			setWeatherForecast(cities, "5days");
		},
		start: true
	})
}