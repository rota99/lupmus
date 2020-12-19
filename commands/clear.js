module.exports => {
  name: 'clear',
  description: 'Comando per cancellare un certo numero di messaggi.',

  execute(message, args) {
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
  }
}
