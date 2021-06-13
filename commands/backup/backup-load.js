module.exports = {
    name: "backup-load",
    aliases: [""],
    run: async (client, message, args) => {
        let error = "❌";
        let code = args[2];
        let errorEmbed = new MessageEmbed().setTitle(`${error}  Error`)
          .setDescription(`You forgot to define the argument backup_id. Use !help backup load for more information.`);
        if (!code) return message.channel.send(errorEmbed);
        let cantfindbackup = new MessageEmbed()
          .setTitle(`${error}  Error`)
          .setTitle(`You have no backup with the id ${code}.`)
          .setDescription("")
          .setColor("#a11616");
        if (!backups[message.author.id][code])
          return message.channel.send(cantfindbackup);
  
        message.guild.channels.forEach((channel) => {
          channel.delete("For Loading A Backup");
        });
  
        message.guild.roles
          .filter((role) => role.members.every((member) => !member.user.bot))
          .forEach((role) => {
            role.delete("For Loading A Backup");
          });
        await backups[message.author.id][code].roles.forEach(async function (
          role
        ) {
          message.guild
            .createRole({
              name: role.name,
              color: role.color,
              permissions: role.permissions,
              hoist: role.hoist,
              mentionable: role.mentionable,
              position: role.position,
            })
            .then((role) => {
              role.setPosition(role.position);
            });
        });
  
        await backups[message.author.id][code].channels
          .filter((c) => c.type === "category")
          .forEach(async function (ch) {
            message.guild.createChannel(
              ch.name,
              ch.type,
              ch.permissionOverwrites
            );
          });
  
        await backups[message.author.id][code].channels
          .filter((c) => c.type !== "category")
          .forEach(async function (ch) {
            message.guild
              .createChannel(ch.name, ch.type, ch.permissionOverwrites)
              .then((c) => {
                const parent = message.guild.channels
                  .filter((c) => c.type === "category")
                  .find((c) => c.name === ch.parent);
                ch.parent ? c.setParent(parent) : "";
              });
          });
        message.guild.setName(backups[message.author.id][code].name);
        message.guild.setIcon(backups[message.author.id][code].icon);
    }
}