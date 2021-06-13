module.exports = {
    name: "backup-purge",
    aliases: [""],
    run: async (client, message, args) => {
        let errorEmbed = new MessageEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `You did'nt backup any server yet`
          )
          .setColor("#a11616");
        if (!backups[message.author.id]) return message.channel.send(errorEmbed);
  
        let warningEmbed = new MessageEmbed().setTitle(`${warning}  Warning`)
          .setDescription(`Are you sure that you want to delete all your backups?
  __This cannot be undone!__`);
        message.channel.sendEmbed(warningEmbed).then((msg) => {
          msg.react("✅").then(() => msg.react("❌"));
  
          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === message.author.id;
  
          let yes = msg.createReactionCollector(yesFilter, { time: 0 });
          let no = msg.createReactionCollector(noFilter, { time: 0 });
  
          yes.on("collect", (r) => {
            delete backups[message.author.id];
  
            let deletedsuc = new MessageEmbed()
              .setTitle(`${green}  Voila!`)
              .setDescription(`Deleted all your backups.`)
              .setColor("#59C57B");
            message.channel.send(deletedsuc);
            msg.delete();
          });
  
          no.on("collect", (r) => {
            msg.delete();
          });
        });
      }
}