const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const idRisultati = '788492260722343957';
const idVotazioni = '788491738578288651';
const Discord = require("discord.js");
const emoji = require("./emoji.json");

var arrayVotanti = [];
var rogo = [];
var messageReaction = '';
var messageReactionRogo = '';

const pollBallottaggio = (idCanaleVotazioni, idCanaleGenerale, client) => {
  var i = 0;
  var descriptionPoll = '';
  var voti = 0;
  var raccoltaVoti = [];
  var raccoltaReaction = [];
  var cancella = 0;

  arrayVotanti.forEach(votante => {
    descriptionPoll = descriptionPoll + emoji[i] + ' = ' + votante + '\n';
    i++;
  })

  const pollEmbed = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi volete ballottare champs?')
    .setAuthor('Ballottaggio')
    .setDescription(descriptionPoll)
	  .setImage('https://i.imgur.com/vFR9aYo.jpg')
    .setFooter('Ricordatevi di votare solo una persona');



  idCanaleGenerale.send(pollEmbed).then(messageReaction => {
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

      if(voti == 1 && arrayVotanti.length - voti == 1)
        messageReaction.channel.send(`**${voti}** persona ha votato. Manca **${arrayVotanti.length - voti}** persona.`)
      else if(voti != 1 && arrayVotanti.length - voti == 1)
        messageReaction.channel.send(`**${voti}** persone hanno votato. Manca **${arrayVotanti.length - voti}** persona.`)
      else if(voti == 1 && arrayVotanti.length - voti != 1)
        messageReaction.channel.send(`**${voti}** persona ha votato. Mancano **${arrayVotanti.length - voti}** persone.`)
      else
        messageReaction.channel.send(`**${voti}** persone hanno votato. Mancano **${arrayVotanti.length - voti}** persone.`)

      client.channels.cache.get(idVotazioni).send(`**${user.username}** ha votato.`);

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

      if(cancella) {
        messageReaction.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
          messageReaction.channel.bulkDelete(messages);
        });
      }

      cancella = 1;
    });

    collector.on('end', (collected) => {
      var stringaVoti = '';

      raccoltaReaction.forEach(voto => {
        if(raccoltaVoti.find(x => x.votato === arrayVotanti[voto]) == undefined) {
          raccoltaVoti.push({
            votato: arrayVotanti[voto],
            nVoti: raccoltaReaction.filter(x => x===voto).length
          });
        }
      });

      raccoltaVoti.forEach(v => {
        if(v.nVoti == 1)
          stringaVoti = stringaVoti + '**' + v.votato + '** ha ricevuto **' + v.nVoti + '** voto.\n';
        else
          stringaVoti = stringaVoti + '**' + v.votato + '** ha ricevuto **' + v.nVoti + '** voti.\n';
      });

      client.channels.cache.get(idVotazioni).send(`${stringaVoti}`);

      messageReaction.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));


      while(rogo.length < 2) {
        findMax(raccoltaVoti)
      }

      client.channels.cache.get(idVotazioni).send(`Al rogo ci vanno **${rogo.join('**, **')}**`);

      rogo.forEach(r => {
        arrayVotanti.splice(arrayVotanti.indexOf(r), 1);
      });

      setTimeout(() => { pollRogo(idCanaleVotazioni, idCanaleGenerale, client); }, 10000);

      client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        setTimeout(() => {  client.channels.cache.get(idVotazioni).bulkDelete(messages); }, 30000);
      });
    });
  });
}

const pollRogo = (idCanaleVotazioni, idCanaleGenerale, client) => {
  var i = 0;
  var descriptionPoll = '';
  var voti = 0;
  var raccoltaVoti = [];
  var raccoltaReaction = [];
  var cancella = 0;
  var arrayAccusati = rogo.slice(0, rogo.length);

  rogo.splice(0, rogo.length)

  arrayAccusati.forEach(accusato => {
    descriptionPoll = descriptionPoll + emoji[i] + ' = ' + accusato + '\n';
    i++;
  });

  const pollEmbedRogo = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi volete rogare champs?')
    .setAuthor('Rogo')
    .setDescription(descriptionPoll)
    .setImage('https://i.imgur.com/H3ORkU4.jpg')
    .setFooter('Ricordatevi che gli accusati non possono votare');

  idCanaleGenerale.send(pollEmbedRogo).then(messageReactionRogo => {
    for(var j = 0; j < arrayAccusati.length; j++) {
      messageReactionRogo.react(emoji[j]);
    }

    const filter = (reaction, member) => {
      return emoji.includes(reaction.emoji.name) && arrayVotanti.includes(member.username);
    };

    // Create the collector
    const collectorRogo = messageReactionRogo.createReactionCollector(filter, {
      max: arrayVotanti.length
    });

    collectorRogo.on('collect', (reaction, user) => {
      voti++;

      if(voti == 1 && arrayVotanti.length - voti == 1)
        messageReactionRogo.channel.send(`**${voti}** persona ha votato. Manca **${arrayVotanti.length - voti}** persona.`)
      else if(voti != 1 && arrayVotanti.length - voti == 1)
        messageReactionRogo.channel.send(`**${voti}** persone hanno votato. Manca **${arrayVotanti.length - voti}** persona.`)
      else if(voti == 1 && arrayVotanti.length - voti != 1)
        messageReactionRogo.channel.send(`**${voti}** persona ha votato. Mancano **${arrayVotanti.length - voti}** persone.`)
      else
        messageReactionRogo.channel.send(`**${voti}** persone hanno votato. Mancano **${arrayVotanti.length - voti}** persone.`)

      client.channels.cache.get(idVotazioni).send(`**${user.username}** ha votato.`);

      raccoltaReaction.push(emoji.indexOf(reaction._emoji.name));

      var userId = messageReactionRogo.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

      const userReactions = messageReactionRogo.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
      try {
      	for (const reaction of userReactions.values()) {
      		reaction.users.remove(userId);
      	}
      } catch (error) {
      	console.error('Failed to remove reactions.');
      }

      if(cancella) {
        messageReactionRogo.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
          messageReactionRogo.channel.bulkDelete(messages);
        });
      }

      cancella = 1;
    });

    collectorRogo.on('end', (collected) => {
      var stringaVoti = '';

      console.log(raccoltaReaction)

      raccoltaReaction.forEach(voto => {
        if(raccoltaVoti.find(x => x.votato === arrayAccusati[voto]) == undefined) {
          raccoltaVoti.push({
            votato: arrayAccusati[voto],
            nVoti: raccoltaReaction.filter(x => x===voto).length
          });
        }
      });

      raccoltaVoti.forEach(v => {
        if(v.nVoti == 1)
          stringaVoti = stringaVoti + '**' + v.votato + '** ha ricevuto **' + v.nVoti + '** voto.\n';
        else
          stringaVoti = stringaVoti + '**' + v.votato + '** ha ricevuto **' + v.nVoti + '** voti.\n';
      });

      client.channels.cache.get(idVotazioni).send(`${stringaVoti}`);

      messageReactionRogo.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

      /*while(rogo.length < 1) {
        findMax(raccoltaVoti)
      }*/

      if(rogo.length > 1)
        client.channels.cache.get(idVotazioni).send(`Il villaggio non ha trovato accordo.`);
      else
        client.channels.cache.get(idVotazioni).send(`Al rogo ci va **${rogo[0]}**`);

      arrayVotanti.splice(0, arrayVotanti.length);
      rogo.splice(0, rogo.length)
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
    var idCanaleGenerale = client.guilds.cache.get('774369837727350844').channels.cache.get('774369837727350846')

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
      pollBallottaggio(idCanaleVotazioni, idCanaleGenerale, client);
      }).catch((error) => {
      console.log(error);
    });
  }
}
