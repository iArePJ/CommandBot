# CommandBot
Discord Bot that lets users create their own custom commands

CommandBot runs on Node.js 6.0+ so make sure you have that installed.
https://nodejs.org/en/

# Running CommandBot:
Open app.js with notepad and add your Bot's Token.
Open Start.bat and you should be good to go!

# Usage:
Type "~help" if you forget how to create commands.
Type "~commands" for a list of commands you have made.

Creating commands is almost exactly like BooBot.
~createcommand ~NameOfCommand | Whatever you want

You start with ~createcommand, then you name the command, then you add a '|' and then you can add whatever you want.

Example:
~createcommand ~ping | pong
User enters:
~ping
Bot sends a message saying:
pong

You can have multiple random responses by adding a semi-colon to seperate them. You don't need a semi-colon for the last one.

Example:
~createcommand ~greeting | Hey;Hello;What's up;Howdy

This will make it output Hey, Hello, or What's up randomly.
The responses must be inside the brackets and must be seperated by semi-colons. No semi-colon is needed for the last response.
