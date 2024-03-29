module.exports = async (client, message) => {
    if (message.author.bot) return;

    const settings = message.settings = client.getSettings(message.guild);

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.reply(`the prefix for this guild is \`${settings.prefix}\`.`);
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly) {
        return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
    }

    if (!cmd.conf.enabled) return;

    if (level < client.levelCache[cmd.conf.permLevel]) {
        if (settings.systemNotice === "true") {
            return message.channel.send(`You do not have permission to use this command.\nYour permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})\nThis command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
        } else {
            return;
        }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    }

    try {
        await cmd.run(client, message, args, level);
        client.logger.log(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.id} ran command ${cmd.help.name}`, "cmd");
    } catch (e) {
        message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
            .catch(e => console.error("An error occurred replying on an error", e));
    }
};
