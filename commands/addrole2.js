const idDiscussione = '774710293363949618';

const idNarratore = "774699081620521000";
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';

/*module.exports = {
  name: 'ruolo',
  description: 'Comando per dare un ruolo alla persona menzionata nel canale.',

  execute(message, args, members) {

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Senti scemo ho poco tempo, dimmi a chi devo dare questo ruolo, altrimenti...")
    let role = message.guild.roles.find(r => r.name == args [1]) || message.guild.roles.find(r => r.id == args [1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Bro il ruolo...")

    if(rMember.roles.has(role.id)) {
        return message.channel.send("Lo stambecco in questione ha già il ruolo...")
    }
    else {
        rMember.addole(Role.id).catch(e => console.log(e.message))
        message.channel.send(`${role.name} da ora sei ${rMember.displayName}, vedi di farti valere.`)
    }

  }
}*/
