const environment = process.env.NODE_ENV
	? process.env.NODE_ENV.trim()
	: "development";

if (environment !== "production") {
	const dotenv = require("dotenv");
	dotenv.config();
}

module.exports = {
	port: process.env.PORT,
	key: process.env.KEY,
	database: {
		user: process.env.DATABASE_USER,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		name: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD,
		connectionString: process.env.DATABASE_STRING
	}
};
