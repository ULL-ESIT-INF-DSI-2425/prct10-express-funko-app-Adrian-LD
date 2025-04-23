import net from 'net';
import fs from 'fs';
const ruta_archivo = process.argv[2];
const ruta_destino = process.argv[3];
/**
 * Conexion del cliente con el servidor medinate el puerto 60300
 */
const cliente = net.connect({ port: 60300 }, () => {
    cliente.write(ruta_archivo);
});
/**
 * Datos recibidos del servidor trozo a trozo
 */
cliente.on('data', (datos) => {
    console.log(datos.toLocaleString());
    const escribir_en_fcihero = fs.createWriteStream(ruta_destino);
    escribir_en_fcihero.write(datos);
});
/**
 * Evento de finalizacion por el cliente
 */
cliente.on('end', () => {
    console.log("Conexión finalizada");
});
