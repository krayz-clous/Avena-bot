
module.exports = {
    name: "backup-create",
    aliases: [""],
    run: async (client, message, args) => {
        await message.guild.roles
          .filter(
            (r) =>
              r.name !== message.guild.member(client.user.id).highestRole.name
          )
          .forEach((r) => {
            if (
              r.comparePositionTo(
                message.guild.member(client.user.id).highestRole
              ) > 0
            ) {
              let havnthighest = new MessageEmbed()
                .setTitle(`${warning}  Warning`)
                .setDescription(
                  `My Role Is Not The Highest Role In The Server , This May Cause Some Errors When Loading The Backup. !`
                )
                .setColor("#a11616");
              message.channel.send(havnthighest);
            }
          });
  
        let creatingEmbed = new MessageEmbed()
          .setTitle(`${waiting}  Please wait ...`)
          .setDescription("Creating backup ... Please wait");
        message.channel.send(creatingEmbed).then((m) => {
          let id = makeid(16);
  
          const channels = message.guild.channels
            .sort(function (a, b) {
              return a.position - b.position;
            })
            .array()
            .map((c) => {
              const channel = {
                type: c.type,
                name: c.name,
                postion: c.calculatedPosition,
              };
              if (c.parent) channel.parent = c.parent.name;
              return channel;
            });
  
          const roles = message.guild.roles
            .filter((r) => r.name !== "@everyone")
            .sort(function (a, b) {
              return a.position - b.position;
            })
            .array()
            .map((r) => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position,
              };
              return role;
            });
  
          if (!backups[message.author.id]) backups[message.author.id] = {};
          backups[message.author.id][id] = {
            icon: message.guild.iconURL,
            name: message.guild.name,
            owner: message.guild.ownerID,
            members: message.guild.memberCount,
            createdAt: message.guild.createdAt,
            roles,
            channels,
          };
  
          save();
          let result = new MessageEmbed()
            .setTitle(`${info}  Info`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${id}\``
            )
            .addField(
              "Usage",
              `\`\`\`${prefix}backup load ${id}\`\`\`
  \`\`\`!backup info ${id}\`\`\``
            )
            .setColor("#5DBCD2");
  
          message.author.send(result);
  
          let resultPublic = new MessageEmbed()
            .setTitle(`${green}  Voila!`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${id}\``
            )
            .addField(
              "Usage",
              `\`\`\`${prefix}backup load ${id}\`\`\`
  \`\`\`!backup info ${id}\`\`\``
            )
            .setColor("#59C57B");
  
          m.edit(resultPublic);
        });
      }
}