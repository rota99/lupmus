const Discord = require("discord.js");
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Bro, io sottoscritto ${client.user.tag} sono pronto`);
});

client.on("message", function(message) {

    if (message.content.startsWith('start')) {
      // Filters define what kinds of messages should be collected
      let filter = (message) => !message.author.bot;
      // Options define how long the collector should remain open
      //    or the max number of messages it will collect
      let options = {
        max: 3,
        time: 15000
      };
      let collector = message.channel.createMessageCollector(filter, options);

      // The 'collect' event will fire whenever the collector receives input
      collector.on('collect', (m) => {
        console.log(`Collected ${m.content}`);
      });

      // The 'end' event will fire when the collector is finished.
      collector.on('end', (collected) => {
        console.log(`Collected ${collected.size} items`);
      });

      message.reply('What is your favorite color?');
    }
});

client.login("Nzg4NDk1MDI0MjQwNDU5ODA2.X9kVNw.MRytYUYLSzdzavannXfkllHSEFw") // Replace XXXXX with your bot token
