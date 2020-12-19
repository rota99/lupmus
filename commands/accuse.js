const idNarratore = "774699081620521000";

const unmute = (members) => {
  members.forEach(member => {
    if (!member._roles.includes(idNarratore)) {
      member.voice.setMute(false);
    }
  });
};

const timer = (message) => {
  var intervallo = null;
  var c = message.content.substr(message.content.indexOf(' ')+1, message.content.lenght);

  if (isNaN(c)) return message.channel.send('Fratm non capisco il numero, quindi, o sono scemo, o te lo sei dimenticato'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  message.channel.send(`La discussione durerà ${c} minuti`)
  message.channel.send(`${c} minuti rimanenti`)
  c--;

  var minuti = function() {
    if(c > 0) {
      message.channel.send(`${c} minuti rimanenti`)

      message.channel.messages.fetch({ limit: 1 }).then(messages => {
        message.channel.bulkDelete(messages);
      });

      c--;
    }
    else {
      message.channel.messages.fetch({ limit: 1 }).then(messages => {
        message.channel.bulkDelete(messages);
      });

      message.channel.send("Tempo di scegliere chi andrà al rogo")

      clearInterval(intervallo);
    }
  };

  intervallo = setInterval(minuti, 5000);
};

module.exports = {
  name: 'accuse',
  description: 'Comando per avviare la fase del gioco giorno, in particolare le accuse.',

  execute(members, message, args) {
    message.channel.send('Buongiorno scimmiette, è ora di discutere');
    unmute(members);
    timer(message);
  }
}
