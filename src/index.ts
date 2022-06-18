import CommandParser from './utils/CommandParser.js';
const rawCommand = process.argv.slice(2).pop()!;

const commandParser: CommandParser = new CommandParser();
console.log(commandParser.parseCommand(rawCommand));

