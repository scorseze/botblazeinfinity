import 'dotenv/config';

import ora from 'ora';
import gradient from 'gradient-string';
import figlet from 'figlet';

import { BotBlazeWithTelegram } from '../src/index.mjs'

figlet('Blaze with Telegram', (_, screen) => {
    console.log(gradient.vice(screen));
    console.log('       ' + gradient.cristal('by: SnufflesDragon'), ' |  ' + gradient.cristal('v0.1.1'));
    console.log();
    start();
});

async function start(){
    let appOra = ora('Iniciando aplicação').start(),
        controllerBot = new BotBlazeWithTelegram({
            sticker: {
                winNotGale: "win.jpg",
                winGaleOne: "win-in-gale.jpg",
                winGaleTwo: "win-in-gale.jpg",
                winWhite: "win-white.jpg",
                loss: "loss.jpg",
            },
            enterProtection: true,           
            summaryOfResult: {
                interval: 1,
                message: (number) => {
                    return `Total de jogadas: ${number.total}\nWins seguidos: ${number.consecutive} ✅\nTotal de win: ${number.win} ✅\nTotal de loss: ${number.loss} ❌\nTaxa de acertividade: ${(number.win / number.total * 100).toFixed(1)}%`
                }
            }
         })

    await controllerBot.run();

    appOra.succeed('Iniciado com sucesso!');

    process.on('SIGINT', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
    process.on('SIGQUIT', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
    process.on('SIGTERM', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
}