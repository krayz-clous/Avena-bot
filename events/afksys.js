const client = require('../../index.js')

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
  //AFK SYSTEM 
  let afk = client.db.get(`afk_${message.guild.id}_${message.author.id}`)
   var reason;
   if(afk) {
    
   client.db.set(`afk_${message.guild.id}_${message.author.id}`,false) 
  client.db.delete(`op_${message.guild.id}_${message.author.id}`)   
  message.reply(`WELCOME BACK AFTER LONG TIME`)  
   }
    
  //IF SOMEONE MENTION AFK USER 
  if(message.mentions.users.size){
    
  let op = message.mentions.users
  
  if(op.size){
    
   let find = op.find(mentionb=> client.db.get(`op_${message.guild.id}_${mention.id}`))
   
   if(find) {
     
   afk = client.db.set(`afk_${message.guild.id}_${find.id}`,reason)  
  
  let date = client.db.get(`date_${message.guild.id}_${find.id}`)   
   date = Date.now() - date 
   
   message.channel.send(`${find.username} is currently  afk - ${reasom} ${format$({date})} ago`)
   }
    
    
    
  }
  
  
    
}
    
  });