import Command from '../models/Command.js';
import robot from 'robotjs';
import CommandResult, {status} from '../types/CommandResult.js';

export default class DrawCircleCommand extends Command {
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
            const circleRadius = Number(args[0]);
            let y: number = mousePos.y;
            let x: number = mousePos.x;
            let isMouseToggled = false;

            for (let angle = - Math.PI; angle <= Math.PI + 0.1; angle += 0.1) {
                x = circleRadius * Math.cos(angle) + mousePos.x;
                y = circleRadius * Math.sin(angle) + mousePos.y;
                if (!isMouseToggled) {
                    robot.moveMouse(x, y);
                    robot.mouseToggle('down');
                    isMouseToggled = true;
                } else {
                    robot.dragMouse(x, y);
                }
            }
            robot.mouseToggle('up');
            robot.moveMouse(mousePos.x, mousePos.y);
        } catch (err) {
            return {status: status.ERROR}
        }

        return {status: status.SUCCESS}
    }
}
