const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("you didn't provide any arguments. Derp.");

  const rgbtohexResponse = "you need to provide three values between 0 and 255. Derp.";
  const isNumber = val => typeof val === 'number' && val === val;

  var rVal = parseInt(args[0])
  if (isNumber(rVal) === false) return message.reply(rgbtohexResponse);
  if (rVal < 0) return message.reply(rgbtohexResponse);
  if (rVal > 255) return message.reply(rgbtohexResponse);

  var gVal = parseInt(args[1])
  if (isNumber(gVal) === false) return message.reply(rgbtohexResponse);
  if (gVal < 0) return message.reply(rgbtohexResponse);
  if (gVal > 255) return message.reply(rgbtohexResponse);

  var bVal = parseInt(args[2])
  if (isNumber(bVal) === false) return message.reply(rgbtohexResponse);
  if (bVal < 0) return message.reply(rgbtohexResponse);
  if (bVal > 255) return message.reply(rgbtohexResponse);

  const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  var hex = RGBToHex(rVal, gVal, bVal);

  const rgbtohexEmbed = new Discord.RichEmbed()
    .setColor(`#${hex}`)
    .setTitle(`RGB to Hex`)
    .setDescription(`Hex of ${rVal} ${gVal} ${bVal}:\n#${hex}`)
  message.channel.send({embed: rgbtohexEmbed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tohex"],
  permLevel: "User"
};

exports.help = {
  name: "rgbtohex",
  category: "Miscellaneous",
  description: "Converts given RGB paramenters (each between 0 and 255) to a hexadecimal color code.",
  usage: "rgbtohex [r] [g] [b]"
};
