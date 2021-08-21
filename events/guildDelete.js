module.exports = (client, guild) => {
    if (!guild.available) return; // If there is an outage, return.
    client.logger.cmd(`[GUILD LEAVE] ${guild.id} removed the bot.`);

    if (client.settings.has(guild.id)) {
        client.settings.delete(guild.id);
    }
};
