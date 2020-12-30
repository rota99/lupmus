module.exports = {
  name: "t",
  description: "Comando per riconoscere il traditore",

  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseTraditore = new Promise((resolve) => {
      var lupi = [];
      const ruoliLupi = ["774683281727160360", "774684162144993350", "774684170500571186", "774684172705988649", "774684174657126470"]
      members.forEach((member) => {
        ruoliLupi.forEach((lupo) => {
          if(member._roles.includes(lupo)) {
            lupi.push(member.user.username)
          }
        });
      });
      resolve(lupi);
    });

    promiseTraditore.then((data) => {
      var role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "lupo secondario");

      var traditore = message.guild.members.cache.find(member => member._roles.includes("774684173787987978"))
      traditore.roles.add(role)
      message.channel.send(`Questa notte il branco ti ha riconosciut* \nIl branco è composto da: \n**${data.join('**, **')}**`)
    });
  }
}
