// server/funko-server.ts
import * as net from 'net';
import { saveFunko, loadFunkos } from '../server/utils.js';
// Configuración del servidor
const server = net.createServer((socket) => {
    console.log('Cliente conectado');
    socket.on('data', (data) => {
        const request = JSON.parse(data.toString());
        processRequest(request, socket);
    });
    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});
// Procesar las solicitudes del cliente
function processRequest(request, socket) {
    const { type, funkoPop, user } = request;
    switch (type) {
        case 'add':
            if (!funkoPop) {
                socket.write(JSON.stringify({ success: false, message: 'No Funko data provided.' }));
                return;
            }
            const funkos = loadFunkos(user);
            if (funkos.find((f) => f.id === funkoPop.id)) {
                socket.write(JSON.stringify({ success: false, message: 'Funko already exists.' }));
            }
            else {
                saveFunko(user, funkoPop);
                socket.write(JSON.stringify({ success: true, message: 'Funko added.' }));
            }
            break;
        case 'list':
            const funkosList = loadFunkos(user);
            socket.write(JSON.stringify({ success: true, funkos: funkosList }));
            break;
        // Agregar más casos para 'update', 'remove', 'read', etc.
        default:
            socket.write(JSON.stringify({ success: false, message: 'Invalid request type.' }));
            break;
    }
}
// Iniciar el servidor
server.listen(8080, '127.0.0.1', () => {
    console.log('Servidor escuchando en el puerto 8080');
});
