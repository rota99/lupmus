const idNarratore = "774699081620521000";
const idDiscussione = '774710293363949618';
const idFazioneOmbra = '774709180073771059';
var turni = 0;

const mute = (members) => {
  members.forEach(member => {
    if (!member._roles.includes(idNarratore)) {
      member.voice.setMute(true);
    }
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('n')
		.setDescription('Comando per avviare la fase del gioco notte.'),
	async execute(client, message, args) {
		members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseTraditore = new Promise((resolve) => {
      var traditore = [];
      const idTraditore = "774684173787987978"
      members.forEach((member) => {
        if(member._roles.includes(idTraditore)) {
          traditore.push(member.user.username)
        }
      });
      resolve(traditore);
    });
    promiseTraditore.then((data) => {
      if(turni == 0) {
        message.channel.messages.fetch({ limit: 10 }).then(messages => {
          message.channel.bulkDelete(messages);
        });
        client.channels.cache.get(idFazioneOmbra).send(`Il Traditore è **${data}**.\n Ricordo che uccidendolo riconoscerà il branco ma quella notte non morirà nessuno.`)
        members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
        message.channel.send('bnotte guys');
        mute(members)
      }
      else {
        message.channel.messages.fetch({ limit: 10 }).then(messages => {
          message.channel.bulkDelete(messages);
        });
        members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
        message.channel.send('bnotte guys');
        mute(members)
      }
      turni++
    });
	}/*, 
  name: 'n',
  description: 'Comando per avviare la fase del gioco notte.',

  execute(client, message, args) {
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseTraditore = new Promise((resolve) => {
      var traditore = [];
      const idTraditore = "774684173787987978"
      members.forEach((member) => {
        if(member._roles.includes(idTraditore)) {
          traditore.push(member.user.username)
        }
      });
      resolve(traditore);
    });
    promiseTraditore.then((data) => {
      if(turni == 0) {
        message.channel.messages.fetch({ limit: 10 }).then(messages => {
          message.channel.bulkDelete(messages);
        });
        client.channels.cache.get(idFazioneOmbra).send(`Il Traditore è **${data}**.\n Ricordo che uccidendolo riconoscerà il branco ma quella notte non morirà nessuno.`)
        members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
        message.channel.send('bnotte guys');
        mute(members)
      }
      else {
        message.channel.messages.fetch({ limit: 10 }).then(messages => {
          message.channel.bulkDelete(messages);
        });
        members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
        message.channel.send('bnotte guys');
        mute(members)
      }
      turni++
    });
  }*/
}
