var config = require("./config/config")();
var app = require("./config/express")();
var worker = require("./workers/fireweather.worker.js");

app.listen(config.port, function() {
	worker.getDailyForecast.start();
	worker.get5daysForecast.start();
	console.log('Express app listening on port: ' +config.port);
});