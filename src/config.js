const environment = process.env.NODE_ENV.trim();

if (environment === "development") {
	const dotenv = require("dotenv");
	dotenv.config();
}

module.exports = {
	port: process.env.PORT,
	database: {
		user: process.env.DATABASE_USER,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		name: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD
	}
};
