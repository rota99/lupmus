const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const dataservice = require("./function.js")
const prefix = ".";

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Bro, io sottoscritto ${client.user.tag} sono pronto`);
});


client.on("message", message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  const channel = message.channel
  const members = channel.members

  switch (command) {

    case "clear":

      client.commands.get('clear').execute(message, args);

      break;

    case "notte":

      client.commands.get('notte').execute(members, message, args);

      break;

    case "accuse":

      client.commands.get('accuse').execute(members, message, args);

      break;

    case "rogo":

      client.commands.get('accuse').execute(message, args);

      break;

    default:

      message.channel.send('svejate fora');

      break;

  }
});


client.login(config.BOT_TOKEN);
