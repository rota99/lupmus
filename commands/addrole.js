module.exports = {
  name: "ruolo",
  description: "Comando per dare il ruolo alla persona dal canale usando la menzione",

  execute(members, message, args, client) {
    var nomeCanale = message.guild.channels.cache.get(message.channel.id).name;  //trova il nome del canale su cui vienne scritto il messaggio
    var nomeRuolo = message.guild.roles.cache.find(role => role.name.replace(" ","-").toLowerCase() === nomeCanale);  //trova il ruolo che ha lo stesso nome del canale
    var giocatori = message.channel.members.filter(member => (member._roles.indexOf("774699081620521000") == -1 && member._roles.indexOf("787753336169299998") == -1))
    var user = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    /*if(message.guild.members.find(m => m.user.tag === args[0]) == undefined) {
      message.channel.send("Hai già fatto abbastanza errori nella vita, non farne un altro")
    }
    else{
      user = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    }*/
    var ruolo = user._roles;

    if(giocatori.size > 0) {
      message.channel.send("**FRATM NON CI PROVARE NON VEDI CHE C'È GIÀ UNA PERSONA IN QUESTO CANALE PER FAVORE RIPENSACI NON ROVINARE TUTTO COME HAI FATTO CON LA TUA VITA**")
      setTimeout(function() {
        message.channel.messages.fetch({ limit: 2 }).then(messages => {   //cancella il .ruolo e il messaggio di errore
          message.channel.bulkDelete(messages);
        });
      }, 5000);
    }
    else {
      user.roles.add(nomeRuolo);   //dà all'utente il ruolo con il nome specificato dalla var nomeRuolo
      let role = message.guild.roles.cache.find(r => r.id === nomeRuolo);
      setTimeout(function()
      {
        message.channel.send(`**${user.displayName}** ora sei **${nomeRuolo.name}**, vedi di farti valere.`)
        setTimeout(function() {
          message.channel.messages.fetch({ limit: 2 }).then(messages => {    //cancella il .ruolo e il messaggio d'inizio
            message.channel.bulkDelete(messages);
          });
        }, 5000);
      }, 500);
    }
  }
}
