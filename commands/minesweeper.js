const Discord = require('discord.js');
const Minesweeper = require('discord.js-minesweeper');

exports.run = async (client, message, args, level) => {
    const isNumber = val => typeof val === 'number' && val === val;

    const minesResponse = "you need to provide a number of mines between 2 and 16. Derp."

    if (!args || args.length < 1) return message.reply(minesResponse);

    var mines = parseInt(args[0]);
    if (isNumber(mines) === false) return message.reply(minesResponse);
    if (mines < 2) return message.reply(minesResponse);
    if (mines > 16) return message.reply(minesResponse);

    const rows = 8
    const columns = 8

    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start();

    return matrix
        ? message.channel.send(`__**Minesweeper**__\n__Number of mines:__ ${mines}\nIf there are ${mines} squares left and no mines have been clicked on, you win.\n${matrix}`)
        : message.reply("you have provided an invalid number of mines. You need to provide a number of mines between 1 and 16.");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ms"],
    permLevel: "User"
};

exports.help = {
    name: "minesweeper",
    category: "Fun",
    description: "Sends an 8 x 8 game of minesweeper with the amount of mines provided (between 2 and 16).",
    usage: "minesweeper [mines]"
};
