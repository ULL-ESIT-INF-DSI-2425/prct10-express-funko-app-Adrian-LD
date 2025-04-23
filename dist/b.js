import net from 'net';
const client = net.connect({ port: 60300 }, () => {
    console.log('Conectado al servidor de hora.');
});
client.on('data', (data) => {
    const message = JSON.parse(data.toString().trim());
    if (message.type === 'time') {
        console.log('Hora actual:', message.value);
    }
});
