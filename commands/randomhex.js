const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
    const randomHexColorCode = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return "#" + n.slice(0, 6);
    };

    var hex = randomHexColorCode();

    const randomhexEmbed = new MessageEmbed()
        .setColor(hex)
        .setTitle("Random Hex")
        .setDescription(`Hex:\n${hex}`)
    message.channel.send({ embeds: [randomhexEmbed] });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["torgb"],
    permLevel: "User"
};

exports.help = {
    name: "randomhex",
    category: "Miscellaneous",
    description: "Sends a message with a random hexadecimal color code.",
    usage: "randomhex"
};
