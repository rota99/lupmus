const timer = (message) => {
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
};

module.exports = {
  name: 'rogo',
  description: 'Comando per avviare la fase delle difese e il voto.',

  execute(message, args) {
    message.channel.send('demoghe fogooo');
    timer(message);
  }
}
