import net from 'net';
import { exec } from 'child_process';
const server = net.createServer((socket) => {
    console.log('Cliente conectado.');
    socket.on('data', (data) => {
        const directory = data.toString().trim(); // Elimina espacios y saltos de línea
        // Ejecuta el comando 'ls' en el directorio recibido
        exec(`ls -l ${directory}`, (error, stdout, stderr) => {
            if (error) {
                socket.write(`Error: ${stderr}\n`);
                return;
            }
            socket.write(`Archivos en ${directory}:\n${stdout}`);
        });
    });
    socket.on('end', () => {
        console.log('Cliente desconectado.');
    });
});
server.listen(60300, () => {
    console.log('Servidor escuchando en puerto 60300...');
});
