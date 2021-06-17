const { MessageEmbed, Client, Util, Message } = require("discord.js");
const fs = require("fs");
const hastebins = require("hastebin-gen");
const { prefix, color } = require("../../config.json");

var backups = JSON.parse(fs.readFileSync("./data/backups.json", "utf8"));

module.exports = {
  name: "backup-load",
  aliases: [""],
  run: async (client, message, args) => {
    let info = "ℹ️"; 
    let waiting = "⌛"; 
    let green = "✅"; 
    let error = "❌";
    let warning = "⚠️";
    const cmd = args.shift().toLowerCase();
  }
}