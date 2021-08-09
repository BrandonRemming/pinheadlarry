module.exports = async client => {
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");

    client.application = await client.fetchApplication();
    if (client.owners.length < 1) client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
    setInterval( async () => {
        client.owners = [];
        client.application = await client.fetchApplication();
        client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
    }, 60000);

    client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
};
