import CommandParser from './utils/CommandParser.js';
import CommandFactory from './utils/CommandFactory.js';
import ParsedCommand from './types/ParsedCommand.js';
import CommandResult from './types/CommandResult.js';
import { WebSocketServer } from 'ws';

const commandParser: CommandParser = new CommandParser();
const commandFactory: CommandFactory = new CommandFactory();

const WEB_SOCKET_PORT = 8080;

const wss = new WebSocketServer({port: WEB_SOCKET_PORT});
wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
        console.log(data.toString());
        try {
            const parsedCommand: ParsedCommand = commandParser.parseCommand(data.toString());
            const command = new (await commandFactory.create(parsedCommand.commandName)).default;
            const commandResult: CommandResult = command.exec(parsedCommand.commandArgs);

            if (commandResult.commandOutput) {
                console.log(commandResult.commandOutput);
                ws.send(commandResult.commandOutput)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                ws.send(error.message);
            }
        }
    });
});

wss.on('error', (error) => {
    console.log(error.message);
    wss.close()
})

wss.on('listening', () => {
    console.log(`Underling server start listening on ${JSON.stringify(wss.address())}`);
});

wss.on('close', () => {
    wss.close();
    console.log('Server stopped');
})

process.on('SIGINT', () => {
    console.log('Caught interrupt signal. Closing socket');
    wss.close();
    process.exit();
});
