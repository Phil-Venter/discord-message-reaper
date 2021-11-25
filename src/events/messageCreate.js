module.exports = {
	name: 'messageCreate',
	async execute(client, interaction) {
		const config = await client.database.Config;
		const response = await config.findOne({ where: { channelId: interaction.channelId } });

		if (response) {
			setTimeout(() => { interaction.delete() }, response.time * 1000);
		}
	}
};