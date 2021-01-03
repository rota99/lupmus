const Discord = require("discord.js");
const dataservice = require("./function.js")
const config = require("./config.json");
const client = new Discord.Client();
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

    case "a":

      client.commands.get('a').execute(client, message, args);

      break;

    case "c":

      client.commands.get('c').execute(message, args, client)

      break;

    case "d":

      client.commands.get('d').execute(message, args, command);

      break;

    case "f":

      client.commands.get('f').execute(client, message, args);

      break;

    case "g":

      client.commands.get('g').execute(message, args, client)

      break;

    case "n":

      client.commands.get('n').execute(client, message, args);

      break;

    case "r":

      client.commands.get('r').execute(message, args);

      break;

    case "s":

      client.commands.get('s').execute(client, message, args);

      break;

    case "t":

      client.commands.get('t').execute(message, args, client)

      break;

    case "v":

        client.commands.get('v').execute(members, message, args, client)

        break;

    default:

      message.channel.send('svejate fora');

      break;

  }
});


client.login(config.BOT_TOKEN);
