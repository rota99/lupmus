const Discord = require("discord.js");
const emoji = require("./emoji.json");

const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';
const idRisultati = '788492260722343957';
const idVotazioni = '788491738578288651';
const idPartita = '794982586434060298';
const idDiscussione = '774710293363949618';
const idAngelo = "786674550116319252";
const idAmato = "796044059180793857";

var arrayVotanti = [];
var rogo = [];
var copiaRogo = [];
const ruoliCitta = ["793951580663185438", "793951637638217728", "793951741468868628"];

const pollBallottaggio = (idCanaleVotazioni, idCanaleRisultati, client, message) => {
  arrayVotanti.sort();
  var i = 0;
  var descriptionPoll = '';
  var field1 = '';
  var field2 = '';
  var voti = 0;
  var raccoltaVoti = [];
  var raccoltaReaction = [];
  var votantiEffettivi = [];
  var suicidio = 0;

  client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
  client.channels.cache.get(idRisultati).bulkDelete(messages);
  });

  arrayVotanti.forEach(votante => {
    descriptionPoll = descriptionPoll + emoji[i] + '\u2800' + votante + '\n';
    i++;
  });

  const pollEmbedBallottaggio = new Discord.MessageEmbed()
    .setColor('#607eb0')
    .setTitle('Chi volete ballottare champs?')
    .setAuthor('Ballottaggio')
    .setDescription(descriptionPoll)
	  .setImage('https://i.imgur.com/vFR9aYo.jpg');

  idCanaleVotazioni.send(pollEmbedBallottaggio).then(messageReactionBallottaggio => {
    for(var j = 0; j < arrayVotanti.length; j++) {
      messageReactionBallottaggio.react(emoji[j]);
    }

    const filter = (reaction, user) => {
      return emoji.includes(reaction.emoji.name) && arrayVotanti.includes(user.username);
    };

    // Create the collector
    const collector = messageReactionBallottaggio.createReactionCollector(filter, {
      maxUsers: arrayVotanti.length
    });

    //ogni volta che viene aggiunta una reazione
    collector.on('collect', (reaction, user) => {
      if(votantiEffettivi.includes(user)) {
        //elimino la reaction dell'utente perché ha già votato
        var userId = messageReactionBallottaggio.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

        const userReactions = messageReactionBallottaggio.reactions.cache.filter(reaction => reaction.users.cache.has(userId));

        try {
        	for (const reaction of userReactions.values()) {
        		reaction.users.remove(userId);
        	}
        } catch (error) {
        	console.error('Failed to remove reactions.');
        }
        user.send("Ti pare il caso di votare un'altra volta G?");
      }
      else if (user.username == arrayVotanti[emoji.indexOf(reaction._emoji.name)]) {
        suicidio = 1;
        client.channels.cache.get(idRisultati).send(`> **!!ATTENZIONE ${user.username} HA VOTATO PER SE STESSO!!**`);
        messageReactionBallottaggio.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        client.channels.cache.get(idVotazioni).bulkDelete(messages);
        });
        user.send("G il suicidio non è mai l'opzione giusta, bel meme comunque");
        votantiEffettivi.forEach(gente => {
          gente.send("Mi dispiace ma uno dei G ha optato per il suicidio, bisogna rivotare")
        });
        client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
          setTimeout(() => {client.channels.cache.get(idRisultati).bulkDelete(messages);}, 10000 );
        });
        setTimeout(() =>{pollBallottaggio(idCanaleVotazioni, idCanaleRisultati, client, message); }, 15000);
      }
      else {
        voti++;
        votantiEffettivi.push(user);
        var stringaMancanti = '';

        //comunico a tutti quanti hanno votato e quanti mancano
        if(arrayVotanti.length - voti == 1)
          stringaMancanti = `Manca **${arrayVotanti.length - voti}** persona.`;
        else
          stringaMancanti = `Mancano **${arrayVotanti.length - voti}** persone.`;

        //comunico al narratore chi ha votato
        client.channels.cache.get(idRisultati).send(`**${user.username}** ha votato per **${arrayVotanti[emoji.indexOf(reaction._emoji.name)]}**. ${stringaMancanti}`);

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

        //se si è al secondo/terzo/... voto allora va cancellato il messaggio che comunica quanti hanno votato e quanti rimangono per
        //mandare quello aggiornato
      }
    });

    //quando tutti hanno votato
    collector.on('end', (collected, reason) => {
      if(suicidio == 0) {
        var stringaVoti = '';

        //il numero di volte che una reaction è stata selezionata indica quante volte un giocatore è stato votato
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

        messageReactionBallottaggio.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

        raccoltaVoti.forEach(accusato => {
          var amato = 0;
          var angelo = null;
          var membriVotazioni = client.guilds.cache.get('774369837727350844').channels.cache.get(idVotazioni).members;

          if(membriVotazioni.find(m => m._roles.includes(idAngelo)) != undefined)
            angelo = membriVotazioni.find(m => m._roles.includes(idAngelo)).user.username;

          membriVotazioni.forEach(membro => {
            if(accusato.votato == membro.user.username && membro._roles.includes(idAmato) && angelo != null) {
              accusato.votato = angelo;
              amato = 1;
              return;
            }
          });

          if(amato)
            return;

        });


        while(rogo.length < 2) {
          findMax(raccoltaVoti)
          if(raccoltaVoti.length == 0)
            break;
        }

        const promiseReduce = new Promise((resolve) => {
          var unique = rogo.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
          });

          resolve(unique)
        });

        promiseReduce.then((data) => {
          const pollEmbedRisultatiBallottaggio = new Discord.MessageEmbed()
            .setColor('#607eb0')
            .setTitle('Risultati ballottaggio')
            .setDescription(`${stringaVoti} \n\nGli accusati sono **${data.join('**, **')}**`)
            .setThumbnail('https://i.imgur.com/vFR9aYo.jpg');

          idCanaleRisultati.send(pollEmbedRisultatiBallottaggio);

          //rimuovo dall'array dei vontanti le persone accusate, tranne quelle che hanno un ruolo città
          data.forEach(r => {
            var ruoliUser = client.guilds.cache.get('774369837727350844').members.cache.find(x => x.user.username == r)._roles;
            const found = ruoliCitta.some(role => ruoliUser.includes(role))

            if(!found)
              arrayVotanti.splice(arrayVotanti.indexOf(r), 1);
          });

          const filterMessaggio = message => message.content.includes('**È ora di decidere chi rogare**');
          const collectorMessaggio = message.channel.createMessageCollector(filterMessaggio, { max: 1 });

          collectorMessaggio.on('collect', message => {
            client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
            client.channels.cache.get(idVotazioni).bulkDelete(messages);
            });
          });

          collectorMessaggio.on('end', collected => {
            copiaRogo = data.slice(0, data.length);
            pollRogo(idCanaleVotazioni, idCanaleRisultati, client, message);
          });
        });
      }
    });
  });
}

const pollRogo = (idCanaleVotazioni, idCanaleRisultati, client, message) => {
  var i = 0;
  var descriptionPoll = '';
  var voti = 0;
  var raccoltaVoti = [];
  var raccoltaReaction = [];
  var arrayAccusati = copiaRogo.slice(0, copiaRogo.length);
  var votantiEffettivi = [];
  var suicidio = 0;

  rogo.splice(0, rogo.length)

  arrayAccusati.forEach(accusato => {
    descriptionPoll = descriptionPoll + emoji[i] + '\u2800' + accusato + '\n';
    i++;
  });

  const pollEmbedRogo = new Discord.MessageEmbed()
    .setColor('#f36324')
    .setTitle('Chi volete rogare champs?')
    .setAuthor('Rogo')
    .setDescription(descriptionPoll)
    .setImage('https://i.imgur.com/H3ORkU4.jpg')
    .setFooter('Ricordatevi che gli accusati non possono votare');

  idCanaleVotazioni.send(pollEmbedRogo).then(messageReactionRogo => {
    for(var j = 0; j < arrayAccusati.length; j++) {
      messageReactionRogo.react(emoji[j]);
    }

    const filter = (reaction, member) => {
      return emoji.includes(reaction.emoji.name) && arrayVotanti.includes(member.username);
    };

    // Create the collector
    const collectorRogo = messageReactionRogo.createReactionCollector(filter, {
      maxUsers: arrayVotanti.length
    });

    collectorRogo.on('collect', (reaction, user) => {
      if(votantiEffettivi.includes(user)) {
        //elimino la reaction dell'utente perché ha già votato
        var userId = messageReactionRogo.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

        const userReactions = messageReactionRogo.reactions.cache.filter(reaction => reaction.users.cache.has(userId));

        try {
        	for (const reaction of userReactions.values()) {
        		reaction.users.remove(userId);
        	}
        } catch (error) {
        	console.error('Failed to remove reactions.');
        }
        user.send("Ti pare il caso di votare un'altra volta g?");
      }
      else if (user.username == arrayAccusati[emoji.indexOf(reaction._emoji.name)]) {
        suicidio = 1;
        client.channels.cache.get(idRisultati).send(`> **!!ATTENZIONE ${user.username} HA VOTATO PER SE STESSO!!**`);
        messageReactionRogo.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        client.channels.cache.get(idVotazioni).bulkDelete(messages);
        });
        user.send("G il suicidio non è mai l'opzione giusta, bel meme comunque");
        client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
          setTimeout(() => {client.channels.cache.get(idRisultati).bulkDelete(messages);}, 2000 );
        });
        setTimeout(() =>{pollRogo(idCanaleVotazioni, idCanaleRisultati, client, message); }, 3000);
      }
      else {
        voti++;
        votantiEffettivi.push(user);
        var stringaMancanti = '';

        //comunico a tutti quanti hanno votato e quanti mancano
        if(arrayVotanti.length - voti == 1)
          stringaMancanti = `Manca **${arrayVotanti.length - voti}** persona.`;
        else
          stringaMancanti = `Mancano **${arrayVotanti.length - voti}** persone.`;

        //comunico al narratore chi ha votato
        client.channels.cache.get(idRisultati).send(`**${user.username}** ha votato per **${arrayAccusati[emoji.indexOf(reaction._emoji.name)]}**. ${stringaMancanti}`);

        //salvo la reaction che verrà poi cancellata
        raccoltaReaction.push(emoji.indexOf(reaction._emoji.name));

        //elimino la reaction dell'utente per rendere i voti anonimi
        var userId = messageReactionRogo.reactions.cache.get(reaction._emoji.name).users.cache.array()[1].id;

        const userReactions = messageReactionRogo.reactions.cache.filter(reaction => reaction.users.cache.has(userId));

        try {
        	for (const reaction of userReactions.values()) {
        		reaction.users.remove(userId);
        	}
        } catch (error) {
        	console.error('Failed to remove reactions.');
        }

        //se si è al secondo/terzo/... voto allora va cancellato il messaggio che comunica quanti hanno votato e quanti rimangono per
        //mandare quello aggiornato
      }
    });

    collectorRogo.on('end', (collected) => {
      if(suicidio == 0) {
      var stringaVoti = '';
      var stringaRisultato = '';

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

      messageReactionRogo.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

      while(rogo.length < 1) {
        findMax(raccoltaVoti)
        if(raccoltaVoti.length == 0)
          break;
      }

      if(rogo.length > 1)
        stringaRisultato = `Il villaggio non ha trovato accordo.`;
      else
        stringaRisultato = `Al rogo ci va **${rogo[0]}**`;

      const pollEmbedRisultatiRogo = new Discord.MessageEmbed()
        .setColor('#f36324')
        .setTitle('Risultati rogo')
        .setDescription(`${stringaVoti} \n\n${stringaRisultato}`)
        .setThumbnail('https://i.imgur.com/H3ORkU4.jpg');

      idCanaleRisultati.send(pollEmbedRisultatiRogo);

      arrayVotanti.splice(0, arrayVotanti.length);
      rogo.splice(0, rogo.length)

      const filterMessaggio = message => message.content.includes('bnotte guys');
      const collectorMessaggio = message.channel.createMessageCollector(filterMessaggio, { max: 1 });

      collectorMessaggio.on('collect', message => {
        client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        client.channels.cache.get(idVotazioni).bulkDelete(messages);
        });
      });

      collectorMessaggio.on('end', collected => {
        client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
        client.channels.cache.get(idRisultati).bulkDelete(messages);
        });
      });
    }
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
    var membersOnline = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    var idCanaleVotazioni = client.guilds.cache.get('774369837727350844').channels.cache.get(idVotazioni);
    var idCanaleRisultati = client.guilds.cache.get('774369837727350844').channels.cache.get(idRisultati);
    var idCanalePartita = client.guilds.cache.get('774369837727350844').channels.cache.get(idPartita);

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
      //client.channels.cache.get(idVotazioni).send(`Possono votare ${votanti} persone`);

      pollBallottaggio(idCanaleVotazioni, idCanaleRisultati, client, message);
    }).catch((error) => {
      console.log(error);
    });
  }
}
