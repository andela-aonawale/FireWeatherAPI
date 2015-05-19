module.exports = function(){
	return {
		firebaseUrl: "https://fireweather.firebaseio.com/",
		dailyWeatherUrl: "http://api.openweathermap.org/data/2.5/weather?units=metric&q=",
		fiveDaysWeatherUrl: "http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=6&q=",
		development: {
			dailyCronTime: "*/7 * * * * *",
			fiveDaysCronTime: "*/12 * * * * *"
		},
		test: {

		},
		production: {
			dailyCronTime: "00 */1 * * * *",
			fiveDaysCronTime: "00 */1 * * * *"
		},
		port: process.env.PORT || 8888
	}
}