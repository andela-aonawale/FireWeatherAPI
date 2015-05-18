module.exports = function(){
	return {
		development: {
			firebaseUrl: "https://fireweather.firebaseio.com/",
			dailyCronTime: "*/5 * * * * *",
			fiveDaysCronTime: "*/7 * * * * *"
		},
		test: {

		},
		production: {
			firebaseUrl: "https://fireweather.firebaseio.com/",
			dailyCronTime: "00 */5 * * * *",
			fiveDaysCronTime: "00 */7 * * * *"
		},
		port: process.env.PORT || 8888
	}
}