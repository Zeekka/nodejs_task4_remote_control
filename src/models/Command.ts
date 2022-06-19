import InvalidCommandInput from '../errors/InvalidCommandInput.js';
import CommandResult, {status} from '../types/CommandResult.js';

export default class Command {
    protected validateArgs(args: string[]): boolean {
        return true;
    }

    public exec(args: string[]): CommandResult | never {
        if (!this.validateArgs(args)) {
            throw new InvalidCommandInput('Invalid command input', args);
        }

        return {status: status.SUCCESS}
    }
}
