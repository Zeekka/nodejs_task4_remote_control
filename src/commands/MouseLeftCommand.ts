import Command from '../models/Command.js';
import robot from 'robotjs';
import CommandResult, {status} from '../types/CommandResult.js';

export default class MouseLeftCommand extends Command {
    protected validateArgs(args: string[]): boolean {
        let isArgsValid = true;

        if (args.length !== 1 || !Number(args[0])) {
            isArgsValid = false;
        }

        return isArgsValid;
    }

    public async exec(args: string[]): Promise<CommandResult> {
        await super.exec(args);
        try {
            const mousePos = robot.getMousePos();
            robot.moveMouse(mousePos.x - Number(args[0]), mousePos.y);
        } catch (err) {
            return {status: status.ERROR}
        }

        return {status: status.SUCCESS}
    }
}
