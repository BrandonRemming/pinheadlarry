const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
    let date = new Date(Date.now());
    let bottimeString = date.toString().slice(0, 25);

    const bottimeEmbed = new MessageEmbed()
        .setColor([4,141,137])
        .setTitle("Current Bot Time and Date:")
        .setDescription(bottimeString)
    message.channel.send({ embeds: [bottimeEmbed] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["time"],
    permLevel: "User"
};

exports.help = {
    name: "bottime",
    category: "Miscellaneous",
    description: "Gets the bot\'s current time and date. Example: Fri, 31 Dec 1999 23:59:59",
    usage: "bottime"
};
