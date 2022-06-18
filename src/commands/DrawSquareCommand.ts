import Command from '../models/Command.js';
import robot from 'robotjs';
import CommandResult, { status } from '../types/CommandResult.js';

export default class DrawSquareCommand extends Command {
    protected validateArgs(args: string[]): boolean {
        let isArgsValid = true;
        const notValid = (arg: string) => !Number(arg)
        if (args.length !== 1 || args.some(notValid)) {
            isArgsValid = false;
        }

        return isArgsValid;
    }

    public exec(args: string[]): CommandResult {
        super.exec(args);
        try {
            const mousePos = robot.getMousePos();
            const squareWidth = Number(args[0]);
            const y: number = mousePos.y;
            const x: number = mousePos.x;

            robot.setMouseDelay(50);
            robot.mouseToggle('down');

            robot.dragMouse(x + squareWidth, y);
            robot.dragMouse(x + squareWidth, y + squareWidth);
            robot.dragMouse(x, y + squareWidth);
            robot.dragMouse(x, y);

            robot.mouseToggle('up');
        } catch (err) {
            return {status: status.ERROR}
        }

        return {status: status.SUCCESS}
    }
}
