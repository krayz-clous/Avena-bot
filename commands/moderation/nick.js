const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const limit = require("@codedipper/random-code")
        module.exports = {
            name: 'nickname',
            aliases: ["nn", "nname"],
            description: "Moderate nickname",
            usage: "<prefix>nickname <user> <new nickname> ",
            /**
           * @param {Client} client
           * @param {Message} message
           * @param {String[]} args
           */
          run: async (client, message, args ) => {
        if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(
          new MessageEmbed()
          .setDescription(":x: You do not have permission to use this command")
          .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({dynamic: true})))
        
       if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(
         new MessageEmbed()
         .setDescription(":x: I do not have permission to use this command")
         .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
       )
              let member = message.mentions.members.first()
              if (!member) return message.channel.send(
                new MessageEmbed()
                .setDescription(":x: Please specify a member")
                .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
              )

              if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't do this, try to put my role higher")
let random = limit(4);
      member.setNickname(`Moderated Nickname ${random}`)


     const yess = new MessageEmbed()
        
        .setDescription(`:white_check_mark:  ${member.user.tag}'s Nickname has Been Moderated`)
        .setColor("GREEN")
        message.channel.send(yess)
    }
}