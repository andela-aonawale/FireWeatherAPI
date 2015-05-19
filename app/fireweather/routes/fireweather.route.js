var api = require("./../controllers/fireweather.controller.js");
module.exports = function(router) {
	router.route("/").get(api.startServer);
}