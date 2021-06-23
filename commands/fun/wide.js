const Discord = require('discord.js')
module.exports = {
  name: 'wide',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client , message , args) {
 const user = message.mentions.users.first() || message.author;
 const avatar = user.displayAvatarURL({ dynamic: false, format: "png" })
 const img = `https://api.popcatdev.repl.co/wide?image=${avatar}`;
 const image = new Discord.MessageAttachment(img, `wide_${user.username}.png`)
 message.channel.send(image)
  }
}