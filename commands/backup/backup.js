const { MessageEmbed, Client, Util, Message } = require("discord.js");
const fs = require("fs");
const hastebins = require("hastebin-gen");
const { prefix } = require("../../config.json");

var backups = JSON.parse(fs.readFileSync("./database/backups.json", "utf8"));

module.exports = {
  name: "backup",
  aliases: [""],
  run: async (client, message, args) => {
    let info = "ℹ️"; 
    let waiting = "⌛"; 
    let green = "✅"; 
    let error = "❌";
    let warning = "⚠️";

    let guildsonlyEmbed = new MessageEmbed()
      .setTitle(`${error} Error`)
      .setDescription(
        `This command **can't be used** in **private** messages`
      )
      .setColor("#a11616");
    if (message.channel.type === "dm")
      return message.channel.send(guildsonlyEmbed);


    if (!args[1]) {
      const embed = new MessageEmbed()
        .setTitle(
          `**Backup Commands**
    Create & load backups of your servers
    __**Commands**__
`
        )
        .setDescription(
          `
                ${prefix}backup create        Create a backup
                ${prefix}backup delete        Delete one of your backups
                ${prefix}backup info          Get information about a backup
                ${prefix}backup list          Get a list of your backups
                ${prefix}backup load          Load a backup
                ${prefix}backup purge         Delete all your backups`
        )
        .setFooter(
          `Use \`${prefix}help [command]\` for more info on a command.`
        )
        .setColor("#5DBCD2");
      message.channel.send(embed);
      return;
    }

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    function save() {
      fs.writeFile(
        "./database/backups.json",
        JSON.stringify(backups),
        (err) => {
          if (err) console.error(err);
        }
      );
    }
  },
};
