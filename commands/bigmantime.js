exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("**BIG MAN TIME IN 3**");
  setTimeout(() => {
    msg.edit("**BIG MAN TIME IN 2**");
  }, 1000)
  setTimeout(() => {
    msg.edit("**BIG MAN TIME IN 1**");
  }, 2000)
  setTimeout(() => {
    msg.edit("**BIG MAN TIME IN 0** (uploading file)");
  }, 3000)
  setTimeout(() => {
    message.channel.send("**IT'S BIG MAN TIME!**", {files: ['https://cdn.discordapp.com/attachments/704075358353227847/737791184143122472/bigmantime.mp4']});
  }, 3001)
  setTimeout(() => {
    msg.delete();
  }, 6000)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bigmantime",
  category: "Fun",
  description: "BIG MAN TIME!",
  usage: "bigmantime"
};
