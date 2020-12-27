const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const Discord = require("discord.js");
const emoji = require("./emoji.json");

var arrayVotanti = []
var messageReaction = ''

const pollBallottaggio = (idCanaleGenerale, client) => {
  var i = 0;
  var descriptionPoll = '';

    arrayVotanti.forEach(votante => {
      descriptionPoll = descriptionPoll + emoji[i] + ' = ' + votante + '\n';
      i++;
    })

  const pollEmbed = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi vuoi mandare al ballottaggio?')
    .setDescription(descriptionPoll)

  idCanaleGenerale.send(pollEmbed).then(messageReaction => {
    for(var j = 0; j < arrayVotanti.length; j++) {
      messageReaction.react(emoji[j]);
    }

    const filter = (reaction, member) => {
      return emoji.includes(reaction.emoji.name) && !(member.username == 'Wherewolf');
    };

    // Create the collector
    const collector = messageReaction.createReactionCollector(filter, {
      max: arrayVotanti.length
    });

    collector.on('end', (collected) => {
      if(collected.array()[0].users.cache.array()[0].id != '788495024240459806')
        message.channel.send('*' + collected.array()[0].users.cache.array()[0].username + '* ha votato.')
    });
  });
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
        pollBallottaggio(idCanaleGenerale, client)
    }).catch((error) => {
      console.log(error);
    });
  }
}
