const Discord = require("discord.js");
const emoji = require("./emoji.json");

const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const idRisultati = '788492260722343957';
const idVotazioni = '788491738578288651';

var arrayVotanti = [];
var rogo = [];
<<<<<<< HEAD
=======
var messageReaction = '';
>>>>>>> parent of cd08b36... Update votazioni.js

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

  const pollEmbedBallottaggio = new Discord.MessageEmbed()
    .setColor('#5c4545')
    .setTitle('Chi volete ballottare champs?')
    .setAuthor('Ballottaggio')
    .setDescription(descriptionPoll)
	  .setImage('https://i.imgur.com/vFR9aYo.jpg')
    .setFooter('Ricordatevi di votare solo una persona');



  idCanaleVotazioni.send(pollEmbedBallottaggio).then(messageReactionBallottaggio => {
    for(var j = 0; j < arrayVotanti.length; j++) {
      messageReactionBallottaggio.react(emoji[j]);
    }

    const filter = (reaction, user) => {
      return emoji.includes(reaction.emoji.name) && arrayVotanti.includes(user.username);
    };

    // Create the collector
    const collector = messageReactionBallottaggio.createReactionCollector(filter, {
      max: arrayVotanti.length
    });


    //ogni volta che viene aggiunta una reazione
    collector.on('collect', (reaction, user) => {
      voti++;
<<<<<<< HEAD

      //comunico a tutti quanti hanno votato e quanti mancano
      if(voti == 1 && arrayVotanti.length - voti == 1)
        messageReactionBallottaggio.channel.send(`**${voti}** persona ha votato. Manca **${arrayVotanti.length - voti}** persona.`);
      else if(voti != 1 && arrayVotanti.length - voti == 1)
        messageReactionBallottaggio.channel.send(`**${voti}** persone hanno votato. Manca **${arrayVotanti.length - voti}** persona.`);
      else if(voti == 1 && arrayVotanti.length - voti != 1)
        messageReactionBallottaggio.channel.send(`**${voti}** persona ha votato. Mancano **${arrayVotanti.length - voti}** persone.`);
      else
        messageReactionBallottaggio.channel.send(`**${voti}** persone hanno votato. Mancano **${arrayVotanti.length - voti}** persone.`);

      //comunico al narratore chi ha votato
=======
      messageReaction.channel.send(`**${voti}** persone hanno votato. Mancano **${arrayVotanti.length - voti}** persone.`)
      message.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
      message.channel.bulkDelete(messages);
      });
>>>>>>> parent of cd08b36... Update votazioni.js
      client.channels.cache.get(idRisultati).send(`**${user.username}** ha votato.`);

      //salvo la reaction che verrà poi cancellata
      raccoltaReaction.push(emoji.indexOf(reaction._emoji.name));

      //elimino la reaction dell'utente per rendere i voti anonimi
      var userId = messageReactionBallottaggio.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

      const userReactions = messageReactionBallottaggio.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
      try {
      	for (const reaction of userReactions.values()) {
      		reaction.users.remove(userId);
      	}
      } catch (error) {
      	console.error('Failed to remove reactions.');
      }
<<<<<<< HEAD

      //se si è al secondo/terzo/... voto allora va cancellato il messaggio che comunica quanti hanno votato e quanti rimangono per
      //mandare quello aggiornato
      if(voti > 1) {
        messageReactionBallottaggio.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
          messageReactionBallottaggio.channel.bulkDelete(messages);
        });
      }
=======
>>>>>>> parent of cd08b36... Update votazioni.js
    });

    //quando tutti hanno votato
    collector.on('end', (collected, reason) => {
      client.channels.cache.get(idRisultati).send(`*============================= RISULTATI =============================*`);
      var stringaVoti = '';

      //il numero di volte che una reaction è stata selezionata indica quante volte un giocatore è stato votato
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

      messageReactionBallottaggio.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));


      while(rogo.length < 2) {
        findMax(raccoltaVoti)
      }

      client.channels.cache.get(idRisultati).send(`Al rogo ci vanno **${rogo.join('**, **')}**`);

<<<<<<< HEAD
      client.channels.cache.get(idRisultati).send(`*===================================================================*`);


=======
>>>>>>> parent of cd08b36... Update votazioni.js
      rogo.forEach(r => {
        arrayVotanti.splice(arrayVotanti.indexOf(r), 1);
      });

<<<<<<< HEAD
      setTimeout(() => { pollRogo(idCanaleVotazioni, client); }, 10000);

      client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        setTimeout(() => {  client.channels.cache.get(idRisultati).bulkDelete(messages); }, 30000);
      });
=======
      pollRogo(idCanaleVotazioni);
>>>>>>> parent of cd08b36... Update votazioni.js
    });
  });
}

<<<<<<< HEAD
const pollRogo = (idCanaleVotazioni, client) => {
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
=======
const pollRogo = (idCanaleVotazioni) => {
  console.log(arrayVotanti)
>>>>>>> parent of cd08b36... Update votazioni.js
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
      client.channels.cache.get(idVotazioni).send(`Possono votare ${votanti} persone`);

      pollBallottaggio(idCanaleVotazioni, client);
    }).catch((error) => {
      console.log(error);
    });
  }
}
