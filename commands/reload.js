exports.run = async (client, message, args, level) => {
    if (!args || args.length < 1) return message.reply("you must provide a command to reload. Derp.");
    const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(response);

    response = client.loadCommand(command.help.name);
    if (response) return message.reply(response);

    message.reply(`the command \`${command.help.name}\` has been reloaded.`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "reload",
    category: "System",
    description: "Reloads a command that\'s been modified.",
    usage: "reload [command]"
};
