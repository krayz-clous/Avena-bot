const {
    Client,
    Message,
    MessageEmbed,
    MessageAttachment,
  } = require("discord.js");
  const fetch = require("node-fetch");
  module.exports = {
    name: "drake",
    description: "Drake meme",
    usage: "drake <Text1> <Text2>",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const split = args.join(" ").split("/")
      const t1 = split[0];
      const t2 = split[1];
      if(!t1 || !t2) return message.reply("You need 2 sentences separated with `/` for this to work.")
      const res = await fetch(
        `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${t1}&text2=${t2}`,
        {}
      );
      let i = await res.buffer();
      const drake = new MessageAttachment(i);
      message.channel.send(drake);
    },
  };