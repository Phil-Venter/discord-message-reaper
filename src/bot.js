const { Client, Intents } = require('discord.js');
const config = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.config = config;

const files = require('./files.js');

const handlerFiles = files('./src/handlers');
const databaseFiles = files('./src/database');
const eventFiles = files('./src/events');
const buttonFiles = files('./src/buttons');
const commandFiles = files('./src/commands');
const selectFiles = files('./src/select');

(async () => {
	for (file of handlerFiles) {
		require(file)(client);
	}

	client.handleDatabase(databaseFiles);
	client.handleEvents(eventFiles);
	client.handleButtons(buttonFiles);
	client.handleCommands(commandFiles);
	client.handleSelects(selectFiles);

	client.login(config.token);
})();