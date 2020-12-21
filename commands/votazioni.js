/*const channels = ['788491738578288651']

module.exports = {
  name: "votazioni",
  description: "comando per generare una votazione",

  execute(client, message) {
    client.on('message', (message) => {
      const { channel, content } = message

      if (!channels.includes(channel.id)) {
        return
      }

      const eachLine = content.split('\n')

      for (const line of eachLine) {
        if (line.includes('=')) {
          const split = line.split('=')
          const emoji = split[0].trim()
          message.react(emoji)
        }
      }
    })
  }
}*/
const idNarratore = "774699081620521000";
const idMorto = '780154332934438942';
const idBot1 = '788498166847766571';
const idBot2= '787753336169299998';

const conta = (members) => {
  var i = -1;
  members.forEach(member => {
    if (member._roles.includes(idNarratore) || member._roles.includes(idMorto) || member._roles.includes(idBot1) || member._roles.includes(idBot2) || member._roles.length == 0) {
      i++
    }
  });
  return i;
}

module.exports = {
  name:"v",
  description:"comando per votare",

  async execute(members, message, args, client) {
    var numero = client.guilds.cache.get('774369837727350844').channels.cache.get('774710293363949618').members.size
    
    const promiseConta = new Promise((resolve, reject) => {
      if(conta(members) >= 0) {
        resolve(conta(members))
      } else {
        reject("Conta è < 0.")
      }
    });

    promiseConta.then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
    /*var votanti = numero - await conta(members)
    message.channel.send(numero + '-' + await conta(members) + '=' + votanti)*/
  }
}
