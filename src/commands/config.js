const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('[ADMINISTRATOR ONLY] SET/GET bot config. time = -1 will remove channel.')
		.addStringOption(option => option.setName('channel').setDescription('Channel to watch for.'))
		.addIntegerOption(option => option.setName('time').setDescription('Time in seconds until message should be deleted.')),

	async execute(client, interaction) {
		const channelId = await interaction.options.getString('channel') ?? null;
		const time = await interaction.options.getInteger('time') ?? null;

		let response = null;
		const config = await client.database.Config;

		if (!!time) {
			response = await config.findOne({ where: { channelId: channelId ?? interaction.channelId } });
			if (response) {
				if (time >=0) {
					response = await response.update({ time });
				} else {
					await response.destroy();
					return await interaction.reply({ content: `Message Reaper removed from channel <#${channelId ?? interaction.channelId}>`, ephemeral: true });
				}
			} else {
				response = await config.create({ channelId: channelId ?? interaction.channelId, time });
			}
		} else {
			response = await config.findOne({ where: { channelId: channelId ?? interaction.channelId } });
		}

		if(!response) {
			return await interaction.reply({ content: `Message Reaper not on channel <#${channelId ?? interaction.channelId}>`, ephemeral: true });
		}

		return await interaction.reply({ content: `<#${response.channelId}> set to delete messages every ${response.time}s`, ephemeral: true });
	},
};
