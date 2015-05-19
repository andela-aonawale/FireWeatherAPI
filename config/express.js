var express = require("express");
var bodyParser = require('body-parser');
var routes = require("./../app/fireweather/routes");

module.exports = function() {
	var app = express();
	var router = express.Router();

	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use('/api/v1/', router);
	routes(router);

	return app;
}