module.exports = {
  name: "gr",
  description: "Comando per far riconoscere romeo",

  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseGiulietta = new Promise((resolve) => {
      var giulietta = null;
      const ruoloGiulietta= "786674683617083413"
      members.forEach((member) => {
          if(member._roles.includes(ruoloGiulietta)) {
            giulietta = member.user.username;
          }
      });
      resolve(giulietta);
    });

    promiseGiulietta.then((data) => {
      var membriCanale = client.guilds.cache.get('774369837727350844').channels.cache.get(message.channel.id).members;
      var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "romeo");
      var romeo = message.channel.members.find(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))
      romeo.roles.add(role)
      message.channel.send(`Giulietta **(${data})** ti ha scelt* come Romeo.`)
    });
  }
}
