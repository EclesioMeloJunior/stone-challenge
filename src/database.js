const { Client } = require("pg");

class Database {
	constructor() {
		this.db = null;
	}

	async connect(config) {
		if (this.db === null) {
			const client = new Client({
				user: config.database.user,
				host: config.database.host,
				port: config.database.port,
				database: config.database.name,
				password: config.database.password,
				statement_timeout: 5000
			});

			try {
				await client.connect();
				this.db = client;
				console.log(`[${new Date()}][DB] DATABASE CONNECTED`);
			} catch (exception) {
				console.log(
					`[${new Date()}][DB] problems when try to connect\n[${new Date()}][DB] Exception: ${
						exception.message
					}`
				);

				throw exception;
			}
		}

		return this;
	}
}

module.exports = new Database();
