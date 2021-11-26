const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

client.config = require('../config.json');

const files = require('./files.js');

(async () => {
	for (file of files('./src/handlers')) {
		require(file)(client);
	}

	client.handleDatabase(files('./src/database'));
	client.handleEvents(files('./src/events'));
	client.handleButtons(files('./src/buttons'));
	client.handleCommands(files('./src/commands'));
	client.handleSelects(files('./src/select'));

	client.login(client.config.token);
})();