// Make sure you add your bot token at the bottom of the code.

// Bot Requirements
var Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");

// Bot continuously reads messages
bot.on("message", function(message)
{
	// Makes sure the first word is ~createcommand
	var checkMessage = message.content.split(" ");
	if(checkMessage[0] == "~createcommand")
	{
		// commandText gets grabbed by splitting the string with |
		// commandName gets grabbed by splitting the string with spaces
		// command Name must have '~' in it just so you can't use any word you
		// want
		var commandText = message.content.split("|",2);
		var commandName = message.content.split(" ");
		if(commandName[1].charAt(0) == "~")
			{
				checkExistingCommand(commandText,commandName);
				bot.sendMessage(message, "Command " + commandName[1] + " has been created");
			} else {
				bot.sendMessage(message, "Command must contain '~'");
			}
	}

	/*
	 * Checks the commands.txt file to see if anyone posted the command.
	 * commands.txt is split with semi-colons. For loop to check every single
	 * command. If there is a match, then it opens up the txt file associate
	 * with that command. If there are multiple pictures then the user should
	 * type $random{} and then type in all the pictures in the brackets
	 * separated by semi-colons. If there is no $random{} then it just sends the
	 * message.
	 */
	fs.readFile('./commands/commands.txt','utf8',function(err,f){
		var com = f.toString().split(";");
		for(i = 0; i < com.length; i++)
		{
			if(message.content == com[i])
			{
				if(com[i] == "~commands")
					{
						bot.sendMessage(message,com);
						break;
					}
				if(com[i] == "~help")
					{
						bot.sendMessage(message,"How to create commands:\n~createcommand ~NameOfCommand | Type whatever you want here");
						break;
					}
				var command = "./commands/" + com[i] + ".txt";
				fs.readFile(command,'utf8', function(err,f){
					if(f.includes("$random") == true){
						f.slice(f.indexOf('{') +1,f.indexOf('}'));
						var com2 = f.toString().split(";");
						var num = Math.random() * ((com2.length - 1) - 0) + 0;
						bot.sendMessage(message, com2[Math.floor(num)]);
					} else
						{
						bot.sendMessage(message, f.toString());
						}
				});
			}
		}
	});
});


// If the command already exists then it won't add it to commands.txt
function checkExistingCommand(commandText,commandName)
{
	var com = commandName[1];
	var desc = commandText[1];
	var CE = false;
	fs.readFile('./commands/commands.txt','utf8',function(err,f){
		var findCommands = f.toString().split(";");
		for(i = 0; i < findCommands.length; i++)
		{
			if(com == findCommands[i])
			{
				CE = true;
			}
		}
		if(CE == true)
		{
			createCommand(desc,true,com);
		} else if (CE == false)
		{
			createCommand(desc,false,com);
		}
	});
	
}

// Appends and/or creates the text files.
function createCommand(desc,b,com)
{
	var fileName = "./commands/" + com + ".txt";
	if(b == true)
	{
		fs.writeFile(fileName,desc,function(err){
		if(err) {
			return console.error(err);
		}
		});
	} else if (b == false){
		fs.appendFile('./commands/commands.txt',com+';',(err) =>
		{
		if(err) throw err;
		});
		
		fs.writeFile(fileName,desc,function(err){
		if(err) {
			return console.error(err);
		}
		});
	}
	return;
}

bot.loginWithToken("YOUR BOT TOKEN");