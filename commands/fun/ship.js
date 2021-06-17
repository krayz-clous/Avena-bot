const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ship',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first()
        let Random = Math.floor(Math.random() * 100) + 1

        if(!user) return message.channel.send(`Please tell me the user whom you want to ship! UwU`)
        if(user === message.author) return message.channel.send("You cannot ship yourself")
        const lovelyan = new MessageEmbed()
        .setTitle(`They both are born for each other ♥`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/824893988384407592/828591233218904104/iu.png`)
        .setDescription(`${message.author.id} was shipped with <@!800584400424271902> and the percentage was 100% 😄`)
        .setColor('GREEN')
        
        const unloveEmbed = new MessageEmbed()
        .setTitle(`Looks like it isn't a great match for both of them 💔`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/824893988384407592/828590284907872256/iu.png`)
        .setDescription(`${message.author} was shipped with ${user} and the percentage was ${Random}% :sob:`)
        .setColor("RED")

        const loveEmbed = new MessageEmbed()
        .setTitle(`They both are born for each other ♥`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/824893988384407592/828591233218904104/iu.png`)
        .setDescription(`${message.author} was shipped with ${user} and the percentage was ${Random}% 😄`)
        .setColor('GREEN')
        if (message.content.startsWith("ship<:spacer:854978590235164693>").then(message.channel.send(loveLyan))); 
        if(Random > 50) {
            message.channel.send(loveEmbed)
        } else {
            message.channel.send(unloveEmbed)
        } 
    }
}