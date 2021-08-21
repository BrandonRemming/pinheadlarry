const { codeBlock } = require("@discordjs/builders");

exports.run = (client, message, args, level) => {
    if (!args[0]) {
        const settings = message.settings;

        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) :
            client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);

        const enabledCommands = myCommands.filter(cmd => cmd.conf.enabled);

        const commandNames = [...enabledCommands.keys()];

        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let output = `= Command List =\n[Use ${settings.prefix}help <commandname> for details]\n`;
        const sorted = enabledCommands.sort((p, c) => p.help.category > c.help.category ? 1 :
            p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
            }
            output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
        });
        message.channel.send(codeBlock("asciidoc", output));

    } else {
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            message.channel.send(codeBlock("asciidoc", `= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nalises:: ${command.conf.aliases.join(", ")}`));
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp"],
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
};
