// The EVAL command will execute ANY arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON!
const { codeBlock } = require("@discordjs/builders");

exports.run = async (client, message, args, level) => {
    const code = args.join(" ");
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        message.channel.send(codeBlock("js", clean));
    } catch (err) {
        message.channel.send(codeBlock("x1", `ERROR ${await client.clean(client, err)}`));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "eval",
    category: "System",
    description: "Evaluates arbitrary javascript.",
    usage: "eval [...code]"
};
