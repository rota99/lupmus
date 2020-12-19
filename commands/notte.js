const idNarratore = "774699081620521000";

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

  execute(members, message, args) {
    message.channel.send('bnotte guys');
    mute(members)
  }
}
