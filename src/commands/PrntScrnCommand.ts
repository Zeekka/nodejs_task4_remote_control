import Command from '../models/Command.js';
import robot, { Bitmap, screen } from 'robotjs';
import CommandResult, { status } from '../types/CommandResult.js';

export default class DrawCircleCommand extends Command {
    public exec(args: string[]): CommandResult {
        super.exec(args);
        let screenBitmap: Bitmap;
        try {
            const mousePos = robot.getMousePos();
            const size = Number(args[0]);
            screenBitmap = screen.capture(
                mousePos.x - size / 2,
                mousePos.y - size / 2,
                size, size
            );
        } catch (err) {
            return {
                status: status.ERROR,
                commandOutput: 'undefined',
            }
        }

        return {
            status: status.SUCCESS,
            commandOutput: screenBitmap.image.toString('base64')
        }
    }
}
