const Discord = require("discord.js");
const request = require('request').defaults({ encoding: null });
const http = require("http");
const rbx = require('roblox-js');
const acc = JSON.parse(process.env.ACC);
//const childProcess = require('child_process');
var bot = new Discord.Client();
var ch = "476389923574775823";
var co = "476391476318830598";
var owner = "178131193768706048";
var cookie = rbx.jar();
var TimeoutMs = 750


bot.on("ready", function(){
  bot.channels.get(ch).send("**[STATEMENT]** Restarted successfully!")
});

function fl(fn){
  acc.forEach(function(v){
  rbx.login(v) //({username: 'shedletsky',password: 'hunter2'})
  .then(function(){
        fn(v)
  })
  .catch(function(err){
  console.log("Error login into " + v.username + " account");
  });
 });
}

bot.on("message", function(message){
  if (message.author.equals(bot.user) || message.channel.id != co || message.author.id != owner) return;
    var args = message.content.split(" ");
    if (args[0].toLowerCase() == "login"){
      message.channel.send("Login in...")
      var Failed = 0
      var Success = 0
      var Now = Date.now()
      acc.forEach(function(v){
        rbx.login(v) //({username: 'shedletsky',password: 'hunter2'})
        .then(function(){
          bot.channels.get(ch).send("**[STATEMENT]** Successfully login into "+ v.username +" account")
          Success = Success + 1
        })
        .catch(function(err){
          bot.channels.get(ch).send("**[ERROR]** ERROR LOGIN INTO " + v.username + " ACCOUNT: " + err.stack);
          Failed = Failed + 1
        });
      });
      bot.setTimeout(function(){
        message.channel.send("Finished! \nSuccess: " + Success + "\nFailed: " + Failed + "\nRun in: " + (Date.now() - Now) + " ms");
      }, acc.length * TimeoutMs);
    }else if(args[0].toLowerCase() == "accounts"){
      message.channel.send("Accounts: " + acc.length)
    }else if(args[0].toLowerCase() == "group"){
      if(args[1].toLowerCase() == "join"){
        fl(function(){
          rbx.joinGroup(Number(args[2]), true).then(function(){
            message.channel.send("Successfully joined group " + Number(args[2]));
            bot.channels.get(ch).send("**[STATEMENT]** Joined group " + Number(args[2]));
          })
          .catch(function(err){
            bot.channels.get(ch).send("**[ERROR]** ERROR JOINING GROUP " + Number(args[2]) + ": \n" + err.stack);
          });
        });
      }else if(args[1].toLowerCase() == "leave"){
        fl(function(){
          rbx.leaveGroup(Number(args[2]), true).then(function(){
            message.channel.send("Successfully leaved group " + Number(args[2]));
            bot.channels.get(ch).send("**[STATEMENT]** Leaved group " + Number(args[2]));
          })
          .catch(function(err){
            bot.channels.get(ch).send("**[ERROR]** ERROR LEAVING GROUP " + Number(args[2]) + ": \n" + err.stack);
          });  
        });
      }else{
        message.channel.send("Invalid sub-command.")
      }
    }else if(args[0].toLowerCase() == "follow"){
      fl(function(){
        rbx.follow(Number(args[1]))
          .then(function(){
            bot.channels.get(ch).send("**[STATEMENT]** Followed " + args[1]);
          })
          .catch(function(err){
            bot.channels.get(ch).send("**[ERROR]** ERROR FOLLOWING " + args[1] + ": \n" + err.stack);
          });
      });
      message.channel.send("Finished following " + args[1]);
      }else if(args[0].toLowerCase() == "unfollow"){
        fl(function(v){
          rbx.unfollow(Number(args[1]))
          .then(function(){
            message.channel.send("Successfully unfollowed " + args[1]);
            bot.channels.get(ch).send("**[STATEMENT]** Unfollowed " + args[1]);
          })
          .catch(function(err){
            bot.channels.get(ch).send("**[ERROR]** ERROR UNFOLLOWING " + args[1] + ": \n" + err.stack);
          });
        });
       message.channel.send("Finished unfollowing " + args[1]);
    }else{
      message.channel.send("Invalid command.")
    }
});

bot.on("disconnect", function(){
  bot.channels.get(ch).send("**[STATEMENT]** Stopping the bot...")
});

bot.login(process.env.TOKEN);
console.log("Login successfully!");

bot.on("error", err => {
    console.log(err);
});
