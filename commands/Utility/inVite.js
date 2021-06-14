const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'invite',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const inviteemebd = new MessageEmbed()
    .setTitle('Invite me')
    .setDescription(`[Click here!](https://discord.com/api/oauth2/authorize?client_id=853225627926003732&permissions=8&scope=bot%20applications.commands)`)
    .setColor('RANDOM')
    message.channel.send(inviteemebd)
  }
}