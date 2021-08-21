exports.run = async (client, interaction) => {
    try {
        await interaction.deferReply();
        const reply = await interaction.editReply("Ping?");
        await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
    } catch (e) {
        console.log(e);
        return await interaction.editReply(`There was a problem with your request.\n\`\`\`${e.message}\`\`\``);
    }
};

exports.commandData = {
    name: "ping",
    description: "It pings, then pongs, but it's not ping pong.",
    options: [],
    defaultPermission: true,
};

exports.guildOnly = false;
