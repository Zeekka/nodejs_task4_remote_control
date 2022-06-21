import ParsedCommand from '../types/ParsedCommand';

export default class CommandParser {
    public parseCommand(rawCommand: string): ParsedCommand  {
        const command: string[] = rawCommand.split(' ');

        const commandName: string = command[0].split('_').map(
            value => value.charAt(0).toLocaleUpperCase() + value.slice(1)
        ).join('') + 'Command';

        const commandArgs: string[] = command.slice(1);

        return {commandName, commandArgs};
    }
}
