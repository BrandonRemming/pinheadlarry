const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const beeEmbed = new Discord.RichEmbed()
    .setColor([252,186,3])
    .setImage("https://www.models-resource.com/resources/big_icons/21/20331.png")
    .setDescription("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway, because bees don't care what humans think is impossible.")
  message.channel.send({embed: beeEmbed})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bee",
  category: "Fun",
  description: "Bee.",
  usage: "bee"
};
