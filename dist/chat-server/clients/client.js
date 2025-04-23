import net from 'net';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
yargs(hideBin(process.argv))
    .command('add', 'Añadir un nuevo Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', default: '' },
    type: {
        type: 'string',
        choices: ['Pop!', 'Pop! Rides', 'Vynil Soda', 'Vynil Gold'],
        demandOption: true
    },
    genre: {
        type: 'string',
        choices: ['Animación', 'Películas', 'Videojuegos', 'Deportes', 'Música', 'Ánime'],
        demandOption: true
    },
    franchise: { type: 'string', default: '' },
    number: { type: 'number', default: 0 },
    exclusive: { type: 'boolean', default: false },
    specialFeatures: { type: 'string', default: '' },
    marketValue: { type: 'number', demandOption: true }
}, (argv) => {
    sendRequest({
        type: 'add',
        user: argv.user,
        funko: {
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
        }
    });
})
    .command('update', 'Actualizar un Funko existente', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string' },
    description: { type: 'string' },
    type: { type: 'string', choices: ['Pop!', 'Pop! Rides', 'Vynil Soda', 'Vynil Gold'] },
    genre: { type: 'string', choices: ['Animación', 'Películas', 'Videojuegos', 'Deportes', 'Música', 'Ánime'] },
    franchise: { type: 'string' },
    number: { type: 'number' },
    exclusive: { type: 'boolean' },
    specialFeatures: { type: 'string' },
    marketValue: { type: 'number' }
}, (argv) => {
    sendRequest({
        type: 'update',
        user: argv.user,
        id: argv.id,
        funko: {
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
        }
    });
})
    .command('remove', 'Eliminar un Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
}, (argv) => {
    sendRequest({
        type: 'remove',
        user: argv.user,
        id: argv.id
    });
})
    .command('read', 'Mostrar un Funko específico', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
}, (argv) => {
    sendRequest({
        type: 'read',
        user: argv.user,
        id: argv.id
    });
})
    .command('list', 'Listar todos los Funkos de un usuario', {
    user: { type: 'string', demandOption: true }
}, (argv) => {
    sendRequest({
        type: 'list',
        user: argv.user
    });
})
    .help()
    .argv;
function sendRequest(request) {
    const client = net.connect({ port: 60300 }, () => {
        client.write(JSON.stringify(request) + '\n');
    });
    client.on('data', (data) => {
        const response = JSON.parse(data.toString());
        if (response.success) {
            console.log(chalk.green('Success:'));
            if (response.funko)
                displayFunko(response.funko);
        }
        else {
            console.log(chalk.red('Error:'), response.error);
        }
        client.end();
    });
}
function displayFunko(funko) {
    const valueColor = funko.marketValue > 100 ? chalk.green : chalk.red;
    console.log(chalk.bold.blue('\n=== Detalles del Funko ==='));
    console.log(chalk.bold(`ID: ${funko.id}`));
    console.log(chalk.bold(`Nombre: ${chalk.cyan(funko.name)}`));
    console.log(chalk.bold(`Tipo: ${funko.type}`));
    console.log(chalk.bold(`Género: ${funko.genre}`));
    console.log(chalk.bold(`Valor: ${valueColor('$' + funko.marketValue)}`));
    console.log(chalk.bold(`Descripción: ${funko.description || 'N/A'}`));
    console.log(chalk.bold(`Franquicia: ${funko.franchise || 'N/A'}`));
    console.log(chalk.blue('==========================\n'));
}
