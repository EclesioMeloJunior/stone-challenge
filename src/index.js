const express = require("express");
const config = require("./config");
const database = require("./database");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();

const startDatabase = async config => {
	await database.connect(config);
};

const startServer = (app, config) => {
	app.use(bodyParser.json());
	app.use("/api", router(express.Router()));

	app.listen(config.port, () => {
		console.log(`Application started at ${config.port}`);
	});
};

startDatabase(config)
	.then(() => startServer(app, config))
	.catch(() => console.log(`[${new Date()}][APP] app startup FAIL`));
