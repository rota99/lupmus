const canaliGuardie = ["787044655744417802", "787044778385866832", "787044819834241095"]
const idNarratore = "774699081620521000";
const idMorto = "780154332934438942";
const idBot = "787753336169299998";

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
      canaliGuardie.forEach((canale) => {
        console.log(client.guilds.cache.get('774369837727350844').channels.cache.get(canale).members.find(user => !user._roles.includes(idNarratore || idMorto || idBot)))
        if(!client.guilds.cache.get('774369837727350844').channels.cache.get(canale).members.find(user => user._roles.includes(idNarratore || idMorto || idBot))) {
          if(numeroGuardie == 1)
            client.channels.cache.get(canale).send(`La guardia in gioco è: \n**${data}**`);
          else
            client.channels.cache.get(canale).send(`Le guardie in gioco sono: \n**${data.join('**, **')}**`)
        }
        //console.log(client.guilds.cache.get('774369837727350844').channels.cache.get(canale).members.size)
      });
    });
  }
}