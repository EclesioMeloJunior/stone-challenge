const express = require("express");
const config = require("./config");
const database = require("./database");

const app = express();

const startDatabase = async config => {
	await database.connect(config);
};

const startServer = (app, config) => {
	app.listen(config.port, () => {
		console.log(`Application started at ${config.port}`);
	});
};

startDatabase(config)
	.then(() => startServer(app, config))
	.catch(() => console.log(`[${new Date()}][APP] app startup FAIL`));
