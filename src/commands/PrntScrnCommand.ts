import Command from '../models/Command.js';
import robot, { Bitmap, screen } from 'robotjs';
import CommandResult, { status } from '../types/CommandResult.js';
import Jimp from 'jimp';

export default class DrawCircleCommand extends Command {
    protected validateArgs(args: string[]): boolean {
        return args.length === 0;
    }

    public async exec(args: string[]): Promise<CommandResult> {
        await super.exec(args);
        let screenBitmap: Bitmap;
        let base64Image: string;
        try {
            const mousePos = robot.getMousePos();
            const size = 200;
            screenBitmap = screen.capture(
                mousePos.x - size / 2,
                mousePos.y - size / 2,
                size, size
            );

            base64Image = await this.processRawImageBuffer(screenBitmap, size);
        } catch (err) {
            return {
                status: status.ERROR,
                commandOutput: 'undefined',
            }
        }

        return {
            status: status.SUCCESS,
            commandOutput: `prnt_scrn ${base64Image.replace(/^data:image\/png;base64,/,'')}`
        }
    }

    private processRawImageBuffer(screenBitmap: Bitmap, size: number): Promise<string> {
        const jimg = new Jimp(size, size);
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const hex = screenBitmap.colorAt(x, y);
                const num = parseInt(hex + 'ff', 16);
                jimg.setPixelColor(num, x, y);
            }
        }
        return jimg.getBase64Async(Jimp.MIME_PNG);
    }
}
