const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
    let date = new Date(Date.now());
    let utcString = date.toUTCString().slice(0, 25);

    const utcEmbed = new MessageEmbed()
        .setColor([4,141,137])
        .setTitle("Current UTC Time and Date:")
        .setDescription(utcString)
    message.channel.send({ embeds: [utcEmbed] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["utc"],
    permLevel: "User"
};

exports.help = {
    name: "utctime",
    category: "Miscellaneous",
    description: "Gets the current UTC time and date. Example: Fri, 31 Dec 1999 23:59:59",
    usage: "utctime"
};
