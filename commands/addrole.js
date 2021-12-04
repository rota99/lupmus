const idDiscussione = '774710293363949618';

const idNarratore = "774699081620521000";
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';

module.exports = {
  name: 'ruolo',
  description: 'Comando per dare un ruolo alla persona menzionata nel canale.',

  execute(client, message, args, members) {
    const giocatore = message.mention.user.first()
    if(!giocatore) {
      message.channel.send("Senti scemo ho poco tempo, dimmi a chi devo dare questo ruolo, altrimenti...")
      return;
    }
    args.shift()

  }
}
