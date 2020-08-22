const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  let date = new Date(Date.now());
  let bottimeString = date.toString().slice(0, 25);

  const bottimeEmbed = new Discord.RichEmbed()
    .setColor([255,0,0])
    .setTitle("Current Bot Time and Date:")
    .setDescription(bottimeString)
  message.channel.send({embed: bottimeEmbed});
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
