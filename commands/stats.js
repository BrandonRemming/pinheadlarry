const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const statsEmbed = new Discord.MessageEmbed()
        .setColor([4,141,137])
        .setTitle("Bot Statistics")
        .setDescription(`Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nUptime: ${duration}\nUsers: ${client.users.cache.size.toLocaleString()}\nServers: ${client.guilds.cache.size.toLocaleString()}\nChannels: ${client.channels.cache.size.toLocaleString()}\nDiscord.js: v${version}\nNode.js: ${process.version}`);
    message.channel.send({embed: statsEmbed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["statistics"],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscellaneous",
    description: "Gives some useful bot statistics.",
    usage: "stats"
};
