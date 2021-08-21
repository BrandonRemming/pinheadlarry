exports.run = async (client, message, args, level) => {
    const replying = client.settings.ensure(message.guild.id, client.config.defaultSettings).commandReply;
    await message.reply({ content: "Bot is shutting down.", allowedMentions: { repliedUser: (replying === "true") }});;
    await Promise.all(client.commands.map(cmd =>
        client.unloadCommand(cmd)
    ));
    process.exit(0);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["restart"],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "shutdown",
    category: "System",
    description: "Shuts down the bot.",
    usage: "shutdown"
};
