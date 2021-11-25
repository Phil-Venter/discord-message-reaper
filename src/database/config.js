const Sequelize = require('sequelize');

const name = 'Config';

module.exports = {
	name,
	init: async (client) => {
		const table = client.sequelize.define(name, {
			channelId: {
				type: Sequelize.STRING,
				unique: true,
			},
			time: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});

		table.sync();

		return table;
	}
};
