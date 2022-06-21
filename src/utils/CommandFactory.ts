import { getCurrentDir } from './currentDir.js';
import path from 'path';
import * as module from 'module';
import CommandNotFound from '../errors/CommandNotFound.js';

export default class CommandFactory {
    public async create(commandName: string) {
        const parentDir: string = path.resolve(getCurrentDir(import.meta.url), '..');
        try {
            return await import(path.join(parentDir, 'commands', commandName) + '.js');
        } catch (error) {
            throw new CommandNotFound(`Command ${commandName} doesn't exist`, commandName);
        }
    }
}