if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16 or higher is required. Update Node on your system.");

try {
    require("./config.js");
} catch (e) {
    console.log("Creating a config.js file for the bot");
    require("./setup.js");
}

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs")
const Enmap = require("enmap");
const config = require("./config.js");

const client = new Client({
    intents: config.intents,
    partials: config.partials
});

client.config = config;

client.logger = require("./modules/Logger");

require("./modules/functions.js")(client);

client.owners = [];

client.commands = new Collection();
client.aliases = new Collection();
client.slashcmds = new Collection();

client.settings = new Enmap({ name: "settings" });

const init = async () => {
    const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
    for (const file of commands) {
        const response = client.loadCommand(file)
        if (response) console.log(response);
    }

    const slashFiles = readdirSync("./slash").filter(file => file.endsWith(".js"));
    for (const file of slashFiles) {
        const command = require(`./slash/${file}`);
        const commandName = file.split(".")[0];
        client.logger.log(`Loading Slash Command: ${commandName}`, "log");
        client.slashcmds.set(command.commandData.name, command);
    }

    const eventFiles = readdirSync("./events/").filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    }

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.on("threadCreate", (thread) => thread.join());

    client.login(client.config.token);
};

init();
