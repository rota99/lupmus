const idNarratore = "774699081620521000";
const idDiscussione = '774710293363949618';
var turni = 0;

const mute = (members) => {
  members.forEach(member => {
    if (!member._roles.includes(idNarratore)) {
      member.voice.setMute(true);
    }
  });
};

module.exports = {
  name: 'n',
  description: 'Comando per avviare la fase del gioco notte.',

  execute(client, message, args) {
    if (turni == 0){
      message.channel.messages.fetch({ limit: 1 }).then(messages => {
      message.channel.bulkDelete(messages);
      });
      members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
      message.channel.send('bnotte guys');
      mute(members)
      turni++;
    }
    else {
      message.channel.messages.fetch({ limit: 2 }).then(messages => {
      message.channel.bulkDelete(messages);
      });
      members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
      message.channel.send('bnotte guys');
      mute(members)
    }
  }
}
