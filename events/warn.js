module.exports = async (client, warning) => {
  client.logger.log(`A warning event was sent by Discord.js: \n${JSON.stringify(warning)}`, "warn");
};
