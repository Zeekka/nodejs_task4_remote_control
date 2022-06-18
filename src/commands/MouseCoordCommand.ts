import Command from '../models/Command.js';
import robot from 'robotjs';
import CommandResult, {status} from '../types/CommandResult.js';

export default class MouseCoordCommand extends Command {
    public exec(args: string[]): CommandResult {
        let mousePos;

        try {
            mousePos = robot.getMousePos();
        } catch (err) {
            return {
                status: status.ERROR,
                commandOutput: 'undefined'
            }
        }

        return {
            status: status.SUCCESS,
            commandOutput: JSON.stringify(mousePos)
        }
    }
}
