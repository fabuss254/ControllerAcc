const Discord = require("discord.js");
const request = require('request').defaults({ encoding: null });
const http = require("http");
const rbx = require('roblox-js');
const acc = JSON.parse(process.env.ACC);
var bot = new Discord.Client();
var ch = "476389923574775823";
var co = "476391476318830598";
var owner = "178131193768706048";


bot.on("ready", function(){
  bot.channels.get(ch).send("**[STATEMENT]** Restarted successfully!")
});

bot.on("message", function(message){
  if (message.author.equals(bot.user) || message.channel.id != co || message.author.id != owner) return;
    var args = message.content.split(" ");
    if (args[0].toLowerCase() == "testlogin"){
      message.channel.send("Login in...")
      var remaining = acc.length
      var Failed
      var Success
      var Now = Date.now()
      for (var i = 0, len = acc.length; i < len; i++) {
        var v = acc[i]
        rbx.login(options)
        .then(function(){
          bot.channels.get(ch).send("**[STATEMENT]** Successfully login into "+ v.username +" account")
          Success = Success + 1
        })
        .catch(function(err){
          bot.channels.get(ch).send("**[ERROR]** ERROR LOGIN INTO " + v.username + " ACCOUNT: " + err.stack);
          Failed = Failed + 1
        });
        remaining = remaining - 1
      };
      
      message.channel.send("Finished! \n```\nSuccess: "+Success || 0+"\nFailed: " + Failed || 0 + "\nRun in: " + Date.now() - Now + "\n```")
    }else if(args[0].toLowerCase() == "accounts"){
      message.channel.send("Accounts: " + acc.length)
    }else{
      message.channel.send("Invalid command.")
    }
});

bot.login(process.env.TOKEN);
console.log("Login successfully!");

bot.on("error", err => {
    console.log(err);
});
