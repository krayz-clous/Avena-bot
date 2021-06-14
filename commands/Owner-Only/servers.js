const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guilds',
    aliases: ['servers'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '846637454945419264') return;
        message.channel.send(`Hello, Im in ${client.guilds.cache.size} servers`)
    },
};