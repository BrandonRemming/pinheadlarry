const Discord = require('discord.js');
const { ownerID } = require('../config.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const ppTaggedUser = message.mentions.users.first();
  let ppUsername = message.author.username
  let ppSection = "="
  var ppSize = ppSection.repeat(Math.floor(Math.random() * 15) + 1);

  // If the message mentions the bot owner.
  if (message.content.includes(ownerID)) {
    const ownerMentionPpEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Pp Size Machine")
      .setDescription(`${ppTaggedUser.username}\'s pp:\n8===============D`)
    message.channel.send({embed: ownerMentionPpEmbed})
  }

  // If the message mentions anybody else.
  else if (message.mentions.users.size) {
    const otherMentionPpEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Pp Size Machine")
      .setDescription(`${ppTaggedUser.username}\'s pp:\n8${ppSize}D`)
    message.channel.send({embed: otherMentionPpEmbed})
  }

  // If the message doesn't mention anyone and is from the bot owner.
  else if (message.author.id === ownerID) {
    const ownerMessagePpEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Pp Size Machine")
      .setDescription(`${ppUsername}\'s pp:\n8===============D`)
    message.channel.send({embed: ownerMessagePpEmbed})
  }

  // If the message doesn't mention anyone and is from anybody else.
  else {
    const otherMessagePpEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Pp Size Machine")
      .setDescription(`${ppUsername}\'s pp:\n8${ppSize}D`)
    message.channel.send({embed: otherMessagePpEmbed})
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pp",
  category: "Fun",
  description: "Sends a message telling you how long your pp is. If a user is mentioned, it will say how long their pp is.",
  usage: "pp [@user]"
};
