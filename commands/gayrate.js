const Discord = require('discord.js');
const { ownerID } = require('../config.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const gayrateTaggedUser = message.mentions.users.first();
  let gayrateUsername = message.author.username
  var gayrateRate = (Math.floor(Math.random() * 101))

  // If the message mentions the bot owner.
  if (message.content.includes(ownerID)) {
    const ownerMentionGayrateEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Gay Rate Machine")
      .setDescription(`${gayrateTaggedUser.username} is 0% gay :rainbow_flag:`)
    message.channel.send({embed: ownerMentionGayrateEmbed})
  }

  // If the message mentions anybody else.
  else if (message.mentions.users.size) {
    const otherMentionGayrateEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Gay Rate Machine")
      .setDescription(`${gayrateTaggedUser.username} is ${gayrateRate}% gay :rainbow_flag:`)
    message.channel.send({embed: otherMentionGayrateEmbed})
  }

  // If the message doesn't mention anyone and is from the bot owner.
  else if (message.author.id === ownerID) {
    const ownerMessageGayrateEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Gay Rate Machine")
      .setDescription(`${gayrateUsername} is 0% gay :rainbow_flag:`)
    message.channel.send({embed: ownerMessageGayrateEmbed})
  }

  // If the message doesn't mention anyone and is from anybody else.
  else {
    const otherMessageGayrateEmbed = new Discord.RichEmbed()
      .setColor([255,0,0])
      .setTitle("Gay Rate Machine")
      .setDescription(`${gayrateUsername} is ${gayrateRate}% gay :rainbow_flag:`)
    message.channel.send({embed: otherMessageGayrateEmbed})
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gayrate",
  category: "Fun",
  description: "Sends a message telling you how gay you are as a percentage (0%-100%). If a user is mentioned, it will say how gay they are.",
  usage: "gayrate [@user]"
};
