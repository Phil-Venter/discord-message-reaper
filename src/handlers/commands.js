const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
	client.handleCommands = async (commandFiles) => {
		const { clientId, guildId, token } = client.config;

		client.commands = new Collection();
		const commandArray = [];

		for (const file of commandFiles) {
			const command = require(file);

			client.commands.set(command.data.name, command);
			commandArray.push(command.data.toJSON());
		}

		const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commandArray },
				);

				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	};
};