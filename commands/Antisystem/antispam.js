const discord = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_BOT)

module.exports = {
name: 'anti-spam',
aliases: ['antispam'],
usage: '',
description: 'Anti-spam and mute user',
run: async (client, message, args) => {
    if(!args[0]) return message.channel.send("Pls choose option on/off")
    if(args[0] === 'on') {
        await db.set(`antispam-${message.guild.id}`, true)
        message.channel.send("Turned on anti-spam feature")
    } else if(args[0] === 'off') {
        await db.delete(`antispam-${message.guild.id}`)
        message.channel.send("Turned off anti-spam feature")
    }

},
};