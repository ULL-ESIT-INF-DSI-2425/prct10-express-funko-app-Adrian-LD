import * as net from 'net';
import * as readline from 'readline';
const Leer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const cliente = new net.Socket();
cliente.connect(60300, '127.0.0.1', () => {
    console.log('Conectado al servidor de chat');
});
Leer.on('line', (input) => {
    cliente.write(input);
});
