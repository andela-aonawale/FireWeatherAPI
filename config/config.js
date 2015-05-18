module.exports = function(){
	return {
		development: {
			firebaseUrl: "https://fireweather.firebaseio.com/",
			dailyCronTime: "*/5 * * * * *",
			fiveDaysCronTime: "*/5 * * * * *"
		},
		test: {

		},
		production: {
			firebaseUrl: "https://fireweather.firebaseio.com/",
			dailyCronTime: "00 00 */1 * * *",
			fiveDaysCronTime: "00 00 */8 * * *"
		},
		port: process.env.PORT || 8888
	}
}