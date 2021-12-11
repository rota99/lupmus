module.exports = {
  name: "ruolo",
  description: "Comando per dare il ruolo alla persona dal canale usando la menzione",

 execute(members, message, args, client) {
    const idDiscussione = '774710293363949618';
    var nomeCanale = "774698691105783819";
    var user = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    var ruolo = user._roles;

      user.roles.add(nomeCanale);
      let role = message.guild.roles.cache.find(r => r.id === nomeCanale);

      setTimeout(function()
        {
          message.channel.send(`**${user.displayName}** ora sei **${role.name}**, vedi di farti valere.`)

        }, 500);


  }
}
