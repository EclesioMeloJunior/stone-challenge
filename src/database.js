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
				password: config.database.password
			});

			await client.connect();
			this.db = client;
		}
	}
}

module.exports = new Database();
