import * as net from 'net';
const servidor = net.createServer((conectado) => {
    conectado.on('data', (data) => {
        console.log('Cliente dice: ' + data);
    });
});
servidor.listen(60300, '127.0.0.1', () => {
    console.log('Servidor de chat en funcionamiento en el puerto 60300...');
});
