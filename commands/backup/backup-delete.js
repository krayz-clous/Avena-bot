module.exports = {
    name: "backup-delete",
    aliases: [""],
    run: async (client, message, args) => {
            let code = args[2];
            let errorEmbed = new MessageEmbed()
              .setTitle(`${error}  Error`)
              .setDescription(
                `You forgot to define the argument backup_id. Use !help backup load for more information.
      [Support](https://discord.io/jastinch)`
              )
              .setColor("#a11616");
            if (!code) return message.channel.send(errorEmbed);
      
            let cantfindbackup = new MessageEmbed()
              .setTitle(`${error}  Error`)
              .setTitle(`You have no backup with the id ${code}.`)
              .setDescription("")
              .setColor("#a11616");
            if (!backups[message.author.id][code])
              return message.channel.send(cantfindbackup);
      
            delete backups[message.author.id][code];
            save();
      
            let deletedsuc = new MessageEmbed()
              .setTitle(`${green}  Voila!`)
              .setDescription(`Successfully **deleted backup**.`)
              .setColor("#59C57B");
            message.channel.send(deletedsuc);
          
    }
}