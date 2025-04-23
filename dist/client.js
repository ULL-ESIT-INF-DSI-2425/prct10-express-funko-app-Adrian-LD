import * as net from 'net';
import * as readline from 'readline';
// Crear una interfaz para leer entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Conectar al servidor
const client = new net.Socket();
client.connect(60300, '127.0.0.1', () => {
    console.log('Conectado al servidor de chat');
});
// Manejar mensajes recibidos del servidor
client.on('data', (data) => {
    try {
        const message = JSON.parse(data.toString());
        if (message.type === 'welcome') {
            console.log(message.message);
        }
        else if (message.type === 'message') {
            console.log(`${message.sender}: ${message.text}`);
        }
    }
    catch (err) {
        console.error('Error al procesar el mensaje del servidor:', err);
    }
});
// Leer mensajes del usuario y enviarlos al servidor
rl.on('line', (input) => {
    const message = {
        text: input
    };
    client.write(JSON.stringify(message));
});
// Manejar desconexión del servidor
client.on('close', () => {
    console.log('Desconectado del servidor');
    rl.close();
});
// Manejar errores
client.on('error', (err) => {
    console.error('Error en el cliente:', err.message);
});
