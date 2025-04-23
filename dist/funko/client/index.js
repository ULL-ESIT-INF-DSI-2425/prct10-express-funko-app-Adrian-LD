// client/funko-client.ts
import * as net from 'net';
import yargs from 'yargs'; // Usando import default para yargs
import * as chalk from 'chalk';
// Configuración de yargs para recibir parámetros de la línea de comandos
const argv = yargs
    .command('add', 'Añadir un Funko Pop', {
    user: { description: 'Nombre del usuario', type: 'string', demandOption: true },
    id: { description: 'ID del Funko', type: 'number', demandOption: true },
    name: { description: 'Nombre del Funko', type: 'string', demandOption: true },
    description: { description: 'Descripción del Funko', type: 'string', demandOption: true },
    type: { description: 'Tipo del Funko', type: 'string', demandOption: true },
    genre: { description: 'Género del Funko', type: 'string', demandOption: true },
    franchise: { description: 'Franquicia del Funko', type: 'string', demandOption: true },
    number: { description: 'Número del Funko', type: 'number', demandOption: true },
    exclusive: { description: '¿Es exclusivo?', type: 'boolean', demandOption: true },
    specialFeatures: { description: 'Características especiales', type: 'string', demandOption: true },
    marketValue: { description: 'Valor de mercado', type: 'number', demandOption: true }
})
    .help()
    .argv;
// Crear conexión al servidor
const socket = new net.Socket();
socket.connect(8080, '127.0.0.1', () => {
    console.log(chalk.green('Conectado al servidor.'));
    const funkoData = {
        id: argv.id,
        name: argv.name,
        description: argv.description,
        type: argv.type,
        genre: argv.genre,
        franchise: argv.franchise,
        number: argv.number,
        exclusive: argv.exclusive,
        specialFeatures: argv.specialFeatures,
        marketValue: argv.marketValue
    };
    // Enviar petición al servidor
    const request = { type: 'add', funkoPop: funkoData, user: argv.user };
    socket.write(JSON.stringify(request));
});
// Recibir respuesta del servidor
socket.on('data', (data) => {
    const response = JSON.parse(data.toString());
    if (response.success) {
        console.log(chalk.green(response.message));
    }
    else {
        console.log(chalk.red(response.message));
    }
    socket.end(); // Cerrar la conexión después de la respuesta
});
