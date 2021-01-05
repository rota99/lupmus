module.exports = {
  name: "m",
  description: "Comando per dare il ruolo morto.",

  execute(members, message, args, client) {
    const idDiscussione = '774710293363949618';
    var membriCanale = client.guilds.cache.get('774369837727350844').channels.cache.get(message.channel.id).members;
    var ruolo = membriCanale.find(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))._roles
    var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "morto")
    var morto = message.channel.members.find(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members
      morto.roles.remove(ruolo)
      morto.roles.add(role)
      message.channel.send(`Mi dispiace fra ma hai perso il drip`)
  }
}
