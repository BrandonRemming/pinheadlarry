const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (!args || args.length < 1) return message.reply("you didn't provide any arguments.");

    const isNumber = val => typeof val === 'number' && val === val;
    const inRange = (n, start, end = null) => {
        if (end && start > end) [end, start] = [start, end];
        return end == null ? n >= 0 && n < start : n >= start && n < end;
    };

    function valPasses (val) {
        if ((isNumber(val) == true) && (inRange(val, 0, 256) == true)) {
            return true
        } else return false
    }

    let rVal = parseInt(args[0])
    let gVal = parseInt(args[1])
    let bVal = parseInt(args[2])

    if ((valPasses(rVal) == true) && (valPasses(gVal) == true) && (valPasses(bVal) == true)) {
        const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
        const hex = RGBToHex(rVal, gVal, bVal);

        const rgbtohexEmbed = new Discord.MessageEmbed()
            .setColor(`#${hex}`)
            .setTitle(`RGB to Hex`)
            .setDescription(`Hex of ${rVal} ${gVal} ${bVal}:\n#${hex}`)
        message.channel.send({embed: rgbtohexEmbed});
    } else return message.reply("you need to provide three values between 0 and 255.")
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
