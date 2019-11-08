const fs = require("fs");
const path = require("path");
const config = require("../src/config");
const database = require("../src/database");

const MIGRATIONS_REGEX_FILES = /\b.migration.js\b/;

const isMigrationFiles = fileName => {
	return MIGRATIONS_REGEX_FILES.test(fileName);
};

const executeMigrations = async () => {
	const databaseConnection = await database.connect(config);

	const migrationsPath = path.join(process.cwd(), "src", "migrations");
	const migrationsFilesName = fs
		.readdirSync(migrationsPath)
		.filter(isMigrationFiles);

	console.log(`[${new Date()}][MIGRATIONS] STARTING`);

	await migrationsFilesName.forEach(async migrationFileName => {
		try {
			console.log(
				`[${new Date()}][MIGRATIONS] EXECUTING: ${migrationFileName}`
			);

			const migrationFile = path.resolve(migrationsPath, migrationFileName);
			await require(migrationFile)(databaseConnection.db);

			console.log(`[${new Date()}][MIGRATIONS] EXECUTED: ${migrationFileName}`);
		} catch (exception) {
			console.log(
				`[${new Date()}][MIGRATIONS] FAIL: ${migrationFileName}\n[${new Date()}][MIGRATIONS] Exception: ${
					exception.message
				}`
			);

			process.exit();
		}
	});

	console.log(`[${new Date()}][MIGRATIONS] ENDING`);

	databaseConnection.db.end();
	process.exit();
};

executeMigrations();
