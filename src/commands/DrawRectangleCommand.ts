import Command from '../models/Command.js';
import robot from 'robotjs';
import CommandResult, { status } from '../types/CommandResult.js';

export default class DrawRectangleCommand extends Command {
    protected validateArgs(args: string[]): boolean {
        let isArgsValid = true;
        const notValid = (arg: string) => !Number(arg)
        if (args.length !== 2 || args.some(notValid)) {
            isArgsValid = false;
        }

        return isArgsValid;
    }

    public async exec(args: string[]): Promise<CommandResult> {
        await super.exec(args);
        try {
            const mousePos = robot.getMousePos();
            const rectangleWidth = Number(args[0]);
            const rectangleHeight = Number(args[1]);
            const y: number = mousePos.y;
            const x: number = mousePos.x;

            robot.setMouseDelay(50);
            robot.mouseToggle('down');

            robot.dragMouse(x + rectangleWidth, y);
            robot.dragMouse(x + rectangleWidth, y + rectangleHeight);
            robot.dragMouse(x, y + rectangleHeight);
            robot.dragMouse(x, y);

            robot.mouseToggle('up');
        } catch (err) {
            return {status: status.ERROR}
        }

        return {status: status.SUCCESS}
    }
}
