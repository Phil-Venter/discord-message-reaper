const Sequelize = require('sequelize');

module.exports = (client) => {
	client.handleDatabase = async (databaseFiles) => {
		const { database, dialect, host, password, storage, username } = client.config;

		client.sequelize = new Sequelize(database, username, password, { host, dialect, storage });

		client.database = {};

		for (const file of databaseFiles) {
			const database = require(file);

			client.database[database.name] = database.init(client);
		}
	};
};