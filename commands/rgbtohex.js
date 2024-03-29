const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
    const replying = client.settings.ensure(message.guild.id, client.config.defaultSettings).commandReply;
    if (!args || args.length < 1) return message.reply({ content: "You didn't provide any arguments.", allowedMentions: { repliedUser: (replying === "true") }});

    const isNumber = val => typeof val === "number" && val === val;
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
        const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
        const hex = RGBToHex(rVal, gVal, bVal);

        const rgbtohexEmbed = new MessageEmbed()
            .setColor(`#${hex}`)
            .setTitle("RGB to Hex")
            .setDescription(`Hex of ${rVal} ${gVal} ${bVal}:\n#${hex}`)
        message.channel.send({ embeds: [rgbtohexEmbed] });
    } else return message.reply({ content: "You need to provide three values between 0 and 255.", allowedMentions: { repliedUser: (replying === "true") }})
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
