const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const Discord = require("discord.js");
var arrayVotanti = []

const pollBallottaggio = (idCanaleGenerale) => {

  const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi vuoi mandare al ballottaggio?')
    .setDescription(`Al ballottaggio ci vanno ${arrayVotanti.join(', ')}`)

    idCanaleGenerale.send(exampleEmbed);
}

const conta = (membersOnline) => {
  var i = 0;
  arrayVotanti.length = 0
  membersOnline.forEach(member => {
    if (member._roles.includes(idNarratore) || member._roles.includes(idMorto) || member._roles.includes(idBot1) || member._roles.includes(idBot2) || member._roles.length == 0) {
      i++
    }
    else {
      arrayVotanti.push(member.user.username)
    }
  });
  return i;
}

module.exports = {
  name:"v",
  description:"comando per votare",

  async execute(members, message, args, client) {
    //var numero = client.guilds.cache.get('774369837727350844').channels.cache.get('774710293363949618').members.size
    var membersOnline = client.guilds.cache.get('774369837727350844').channels.cache.get('774710293363949618').members
    var idCanaleGenerale = client.guilds.cache.get('774369837727350844').channels.cache.get('774369837727350846')
    var votanti = 0;
    console.log(args)

    const promiseConta = new Promise((resolve, reject) => {
      let contaMembri = conta(membersOnline);
      if(contaMembri >= 0) {
        resolve(contaMembri)
      } else {
        reject("Conta è < 0.")
      }
    });

    promiseConta.then((data) => {
      votanti = membersOnline.size - data;
      message.channel.send(`Possono votare ${votanti} persone`);

      if(args[0] == 'b')
        pollBallottaggio(idCanaleGenerale)
    }).catch((error) => {
      console.log(error);
    });
  }
}
