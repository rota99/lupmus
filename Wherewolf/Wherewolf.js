const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const dataservice = require("./function.js")
const prefix = ".";

client.on('ready', () => {
  console.log(`Bro, io sottoscritto ${client.user.tag} sono pronto`);
});


client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

    const channel = message.channel
    const members = channel.members

      const fasi = message.content.slice(prefix.length).split(' ').shift().toLowerCase();
        switch (fasi) {

          case "clear":

            dataservice.clear(message, args)

            break;

          case "notte":

            dataservice.mute(members, message)

            break;

          case "accuse":

            dataservice.unmute(members, message)
            dataservice.timerAccuse(message)

            break;

          case "rogo":

            dataservice.timerRogo(message)

            break;

          default:

          message.channel.send('svejate fora');

          break;

          }
});


client.login(config.BOT_TOKEN);
