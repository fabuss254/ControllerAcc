const Discord = require("discord.js");
const request = require('request').defaults({ encoding: null });
const http = require("http");
var bot = new Discord.Client();
var ch = "476389923574775823";
var co = "476391476318830598";
var owner = "178131193768706048";


bot.on("ready", function(){
  bot.channels.get(ch).send("Restarted successfully!")
});

bot.on("message", function(){
  if (message.author.equals(bot.user) || message.channel.id != co || message.author.id != owner) return;
    var args = message.content.split(" ");
    if (args[0].toLowerCase() == "login"){
      message.channel.send("Login in...")
    }else{
      message.channel.send("Invalid command.")
    }
});

bot.login(process.env.TOKEN);
console.log("Login successfully!");

bot.on("error", err => {
    console.log(err);
});
