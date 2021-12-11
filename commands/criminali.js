const canaliCriminali = ["786684145308663858", "787045057408663612", "787045076241088594", "787044819834241095"]
const ruoliEsclusi = ['774699081620521000', '780154332934438942', '787753336169299998']

module.exports = {
  name: "c",
  description: "Comando per riconoscere far riconoscere i criminali",

  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    var numeroCriminali = 0;
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;

    const promiseCriminali = new Promise((resolve) => {
      var criminali = [];
      const ruoliCriminali = ["786684300175212595", "787045347167305768", "787045379551526923", "787045304687525888"]
      members.forEach((member) => {
        ruoliCriminali.forEach((criminale) => {
          if(member._roles.includes(criminale)) {
            numeroCriminali++;
            criminali.push(member.user.username)
          }
        });
      });
      resolve(criminali);
    });

    promiseCriminali.then((data) => {

      canaliCriminali.forEach((canale) => {
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
              if(numeroCriminali == 1)
              client.channels.cache.get(canale).send(`Il criminale in gioco è: \n**${data}**`);
              else
              client.channels.cache.get(canale).send(`I criminali in gioco sono: \n**${data.join('**, **')}**`)
            }
          }
        });
      });
    });
  }
}
