const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')
const WokCommands = require("wokcommands")
const Schema1 = require("../models/blacklist-word");
const {BlacklistedWords} = require("../Collection")
const fetch = require("node-fetch")
const guildId = '849318727006158908'
client.on('ready', () =>{
  fetch(`https://api.voidbots.net/bot/stats/853225627926003732`, {
    method: "POST",
    headers: { 
      Authorization: "VOID_VIKtXJfDbLn9NMWuEurNLL4OZ0pZYcUBOvGnvbRkQIzp0kK7",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"server_count": `${client.guilds.cache.size}`, "shard_count": 0 })
  }).then(response => response.text())
.then(console.log).catch(console.error);
  new WokCommands(client, {
    commandsDir: 'command',
    testServers : [guildId],
    showWarns: false
  })

    console.log(`${client.user.username} ✅ OP`)

    Schema1.find()
    .then((data) => {
      data.forEach((val) => {
        BlacklistedWords.set(val.Guild, val.Words)
      })
    })

    client.user.setPresence({
      status: 'online',
      activity: {
          name: ";help",
          type: 'WATCHING',    
      }

    
  })

});
