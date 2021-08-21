const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, interaction) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const statsEmbed = new MessageEmbed()
        .setColor([4,141,137])
        .setTitle("Bot Statistics")
        .setDescription(`Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nUptime: ${duration}\nUsers: ${client.users.cache.size.toLocaleString()}\nServers: ${client.guilds.cache.size.toLocaleString()}\nChannels: ${client.channels.cache.size.toLocaleString()}\nDiscord.js: v${version}\nNode.js: ${process.version}`);
    interaction.reply({ embeds: [statsEmbed] });
};

exports.commandData = {
    name: "stats",
    description: "Shows the bot's stats.",
    options: [],
    defaultPermission: true,
};

exports.guildOnly = false;
