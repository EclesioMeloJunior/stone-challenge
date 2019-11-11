const app = require("./src/server");
const config = require("./src/config");
const database = require("./src/database");

const startDatabase = async config => {
	await database.connect(config);
};

startDatabase(config)
	.then(() => {
		app.listen(config.port, () => {
			console.log(`[${new Date()}][APP] STARTED AT ${config.port}`);
		});
	})
	.catch(exception => {
		console.log(
			`[${new Date()}][APP] FAIL TO UP\nException: ${exception.message}`
		);
	});
