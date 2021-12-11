const idNarratore = "774699081620521000";
const idDiscussione = '774710293363949618';
const idRisultati = '788492260722343957';
const idVotazioni = '788491738578288651';
const idPartita = '794982586434060298';

const unmute = (members) => {
  members.forEach(member => {
    if (!member._roles.includes(idNarratore)) {
      member.voice.setMute(false);
    }
  });
};

const cancella = (client) => {
  client.channels.cache.get(idVotazioni).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
  client.channels.cache.get(idVotazioni).bulkDelete(messages);
  });
  client.channels.cache.get(idRisultati).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
  client.channels.cache.get(idRisultati).bulkDelete(messages);
  });
  client.channels.cache.get(idPartita).messages.fetch({ limit: 50 }).then(messages => { // Fetches the messages
  client.channels.cache.get(idPartita).bulkDelete(messages);
  });
};

module.exports = {
  name: 'f',
  description: 'Comando per finire la partita',

  execute(client, message, args) {
    var members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    var giocatori = message.channel.members.filter(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))
    var ruoli = giocatori._roles;

      giocatori.forEach((giocatore) => {
        if(giocatore._roles.length > 0) {
          giocatore.roles.remove(giocatore._roles)
        }
      });


      unmute(members);
      cancella(client);
      message.channel.send('***La partita è basta \ncomplimenti a tutti***');
      setTimeout(() => {  cancella(client); }, 10000);
  }
}
