module.exports = (client) => {
	client.handleEvents = async (eventFiles) => {
		for (const file of eventFiles) {
			const event = require(file);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(client, ...args));
			} else {
				client.on(event.name, (...args) => event.execute(client, ...args));
			}
		}
	};
};