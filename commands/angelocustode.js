module.exports = {
  name: "ac",
  description: "Comando per avvisare l'amato",
  
  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    var membriCanale = client.guilds.cache.get('774369837727350844').channels.cache.get(message.channel.id).members;
    var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "amato");
    var amato = message.channel.members.find(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;

    amato.roles.add(role)
    message.channel.send(`L'**angelo custode** ha deciso di proteggerti`)
  }
}
