import { getCurrentDir } from './currentDir.js';
import path from 'path';

export default class CommandFactory {
    public async create(commandName: string) {
        const parentDir: string = path.resolve(getCurrentDir(import.meta.url), '..');
        return await import(path.join(parentDir, 'commands', commandName) + '.js');
    }
}