module.exports = {

  intervallo: null,


  skipAccuse:function(message) {

    message.channel.send("Ok ma non agitarti per favorp")
    message.channel.send("Accuse concluse, è ora di ballottaggio")
    clearInterval(this.intervallo);

  },

  skipRogo:function(message) {


},



  clear: function(message, args) {
    const amount = args.join(' '); // Amount of messages which should be deleted

    if (!amount) return message.channel.send('Ok bro, ma quanti ne cancello?'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return message.channel.send('Bro... Quello non è un numero...'); // Checks if the `amount` parameter is a number. If not, the command throws an error

    if (amount > 100) return message.channel.send('Davvero più di 100? Suvvia, mi sembra eccessivo...'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return message.channel.send('Devo cancellarne almeno 1 però...'); // Checks if the `amount` integer is smaller than 1


    if(command ==="clear") {
      message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
        setTimeout(() => {  message.channel.bulkDelete(messages); }, 2000);
      });
    }
  },

  mute: function(members, message) {
    members.forEach(member => {
      if (!member._roles.includes("774699081620521000")) {
        member.voice.setMute(true);
      }
    });
    message.channel.send('bnotte guys');
  },

  unmute: function(members, message) {
    members.forEach(member => {
      if (!member._roles.includes("774699081620521000")) {
        member.voice.setMute(false);
      }
    });
    message.channel.send('Buongiorno scimmiette, è ora di discutere');
  },

  timerAccuse: function(message) {
    var c = message.content.substr(message.content.indexOf(' ')+1, message.content.lenght);

    if (isNaN(c)) return message.channel.send('Fratm non capisco il numero, quindi, o sono scemo, o te lo sei dimenticato'); // Checks if the `amount` parameter is a number. If not, the command throws an error

    message.channel.send(`La discussione durerà ${c} minuti`)
    message.channel.send(`${c} minuti rimanenti`)
    c--;
    var minuti = function(){
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
        clearInterval(this.intervallo);
      }
    };
    this.intervallo = setInterval(minuti, 5000);
  },

  timerRogo: function(message) {

  message.channel.send('demoghe fogooo');
  var c = message.content.substr(message.content.indexOf(' ')+1, message.content.lenght);

  if (isNaN(c)) return message.channel.send('Fratm non capisco il numero, quindi, o sono scemo, o te lo sei dimenticato'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  message.channel.send(`Al rogo andranno ${c} persone, avete un minuto a testa`)
  message.channel.send(`Avanti il ${c}°`)
  c--;
  var minuti = function(){
    if(c > 0) {
      message.channel.send(`Avanti il ${c}°`)
        message.channel.messages.fetch({ limit: 1 }).then(messages => {
        message.channel.bulkDelete(messages);
        });
      c--;
    }
    else {
      message.channel.messages.fetch({ limit: 2 }).then(messages => {
      message.channel.bulkDelete(messages);
      });
      message.channel.send("È ora di scoprire se sono stati rogati dei dudi");
      clearInterval(this.intervallo);
    }
  };
  this.intervallo = setInterval(minuti, 5000);
},

}
