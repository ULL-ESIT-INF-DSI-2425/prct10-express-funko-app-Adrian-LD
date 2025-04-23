import * as net from 'net';
let clients = [];
let clientId = 0;
const server = net.createServer((socket) => {
    clientId++;
    socket.id = clientId;
    clients.push(socket);
    console.log(`Cliente ${socket.id} conectado`);
    // Enviar mensaje de bienvenida al cliente
    socket.write(JSON.stringify({
        type: 'welcome',
        message: `Bienvenido al chat, Cliente ${socket.id}!`
    }));
    // Manejar mensajes recibidos del cliente
    socket.on('data', (data) => {
        try {
            const message = JSON.parse(data.toString());
            console.log(`Cliente ${socket.id}: ${message.text}`);
            // Reenviar el mensaje a todos los demás clientes
            clients.forEach(client => {
                if (client !== socket) {
                    client.write(JSON.stringify({
                        type: 'message',
                        sender: `Cliente ${socket.id}`,
                        text: message.text
                    }));
                }
            });
        }
        catch (err) {
            console.error('Error al procesar el mensaje:', err);
        }
    });
    // Manejar desconexión del cliente
    socket.on('end', () => {
        console.log(`Cliente ${socket.id} desconectado`);
        clients = clients.filter(client => client !== socket);
    });
    // Manejar errores
    socket.on('error', (err) => {
        console.error(`Error en cliente ${socket.id}:`, err.message);
    });
});
// Iniciar el servidor en el puerto 60300
server.listen(60300, '127.0.0.1', () => {
    console.log('Servidor de chat en funcionamiento en el puerto 60300...');
});
