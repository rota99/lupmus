const canaliGuardie = ["787044655744417802", "787044778385866832", "787044819834241095"]
const ruoliEsclusi = ['774699081620521000', '780154332934438942', '787753336169299998']

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

      canaliGuardie.forEach((canale) => {
        var membriCanale = client.guilds.cache.get('774369837727350844').channels.cache.get(canale).members;
        membriCanale.forEach((membro) => {
          var controllo = 0;
          ruoliEsclusi.forEach(ruolo => {
            if(membro._roles.includes(ruolo)) {
              controllo = 1;
            }
          })
          if(controllo == 1) {
            return;
          }
          else {
            if(membro.user.username != null) {
              if(numeroGuardie == 1)
                client.channels.cache.get(canale).send(`La guardia in gioco è: \n**${data}**`);
              else
                client.channels.cache.get(canale).send(`Le guardie in gioco sono: \n**${data.join('**, **')}**`)
            }
          }
        });
      });
    });
  }
}
