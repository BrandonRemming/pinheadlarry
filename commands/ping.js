exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "It pings, then pongs, but it's not ping pong.",
    usage: "ping"
};
