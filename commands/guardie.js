module.exports = {
  name: "g",
  description: "Comando per riconoscere far riconoscere le guardie",

  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    var numeroGuardie = 0;
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseGuardie = new Promise((resolve) => {
      var guardie = [];
      const ruoliGuardie = ["787045210617282631", "787045249939800125", "787045304687525888"]
      members.forEach((member) => {
        ruoliGuardie.forEach((guardia) => {
          if(member._roles.includes(guardia)) {
            numeroGuardie++;
            guardie.push(member.user.username)
          }
        });
      });
      resolve(guardie);
    });

    promiseGuardie.then((data) => {
      var guardia = message.guild.members.cache.find(member => member._roles.includes("787045210617282631" || "787045249939800125" || "787045249939800125"))
      if(numeroGuardie == 1)
        message.channel.send(`La guardia in gioco è: \n**${data}**`)
      else
        message.channel.send(`Le guardie in gioco sono: \n**${data.join('**, **')}**`)
    });
  }
}
