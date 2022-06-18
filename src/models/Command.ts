import InvalidCommandInput from '../errors/InvalidCommandInput.js';

export default class Command {
    protected validateArgs(args: string[]): boolean {
        return true;
    }

    public exec(args: string[]) {
        if (!this.validateArgs(args)) {
            throw new InvalidCommandInput('Invalid command input', args);
        }
    }
}
