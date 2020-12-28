const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const idRisultati = '788492260722343957';
const Discord = require("discord.js");
const emoji = require("./emoji.json");

var arrayVotanti = [];
var rogo = [];
var messageReaction = '';

const pollBallottaggio = (idCanaleVotazioni, client) => {
  var i = 0;
  var descriptionPoll = '';
  var voti = 0;
  var raccoltaVoti = [];
  var raccoltaReaction = [];

    arrayVotanti.forEach(votante => {
      descriptionPoll = descriptionPoll + emoji[i] + ' = ' + votante + '\n';
      i++;
    })

  const pollEmbed = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi vuoi mandare al ballottaggio?')
    .setDescription(descriptionPoll)

  idCanaleVotazioni.send(pollEmbed).then(messageReaction => {
    for(var j = 0; j < arrayVotanti.length; j++) {
      messageReaction.react(emoji[j]);
    }

    const filter = (reaction, member) => {
      return emoji.includes(reaction.emoji.name) && arrayVotanti.includes(member.username);
    };

    // Create the collector
    const collector = messageReaction.createReactionCollector(filter, {
      max: arrayVotanti.length
    });

    collector.on('collect', (reaction, user) => {
      voti++;
      messageReaction.channel.send(`**${voti}** persone hanno votato. Mancano **${arrayVotanti.length - voti}** persone.`)
      message.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
      message.channel.bulkDelete(messages);
      });
      client.channels.cache.get(idRisultati).send(`**${user.username}** ha votato.`);

      raccoltaReaction.push(emoji.indexOf(reaction._emoji.name));

      var userId = messageReaction.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

      const userReactions = messageReaction.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
      try {
      	for (const reaction of userReactions.values()) {
      		reaction.users.remove(userId);
      	}
      } catch (error) {
      	console.error('Failed to remove reactions.');
      }
    });

    collector.on('end', (collected) => {
      var stringaVoti = '';

      raccoltaReaction.forEach(voto => {
        if(raccoltaVoti.find(x => x.votato === arrayVotanti[voto]) == undefined)
        {
          raccoltaVoti.push({
            votato: arrayVotanti[voto],
            nVoti: raccoltaReaction.filter(x => x===voto).length
          });
        }
      });

      raccoltaVoti.forEach(v => {
        stringaVoti = stringaVoti + '**' + v.votato + '** ha ricevuto **' + v.nVoti + '** voti.\n';
      });

      client.channels.cache.get(idRisultati).send(`${stringaVoti}`);

      messageReaction.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));


      while(rogo.length < 2) {
        findMax(raccoltaVoti)
      }

      client.channels.cache.get(idRisultati).send(`Al rogo ci vanno **${rogo.join('**, **')}**`);

      rogo.forEach(r => {
        arrayVotanti.splice(arrayVotanti.indexOf(r), 1);
      });

      pollRogo(idCanaleVotazioni);
    });
  });
}

const pollRogo = (idCanaleVotazioni) => {
  console.log(arrayVotanti)
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

const findMax = (raccoltaVoti) => {
  var max = -1;
  for(var i = 0; i < raccoltaVoti.length; i++) {
    if(raccoltaVoti[i].nVoti > max) {
      max = raccoltaVoti[i].nVoti
    }
  }

  raccoltaVoti.filter(persona => persona.nVoti === max).forEach(p => {
    rogo.push(p.votato);
    raccoltaVoti.splice(raccoltaVoti.indexOf(p), 1);
  });
}

module.exports = {
  name:"v",
  description:"comando per votare",

  async execute(members, message, args, client) {
    //var numero = client.guilds.cache.get('774369837727350844').channels.cache.get('774710293363949618').members.size
    var membersOnline = client.guilds.cache.get('774369837727350844').channels.cache.get('774710293363949618').members
    var idCanaleVotazioni = client.guilds.cache.get('774369837727350844').channels.cache.get('788491738578288651')
    var votanti = 0;

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
        pollBallottaggio(idCanaleVotazioni, client)
    }).catch((error) => {
      console.log(error);
    });
  }
}
