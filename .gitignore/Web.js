const Discord = require("discord.js");
const request = require('request').defaults({ encoding: null });
const http = require("http");
var bot = new Discord.Client();
var ch = "476389923574775823";


bot.on("ready", function(){
  bot.channels.get(ch).send("Restarted successfully!")
});

bot.login(process.env.TOKEN);
console.log("Login successfully!");

bot.on("error", err => {
    console.log(err);
});
