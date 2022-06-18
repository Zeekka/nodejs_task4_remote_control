import path from 'path';
import { fileURLToPath } from 'url'

export const getCurrentDir = (url: string): string => {
    return path.dirname(getFileUrl(url));
}

export const getFileUrl = (url: string): string => {
    return fileURLToPath(url);
}