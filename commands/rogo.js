let intervallo = null;
var c = null;

const timer = (message) => {
  message.channel.messages.fetch({ limit: 3 }).then(messages => {
    message.channel.bulkDelete(messages);
  });

  if (isNaN(c) && c != 's') return message.channel.send('Fratm non capisco il numero, quindi, o sono scemo, o te lo sei dimenticato'); // Checks if the `amount` parameter is a number. If not, the command throws an error

  message.channel.send(`**Avanti il ${c}°**`)
  c--;
  var minuti = function(){
    if(c > 0) {
      message.channel.send(`**Avanti il ${c}°**`)
      message.channel.messages.fetch({ limit: 1 }).then(messages => {
        message.channel.bulkDelete(messages);
      });
      c--;
    }
    else {
      message.channel.messages.fetch({ limit: 2 }).then(messages => {
        message.channel.bulkDelete(messages);
      });
      message.channel.send("**È ora di decidere chi rogare**");
      clearInterval(intervallo);
    }
  };
  intervallo = setInterval(minuti, 60000);
};

module.exports = {
  name: 'r',
  description: 'Comando per avviare la fase delle difese e il voto.',

  execute(message, args) {
    clearInterval(intervallo);
    c = message.content.substr(message.content.indexOf(' ')+1, message.content.lenght);
    if (c == 's') {
      message.channel.send("**È ora di decidere chi rogare**");
      clearInterval(intervallo);
      message.channel.messages.fetch({ limit: 10 }).then(messages => {
        message.channel.bulkDelete(messages);
      });
      return;
    }
    else {
      if(c == 1) {
        message.channel.send(`Deve difendersi ancora **${c} persona**, hai un minuto`)
        timer(message);
      }
      else {
        message.channel.send(`Devono difendersi ancora **${c} persone**, avete un minuto a testa`)
        timer(message);
      }
    }
  }
}
