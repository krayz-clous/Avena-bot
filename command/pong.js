const { MessageEmbed } = require("discord.js")
const client = require("../index")
const { color } = require("../config.json")

module.exports = {
    slash: true,
    testOnly: true,
    description: "Invite your bot to your server",
    callback: ({  }) => {
        let embed = new MessageEmbed()
        .setTitle("\*\*Invite me to your server now\*\*")
        .addField(`[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`)
        .setColor(color)
        .setTimestamp()

        return embed
    }
}