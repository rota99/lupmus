require('dotenv').config(); //initialize dotenv
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { Collection } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

/*
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

    case "a": //accuse

      client.commands.get('a').execute(client, message, args)

      break;

    case "ac": //angelo custode

      client.commands.get('ac').execute(message, args, client)

      break;

    case "c": //criminali

      client.commands.get('c').execute(message, args, client)

      break;

    case "d": //delete

      client.commands.get('d').execute(message, args, command);

      break;

    case "f": //fine

      client.commands.get('f').execute(client, message, args);

      break;

    case "g": //guardie

      client.commands.get('g').execute(message, args, client)

      break;

    case "gr": //giulietta

      client.commands.get('gr').execute(message, args, client)

      break;

    case "m": //morto

      client.commands.get('m').execute(members, message, args, client)

      break;

    case "n": //notte

      client.commands.get('n').execute(client, message, args);

      break;

    case "r": //rogo

      client.commands.get('r').execute(message, args);

      break;

    case "ruolo": //ruolo

      client.commands.get('ruolo').execute(client, message, args, members);

      break;

    case "t": //traditore

      client.commands.get('t').execute(message, args, client)

      break;

    case "v": //votazioni

        client.commands.get('v').execute(members, message, args, client)

        break;

    default:

      message.channel.send('svejate fora');

      break;

  }
});
*/

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
