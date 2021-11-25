const { Collection } = require('discord.js');

module.exports = (client) => {
	client.handleSelects = async (selectFiles) => {
		client.selects = new Collection();

		for (const file of selectFiles) {
			const select = require(file);

			client.selects.set(select.data.name, select);
		}
	};
};