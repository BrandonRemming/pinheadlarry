const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("you didn't provide any arguments. Derp.");
  const notNumberResponse = "you need to provide a temperature value. Derp."
  const tooLowResponse = "you need to provide a temperature value greater than -273.15°C. Derp.";
  const isNumber = val => typeof val === 'number' && val === val;
  const toDecimalMark = num => num.toLocaleString('en-US');

  var arguments = parseFloat(args[0]);
  if (isNumber(arguments) === false) return message.reply(notNumberResponse);
  if (arguments < -273.15) return message.reply(tooLowResponse);

  const celsiusToFahrenheit = degrees => 1.8 * degrees + 32;
  var fahrenheit = toDecimalMark(celsiusToFahrenheit(arguments));
  var celsius = toDecimalMark(arguments);

  const celsiusToFahrenheitEmbed = new Discord.RichEmbed()
    .setColor([255,0,0])
    .setTitle(`Celsius to Fahrenheit`)
    .setDescription(`${celsius}°C in Fahrenheit:\n${fahrenheit}°F`)
  message.channel.send({embed: celsiusToFahrenheitEmbed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["celsiustofahrenheit"],
  permLevel: "User"
};

exports.help = {
  name: "ctof",
  category: "Miscellaneous",
  description: "Converts given temperature in Celsius to Fahrenheit.",
  usage: "ctof [temperature]"
};
