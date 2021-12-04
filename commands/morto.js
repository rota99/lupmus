module.exports = {
  name: "m",
  description: "Comando per dare il ruolo morto.",

  execute(members, message, args, client) {
    const idDiscussione = '774710293363949618';
    var membriCanale = client.guilds.cache.get('774369837727350844').channels.cache.get(message.channel.id).members;
    var idMorto = "780154332934438942";
    var morto = message.channel.members.find(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1 && member._roles.indexOf("780154332934438942") == -1))
    var ruolo = morto._roles;

    const promiseRemoveRole = new Promise((resolve, reject) => {
      if(ruolo.length > 0) {
        for(var i = 0; i < ruolo.length; i++) {
          morto.roles.remove(ruolo[i]);
        }

        resolve(morto);
      } else {
        reject("Non sono necrofilo ma");
      }
    });

    promiseRemoveRole.then((data) => {
      morto.roles.add(idMorto);
      message.channel.send(`Mi dispiace fra ma hai perso il drip`)
    }).catch((error) => {
      console.log(error);
    });
  }
}
