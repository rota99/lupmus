const idNarratore = "774699081620521000";
const idDiscussione = '774710293363949618';
const idRisultati = '788492260722343957';
const idVotazioni = '788491738578288651';

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
};

module.exports = {
  name: 'f',
  description: 'Comando per finire la partita',

  execute(client, message, args) {
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
      unmute(members);
      cancella(client);
      message.channel.send('***La partita è basta***');
  }
}
