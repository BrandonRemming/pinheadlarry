const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

  var hex = randomHexColorCode();

  const randomhexEmbed = new Discord.RichEmbed()
    .setColor(`${hex}`)
    .setTitle(`Random Hex`)
    .setDescription(`Hex:\n${hex}`)
  message.channel.send({embed: randomhexEmbed});
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
