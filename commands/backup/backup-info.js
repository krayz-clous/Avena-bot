module.exports = {
    name: "backup-info",
    aliases: [""],
    run: async (client, message, args) => {
            let id = args[2];
            let MissingbackupinfoEmbed = MessageEmbed()
              .setTitle(`${error}  Error`)
              .setDescription(
                `You forgot to define the argument **backup_id**. Use \`${prefix}help backup info\` for more information`
              )
              .setColor("#a11616");
            if (!id) return message.channel.send(MissingbackupinfoEmbed);
      
            let cantfindEmbed = new MessageEmbed()
              .setTitle(`${error}  Error`)
              .setDescription(`You have **no backup** with the id \`${id}\`.`)
              .setColor("#a11616");
            if (!backups[message.author.id][id])
              return message.channel.send(cantfindEmbed);
      
            try {
              let infoEmbed = new MessageEmbed()
                .setTitle(backups[message.author.id][id].name)
                .setThumbnail(backups[message.author.id][id].icon)
                .addField(
                  "Creator",
                  `<@${backups[message.author.id][id].owner}>`,
                  true
                )
                .addField("Members", backups[message.author.id][id].members, true)
                .addField("Created At", backups[message.author.id][id].createdAt)
                .addField(
                  "Channels",
                  `\`\`\`${backups[message.author.id][id].channels
                    .map((channel) => channel.name)
                    .join("\n")}\`\`\``,
                  true
                )
                .addField(
                  "Roles",
                  `\`\`\`${backups[message.author.id][id].roles
                    .map((role) => role.name)
                    .join("\n")}\`\`\``,
                  true
                );
              message.channel.send(infoEmbed);
            } catch (e) {
              hastebins(
                backups[message.author.id][id].channels
                  .map((channel) => channel.name)
                  .join("\n"),
                "txt"
              ).then((ch) => {
                hastebins(
                  backups[message.author.id][id].roles
                    .map((role) => role.name)
                    .join("\n"),
                  "txt"
                ).then((ro) => {
                  let infoEmbed = new MessageEmbed()
                    .setTitle(backups[message.author.id][id].name)
                    .setThumbnail(backups[message.author.id][id].icon)
                    .addField(
                      "Creator",
                      `<@${backups[message.author.id][id].owner}>`,
                      true
                    )
                    .addField("Members", backups[message.author.id][id].members, true)
                    .addField("Created At", backups[message.author.id][id].createdAt)
                    .addField("Channels", ch, true)
                    .addField("Roles", ro, true);
                  message.channel.send(infoEmbed);
                });
              });
            }
          
    }
}