module.exports = {
  name: "c",
  description: "Comando per riconoscere far riconoscere i criminali",

  execute(message, args, client) {
    const idDiscussione = '774710293363949618';
    var numeroCriminali = 0;
    members = client.guilds.cache.get('774369837727350844').channels.cache.get(idDiscussione).members;
    const promiseCriminali = new Promise((resolve) => {
      var criminali = [];
      const ruoliCriminali = ["786684300175212595", "787045347167305768", "787045379551526923", "787045304687525888"]
      members.forEach((member) => {
        ruoliCriminali.forEach((criminale) => {
          if(member._roles.includes(criminale)) {
            numeroCriminali++;
            criminali.push(member.user.username)
          }
        });
      });
      resolve(criminali);
    });

    promiseCriminali.then((data) => {
      var criminale = message.guild.members.cache.find(member => member._roles.includes("786684300175212595" || "787045347167305768" || "787045379551526923" || "787045304687525888"))
      if(numeroCriminali == 1)
        message.channel.send(`Il criminale in gioco è: \n**${data}**`)
      else
        message.channel.send(`I criminali in gioco sono: \n**${data.join('**, **')}**`)
    });
  }
}
