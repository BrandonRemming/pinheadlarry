exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  await message.reply("the bot is shutting down.");
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "shutdown",
  category: "System",
  description: "Shuts down the bot.",
  usage: "shutdown"
};
