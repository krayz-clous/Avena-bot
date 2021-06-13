const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    aliases: ["v", "vo"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
          new MessageEmbed()
          .setTitle('Vote for Avena!')
          .addField(`Discord Bots List`, `[Click Here](https://disbotlist.xyz/bot/853225627926003732/vote)`)
          .addField(`Void Bots`, `Coming Soon`)
          .setColor('RANDOM')
        )
    },
};