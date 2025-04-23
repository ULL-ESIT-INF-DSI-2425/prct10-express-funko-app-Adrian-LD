import net from 'net';
import { resolve } from 'path';
import fs from 'fs';
/**
 * Creacion del servidor
 */
const servidor = net.createServer((conexion) => {
    console.log("Te haz conectado");
    /**
     * Recibimos la ruta del cliente y lo leemos
     */
    conexion.on('data', (datos) => {
        const rutaArchivo_desde_cliente = datos.toString().trim();
        const ruta_abolsuta = resolve(rutaArchivo_desde_cliente);
        const leer_fichero = fs.createReadStream(ruta_abolsuta);
        leer_fichero.pipe(conexion);
        leer_fichero.on('error', (err) => {
            console.error(`Error en el servidor: ${err.message}`);
        });
        leer_fichero.on('close', () => {
            conexion.end();
        });
    });
});
/**
 * Puerto de escucha del servidor
 */
servidor.listen(60300, () => { });
