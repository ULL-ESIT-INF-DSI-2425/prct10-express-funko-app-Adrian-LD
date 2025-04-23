import net from 'net';
const server = net.createServer((conexion) => {
    console.log("Holaa, te haz contectado!!");
    const intervalos = setInterval(() => {
        conexion.write(JSON.stringify({ type: 'time', value: new Date().toLocaleTimeString() }) + '\n');
    }, 5000);
});
server.listen(60300, () => {
    console.log('Servidor de hora escuchando en puerto 60300...');
});
