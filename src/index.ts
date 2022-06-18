import CommandParser from './utils/CommandParser.js';
import CommandFactory from './utils/CommandFactory.js';
import ParsedCommand from './types/ParsedCommand.js';
import CommandResult from './types/CommandResult.js';

const rawCommand = process.argv.slice(2).pop();

const commandParser: CommandParser = new CommandParser();
const parsedCommand: ParsedCommand = commandParser.parseCommand(rawCommand!);

const commandFactory: CommandFactory = new CommandFactory();
const command = new (await commandFactory.create(parsedCommand.commandName)).default;

const commandResult: CommandResult = command.exec(parsedCommand.commandArgs);

if (commandResult.commandOutput) {
    console.log(commandResult.commandOutput);
}
