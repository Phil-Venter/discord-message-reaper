module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		let _interaction = null;

		if (interaction.isCommand()) {
			_interaction = client.commands.get(interaction.commandName);
		} else if (interaction.isButton()) {
			_interaction = client.buttons.get(interaction.customId);
		} else if (interaction.isSelectMenu()) {
			_interaction = client.selects.get(interaction.customId);
		}

		if (!_interaction) return;

		try {
			await _interaction.execute(client, interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while running this interaction!', ephemeral: true });
		}
	}
};