// Import the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const random = require("random-js")(); // uses the nativeMath engine

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'YOUR BOT TOKEN HERE';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    if (message.author.bot === true) {
        return null;
    }
    let checkMessage = message.content.split(" ");
    if (checkMessage[0] === '~createcommand') {
        try {
            let commandName = checkMessage[1];
            if (commandName === '~commands' || commandName === '~help') {
                message.channel.send("You can't do that.");
                return null;
            }
            let commandText = message.content.split('|', 2);
            if (commandName.charAt(0) === '~') {
                checkExistingCommand(commandText[1], commandName);
            } else {
                checkExistingCommand(commandText[1], '~' + commandName);
            }
            message.channel.send("Command " + commandName + " has been created.");

        } catch (error) {
            console.log("Error\nAuthor: " + message.author.username + "\nMessage: " + message.content);
        }
    }

    fs.readFile('./commands/commands.txt', 'utf8', function (err, f) {
        let com = f.toString().split(";");
        for (i = 0; i < com.length; i++) {
            if (message.content === com[i]) {
                if (com[i] === "~commands") {
                    message.author.send(com);
                    break;
                }
                if (com[i] === "~help") {
                    message.channel.send("How to create commands:\n~createcommand ~NameOfCommand | Type whatever you want here");
                    break;
                }
                let command = "./commands/" + com[i] + ".txt";
                fs.readFile(command, 'utf8', function (err, f) {
                    try {
                        let com2 = f.toString().split(";");
                        let num = random.integer(0, com2.length - 1);
                        message.channel.send(com2[Math.floor(num)]);
                    }
                    catch (err) {
                        console.error("", err);
                    }
                });
            }
        }
    });

});

/**
 * @method checkExistingCommand
 * @param {String} commandText
 * @param {String} commandName
 */
function checkExistingCommand(commandText, commandName) {
    let commandExists = false;
    fs.readFile('./commands/commands.txt', 'utf8', function (err, f) {
        let findCommands = f.toString().split(";");
        for (i = 0; i < findCommands.length; i++) {
            if (commandName === findCommands[i]) {
                commandExists = true;
            }
        }
        if (commandExists === true) {
            createCommand(commandText, true, commandName);
        } else if (commandExists === false) {
            createCommand(commandText, false, commandName);
        }
    });

}

/**
 * @method createCommand
 * @param {String} commandText
 * @param {Boolean} commandExists
 * @param {String} commandName
 */
function createCommand(commandText, commandExists, commandName) {
    let fileName = "./commands/" + commandName + ".txt";
    if (commandExists === true) {
        fs.writeFile(fileName, commandText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    } else if (commandExists === false) {
        fs.appendFile('./commands/commands.txt', commandName + ';', (err) => {
            if (err) throw err;
        });

        fs.writeFile(fileName, commandText, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}

// Log our bot in
client.login(token);