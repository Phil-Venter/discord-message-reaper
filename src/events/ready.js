const { ActivityTypes } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setPresence({ activities: [{ name: 'the waiting game' }], status: 'dnd' });
	}
}