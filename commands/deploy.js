exports.run = async (client, message, args, level) => {
    const guildCmds = client.slashcmds.filter(c => c.guildOnly).map(c => c.commandData);

    const globalCmds = client.slashcmds.filter(c => !c.guildOnly).map(c => c.commandData);

    let deployMessage = await message.channel.send("Deploying commands...");

    await client.guilds.cache.get(message.guild.id)?.commands.set(guildCmds);

    await client.application?.commands.set(globalCmds).catch(e => console.log(e));

    await deployMessage.edit("All commands deployed!");
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "deploy",
    category: "System",
    description: "This will deploy all slash commands.",
    usage: "deploy"
};
