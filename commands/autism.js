const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const autismEmbed = new Discord.RichEmbed()
    .setColor([255,0,0])
    .setTitle("Autism")
    .setImage("https://media.discordapp.net/attachments/694863081779494933/696857148185116782/image0.jpg")
  message.channel.send({embed: autismEmbed})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "autism",
  category: "Fun",
  description: "Autism.",
  usage: "autism"
};
