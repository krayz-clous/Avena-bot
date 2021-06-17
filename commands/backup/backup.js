const { MessageEmbed, Client, Util, Message } = require("discord.js");
const fs = require("fs");
const hastebins = require("hastebin-gen");
const { prefix, color } = require("../../config.json");

var backups = JSON.parse(fs.readFileSync("./data/backups.json", "utf8"));

module.exports = {
  name: "backup",
  aliases: [""],
  run: async (client, message, args) => {
    const cmd = args.shift().toLowerCase();
    let word = args.join(" ");
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
      .setColor(color);
    if (message.channel.type === "dm")
      return message.channel.send(guildsonlyEmbed);
      if(cmd === "create") {
        await   message.guild.roles.cache.filter(r => r.name !== message.guild.member(client.user.id).roles.highest.name).forEach(r => {
               if (r.comparePositionTo(message.guild.member(client.user.id).roles.highest) > 0){
                   let havnthighest = new MessageEmbed()
                       .setTitle(`${warning}  Warning`)
                       .setDescription(`My Role Is Not The Highest Role In The Server , This May Cause Some Errors When Loading The Backup. !`)
                       .setColor(color)
                   message.channel.send(havnthighest) 
               }
           })

           

           let creatingEmbed = new MessageEmbed()
           .setTitle(`${waiting}  Please wait ...`)
           .setDescription("Creating backup ... Please wait")
           message.channel.send(creatingEmbed).then(m => {

           let id = makeid(16)

               const channels = message.guild.channels.cache.sort(function (a, b) { return a.position - b.position; }).array().map(c => {
               const channel = {
                   type: c.type,
                   name: c.name,
                   postion: c.calculatedPosition
               }
               if (c.parent) channel.parent = c.parent.name
               return channel;
           });

 
       
               const roles = message.guild.roles.cache.filter(r => r.name !== "@everyone").sort(function (a, b) { return a.position - b.position; }).array().map(r => {
               const role = {
                   name: r.name,
                   color: r.color,
                   hoist: r.hoist,
                   permissions: r.permissions,
                   mentionable: r.mentionable,
                   position: r.position
               }
               return role;
           });

           if(!backups[message.author.id]) backups[message.author.id] = {}
           backups[message.author.id][id] = {
               icon: message.guild.iconURL,
               name: message.guild.name,
               owner: message.guild.ownerID,
               members: message.guild.memberCount,
               createdAt: message.guild.createdAt,
               roles,
               channels
           }
           
       save();
           let result = new MessageEmbed()
           .setTitle(`${info}  Info`)
           .setDescription(`Created backup of **${message.guild.name}** with the Backup id \`${id}\``)
           .addField("Usage", `\`\`\`${prefix}backup load ${id}\`\`\`
\`\`\`${prefix}backup info ${id}\`\`\``)
           .setColor(color)

       message.author.send(result)

       let resultPublic = new MessageEmbed()
       .setTitle(`${green} Created!`)
       .setDescription(`Created backup of **${message.guild.name}** with the Backup id \`${id}\``)
       .addField("Usage", `\`\`\`${prefix}backup load ${id}\`\`\`
\`\`\`${prefix}backup info ${id}\`\`\``)
       .setColor(color)

   m.edit(resultPublic)
       
         })
       }
       if(cmd === "delete") {
        let code = word;
        let errorEmbed = new MessageEmbed()
        .setTitle(`${error}  Error`)
        .setDescription(`You forgot to define the argument backup_id or incorrect. Use ${prefix}help backup load for more information.`)
        .setColor(color)
        if(!code) return message.channel.send(errorEmbed)

        let cantfindbackup = new MessageEmbed()
        .setTitle(`${error}  Error`)
        .setTitle(`You have no backup with the id ${code}.`)
        .setDescription(`Need Help? Join Our Support Server [Click Here](https://discord.gg/cFk7VsfkZS)`)
        .setColor(color)
        if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)

        delete backups[message.author.id][code];
        save();

        let deletedsuc = new MessageEmbed()
            .setTitle(`${green} Deleted!`)
            .setDescription(`Successfully **deleted backup**.`)
            .setColor(color)
            message.channel.send(deletedsuc)

    }
    if(cmd === "load") {
      let error = "❌"
      let code = word;
      let errorEmbed = new MessageEmbed()
      .setTitle(`${error}  Error`)
      .setDescription(`You forgot to define the argument backup_id. Use ${prefix}help backup load for more information.`)
      if(!code) return message.channel.send(errorEmbed)
      let cantfindbackup = new MessageEmbed()
      .setTitle(`${error}  Error`)
      .setTitle(`You have no backup with the id ${code}.`)
      .setDescription("[Support](https://discord.gg/cFk7VsfkZS)")
      .setColor(color)
      if(!backups[message.author.id][code]) return message.channel.send(cantfindbackup)
      
      message.guild.channels.cache.forEach(channel => {
          channel.delete('For Loading A Backup')
      })

      message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach(role => {
          role.delete('For Loading A Backup')
      })
      await backups[message.author.id][code].roles.forEach(async function (role) {
                message.guild.roles.create({ name: role.name, color: role.color, permissions: role.permissions, hoist: role.hoist, mentionable: role.mentionable, position: role.position }).then(role => {
                  role.setPosition(role.position)
              })
      
      });

     await backups[message.author.id][code].channels.filter(c => c.type === "category").forEach(async function (ch)  {
              message.guild.channels.create(ch.name, ch.type, ch.permissionOverwrites)
      }); 

     await backups[message.author.id][code].channels.filter(c => c.type !== "category").forEach(async function(ch) {
              message.guild.channels.create(ch.name, ch.type, ch.permissionOverwrites).then(c => {
                  const parent = message.guild.channels.cache.filter(c => c.type === 'category').find(c => c.name === ch.parent);
                  ch.parent ? c.setParent(parent) : '';
              });
      });
       message.guild.setName(backups[message.author.id][code].name)
       message.guild.setIcon(backups[message.author.id][code].icon)

  }

    if (!args[0]) {
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
        .setColor(color);
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
        "./data/backups.json",
        JSON.stringify(backups),
        (err) => {
          if (err) console.error(err);
        }
      );
    }
  },
};
