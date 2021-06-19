const Discord = require('discord.js');
const pagination = require('discord.js-pagination')
const { setSizeDependencies } = require('mathjs')

module.exports = {
name: 'helptets',
aliases: ['hep'],
usage: '',
description: '',
run: async (client, message, args) => {

    const page1 = new Discord.MessageEmbed()
    .setTitle("test")
    .setDescription('This is help category list')
    .addField("1/7 Pages")

    const page2 = new Discord.MessageEmbed()
    .setTitle("test2")
    .setDescription('This is Anti Alt category')
    .addField("2/7 Pages")

    const page3 = new Discord.MessageEmbed()
    .setTitle("test3")
    .setDescription('This is Anti Swear category')
    .addField("3/7 Pages")

    const pages = [
        page1,
        page2,
        page3
    ]
    const emoji = [
        "⬅",
        "➡"
    ]
    const timeout = "20000"

    pagination(message, pages, emoji, timeout)

},
};