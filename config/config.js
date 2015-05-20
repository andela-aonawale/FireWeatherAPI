module.exports = function(){
	return {
		firebaseUrl: "https://fireweather.firebaseio.com/",
		dailyWeatherUrl: "http://api.openweathermap.org/data/2.5/weather?units=metric&q=",
		fiveDaysWeatherUrl: "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=6&q=",
		development: {
			dailyCronTime: "*/5 * * * * *",
			fiveDaysCronTime: "*/5 * * * * *"
		},
		test: {

		},
		production: {
			dailyCronTime: "00 */5 * * * *",
			fiveDaysCronTime: "00 05 */3 * * *"
		},
		port: process.env.PORT || 8888
	}
}