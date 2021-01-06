const idNarratore = "774699081620521000";
const idDiscussione = '774710293363949618';
let intervallo = null;

const unmute = (members) => {
  members.forEach(member => {
    if (!member._roles.includes(idNarratore)) {
      member.voice.setMute(false);
    }
  });
};

const timer = (message) => {
  message.channel.messages.fetch({ limit: 10 }).then(messages => {
  message.channel.bulkDelete(messages);
  });
  var c = message.content.substr(message.content.indexOf(' ')+1, message.content.lenght);

  if (isNaN(c) && c != 's') return message.channel.send('Fratm non capisco il numero, quindi, o sono scemo, o te lo sei dimenticato'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  if(c == 1) {
    message.channel.send(`La discussione durerà **${c} minuto**`)
    message.channel.send(`**${c} minuto rimanente**`)
  }
  else {
    message.channel.send(`La discussione durerà **${c} minuti**`)
    message.channel.send(`**${c} minuti rimanenti**`)
  }
  c--;

  var minuti = function() {
    if(c > 0) {
        if(c > 1) {
          message.channel.send(`**${c} minuti rimanenti**`)
            message.channel.messages.fetch({ limit: 1 }).then(messages => {
            message.channel.bulkDelete(messages);
            });
        }
        else {
          message.channel.send(`**${c} minuto rimanente**`)
            message.channel.messages.fetch({ limit: 1 }).then(messages => {
            message.channel.bulkDelete(messages);
            });
        }
      c--;
    }
    else {
      message.channel.messages.fetch({ limit: 3 }).then(messages => {
      message.channel.bulkDelete(messages);
      });

      message.channel.send("**Tempo di accusare i broskis**")

      clearInterval(intervallo);
    }
  };

  intervallo = setInterval(minuti, 60000);
};

const skip = () => {
  clearInterval(intervallo);
  return;
}

module.exports = {
  name: 'a',
  description: 'Comando per avviare la fase del gioco giorno, in particolare le accuse.',

  execute(client, message, args) {
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    if(args[0] == 's') {
      message.channel.messages.fetch({ limit: 10 }).then(messages => {
      message.channel.bulkDelete(messages);
      });
      skip();
      unmute(members);
      message.channel.send('Ok fra ma non agitarti per favorp \n**Tempo di accusare i broskis**');
    }
    else {
      message.channel.send('Buongiorno scimmiette, è ora di discutere');
      unmute(members);
      timer(message);
    }
  }
}
