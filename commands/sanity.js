const Discord = require('discord.js');
const { ownerID } = require('../config.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const sanityTaggedUser = message.mentions.users.first();
  let sanityUsername = message.author.username
  var sanityRate = (Math.floor(Math.random() * 101))

  // If the message mentions the bot owner.
  if (message.content.includes(ownerID)) {
  	const ownerMentionSanityEmbed = new Discord.RichEmbed()
  		.setColor([255,0,0])
  		.setTitle("Sanity Machine")
  		.setDescription(`${sanityTaggedUser.username}\'s sanity:\n69%`)
  	message.channel.send({embed: ownerMentionSanityEmbed})
  }

  // If the message mentions anybody else.
	else if (message.mentions.users.size) {
  	const otherMentionSanityEmbed = new Discord.RichEmbed()
  		.setColor([255,0,0])
  		.setTitle("Sanity Machine")
  		.setDescription(`${sanityTaggedUser.username}\'s sanity:\n${sanityRate}%`)
  	message.channel.send({embed: otherMentionSanityEmbed})
	}

  // If the message doesn't mention anyone and is from the bot owner.
	else if (message.author.id === ownerID) {
  	const ownerMessageSanityEmbed = new Discord.RichEmbed()
  		.setColor([255,0,0])
  		.setTitle("Sanity Machine")
  		.setDescription(`${sanityUsername}\'s sanity:\n69%`)
  	message.channel.send({embed: ownerMessageSanityEmbed})
  }

  // If the message doesn't mention anyone and is from anybody else.
  else {
  	const otherMessageSanityEmbed = new Discord.RichEmbed()
  		.setColor([255,0,0])
  		.setTitle("Sanity Machine")
  		.setDescription(`${sanityUsername}\'s sanity:\n${sanityRate}%`)
  	message.channel.send({embed: otherMessageSanityEmbed})
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "sanity",
  category: "Fun",
  description: "Sends a message telling you how sane you as a percentage (0%-100%). If a user is mentioned, it will say how sane they are.",
  usage: "sanity [@user]"
};
