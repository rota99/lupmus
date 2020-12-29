/*
//!tempmute @user 1s/m/h/d
let tomute = message.guild.member(message.mentions.users.first() ||
message.guild.members.get(args[0]));   if(!tomute) return
message.reply("Couldn't find user.");
if(tomute.hasPermission("MANAGE_MESSAGES")) return
message.reply("Can't mute them!");   let muterole =
message.guild.roles.find(muterole => muterole.name === "muted");
//start of create role   if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }   }   //end of create role   let mutetime = args[1];   if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));   message.reply(`<@${tomute.id}>
has been muted for ${message(message(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);   }, message (mutetime));

//end of module }

module.exports.help = {   name: "tempmute" }
*/

module.exports = {
  name: "ruolo",
  description: "Comando per darmi il ruolo narratore quando jacopo si dimentica.",

  execute(members, message, args) {
    var role = message.guild.roles.cache.find(role => role.name === "Bot");

    member = message.guild.members.cache.find(member => member.user.username === "Wherewolf")
    if (member.hasPermission('ADMINISTRATOR')) {
      var rota = message.guild.members.cache.find(member => member.user.username === "rota")
      rota.roles.remove(role)
    	console.log("ce l'ha");
    }
    else
      console.log("non ce l'ha")
  }
}
