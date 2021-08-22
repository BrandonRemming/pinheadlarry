const inquirer = require("inquirer");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

const defaultSettings = {
    "prefix": "t!",
    "modLogChannel": "mod-logs",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true",
    "commandReply": "true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "Welcome, {{user}}!",
    "welcomeEnabled": "false"
};

const settings = new Enmap({
    name: "settings",
    cloneLevel: 'deep',
    ensureProps: true
});


let prompts = [
    {
        type: "list",
        name: "resetDefaults",
        message: "Do you want to reset default settings?",
        choices: ["Yes", "No"]
    },
    {
        type: "input",
        name: "token",
        message: "Please enter the bot token from the application page. NEVER SHARE THIS WITH ANYONE!"
    },
    {
        type: "checkbox",
        name: "partials",
        message: "Which partials would you like? \n" +
            "By default Pinhead Larry needs Direct Messages to work. \n" +
            "For join messages to work you need Guild Members, which is privileged and requires extra setup.\n" +
            "For more info about partials see the README.",
        choices: [
            { "name": "Users", "value": "USER" },
            { "name": "Channels", "value": "CHANNEL", "checked": true },
            { "name": "Guild Members", "value": "GUILD_MEMBER"},
            { "name": "Messages", "value": "MESSAGE" },
            { "name": "Reactions", "value": "REACTION" }
        ]
    },
    {
        type: "checkbox",
        name: "intents",
        message: "Which intents would you like? \n" +
            "By default Pinhead Larry needs Guilds, Guild Messages, Guild Members (privileged), Direct Messages, and Guild Emojis to work. \n" +
            "For join messages to work you need Guild Members, which is privileged and requires extra setup.\n" +
            "For more info about intents see the README.",
        choices: [
            { "name": "Guilds", "value": "GUILDS", "checked": true },
            { "name": "Guild Messages", "value": "GUILD_MESSAGES", "checked": true },
            { "name": "Direct Messages", "value": "DIRECT_MESSAGES", "checked": true },
            { "name": "Guild Bans", "value": "GUILD_BANS" },
            { "name": "Guild Emojis/Stickers", "value": "GUILD_EMOJIS_AND_STICKERS", "checked": true},
            { "name": "Guild Integrations", "value": "GUILD_INTEGRATIONS" },
            { "name": "Guild Webhooks", "value": "GUILD_WEBHOOKS" },
            { "name": "Guild Invites", "value": "GUILD_INVITES" },
            { "name": "Guild Voice States", "value": "GUILD_VOICE_STATES" },
            { "name": "Guild Message Reactions", "value": "GUILD_MESSAGE_REACTIONS" },
            { "name": "Guild Message Typing", "value": "GUILD_MESSAGE_TYPING" },
            { "name": "Direct Message Reactions", "value": "DIRECT_MESSAGE_REACTIONS" },
            { "name": "Direct Message Typing", "value": "DIRECT_MESSAGE_TYPING" },
            { "name": "Guild Presences (privileged)", "value": "GUILD_PRESENCES" },
            { "name": "Guild Members (privileged)", "value": "GUILD_MEMBERS", "checked": true},
       ]
   },
];

(async () => {
    console.log("Setting up Pinhead Larry configuration...");
    await settings.defer;
    if (!settings.has("default")) {
        prompts = prompts.slice(1);
        console.log("First start! Inserting default guild settings in the database...");
        await settings.set("default", defaultSettings);
    }

    const answers = await inquirer.prompt(prompts);

    if (answers.resetDefaults && answers.resetDefaults === "Yes") {
        console.log("Resetting default guild settings...");
        await settings.set("default", defaultSettings);
    }

    baseConfig = baseConfig
        .replace("{{token}}", `"${answers.token}"`)
        .replace("{{partials}}", JSON.stringify(answers.partials))
        .replace("{{intents}}", JSON.stringify(answers.intents));

    fs.writeFileSync("./config.js", baseConfig);
    console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
    console.log("Configuration has been written, enjoy!");
    await settings.close();
    process.exit();
})();
