const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    hidden: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id != "846637454945419264") return;

        message.reply("test command working hypster", { allowedMentions: 
            { 
                repliedUsers: false 
            }})
    }
}