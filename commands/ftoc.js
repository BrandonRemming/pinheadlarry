const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (!args || args.length < 1) return message.reply("you didn't provide any arguments.");
    const notNumberResponse = "you need to provide a temperature value."
    const tooLowResponse = "you need to provide a temperature value greater than -459.67°F.";

    const isNumber = val => typeof val === 'number' && val === val;
    const toDecimalMark = num => num.toLocaleString('en-US');

    var arguments = parseFloat(args[0]);
    if (isNumber(arguments) === false) return message.reply(notNumberResponse);
    if (arguments < -459.67) return message.reply(tooLowResponse);

    const fahrenheitToCelsius = degrees => ((degrees - 32) * 5) / 9;
    var celsius = toDecimalMark(fahrenheitToCelsius(arguments));
    var fahrenheit = toDecimalMark(arguments);

    const fahrenheitToCelsiusEmbed = new Discord.MessageEmbed()
        .setColor([4,141,137])
        .setTitle(`Fahrenheit to Celsius`)
        .setDescription(`${fahrenheit}°F in Celsius:\n${celsius}°C`);
    message.channel.send({embed: fahrenheitToCelsiusEmbed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fahrenheittocelsius"],
  permLevel: "User"
};

exports.help = {
  name: "ftoc",
  category: "Miscellaneous",
  description: "Converts given temperature in Fahrenheit to Celsius.",
  usage: "ftoc [temperature]"
};
