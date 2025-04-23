export {};
/**
const net = require('net');
const fs = require('fs');
const path = require('path');

// Definir el puerto y la dirección del servidor
const PORT = 8080;
const HOST = '127.0.0.1';

// Crear el servidor
const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    // Cuando el servidor recibe datos del cliente
    socket.on('data', (data) => {
        const filePath = data.toString().trim(); // Ruta del archivo solicitada
        const absolutePath = path.resolve(filePath); // Ruta absoluta del archivo

        // Comprobar si el archivo existe
        fs.access(absolutePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Si el archivo no existe, enviar un mensaje de error al cliente
                socket.write('Error: El archivo no existe.\n');
                socket.end(); // Cerrar la conexión
                return;
            }

            // Si el archivo existe, abrirlo y enviarlo al cliente
            const readStream = fs.createReadStream(absolutePath);
            readStream.on('data', (chunk) => {
                socket.write(chunk); // Enviar el fragmento del archivo al cliente
            });

            // Cuando el archivo se haya enviado completamente
            readStream.on('end', () => {
                socket.write('\nTransferencia completa.\n');
                socket.end(); // Cerrar la conexión
            });

            // Manejo de errores al leer el archivo
            readStream.on('error', (err) => {
                console.error('Error leyendo el archivo:', err);
                socket.write('Error: No se pudo leer el archivo.\n');
                socket.end();
            });
        });
    });

    // Manejar cierre de la conexión
    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    // Manejar errores
    socket.on('error', (err) => {
        console.error('Error en la conexión:', err);
    });
});

// Iniciar el servidor
server.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en ${HOST}:${PORT}`);
});

const net = require('net');
const fs = require('fs');
const path = require('path');

// Definir el puerto y la dirección del servidor
const PORT = 8080;
const HOST = '127.0.0.1';

// Crear un cliente para conectarse al servidor
const client = net.createConnection({ port: PORT, host: HOST }, () => {
    console.log('Conectado al servidor');

    // Ruta del archivo que se desea recibir
    const filePath = 'ruta/del/archivo.txt'; // Reemplaza con la ruta del archivo

    // Enviar la ruta del archivo al servidor
    client.write(filePath);
});

// Cuando el cliente recibe datos del servidor (contenido del archivo)
client.on('data', (data) => {
    // Si el servidor respondió con un mensaje de error
    if (data.toString().includes('Error')) {
        console.log(data.toString());
        client.end(); // Cerrar la conexión
        return;
    }

    // Escribir los datos recibidos en un archivo local
    const writeStream = fs.createWriteStream(path.basename(filePath)); // Crear un stream de escritura
    writeStream.write(data);

    // Si el servidor envía más datos, seguimos escribiendo
    client.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    // Una vez que se termine de escribir el archivo
    client.on('end', () => {
        writeStream.end(); // Finalizamos el stream de escritura
        console.log('Archivo recibido y guardado correctamente');
    });
});

// Manejar el cierre de la conexión
client.on('end', () => {
    console.log('Desconectado del servidor');
});

// Manejar errores
client.on('error', (err) => {
    console.error('Error en la conexión:', err);
});
-------------
import net from 'net';
import fs from 'fs';
import path from 'path';

const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  socket.on('data', (data) => {
    const rutaArchivo = data.toString().trim();
    const rutaCompleta = path.resolve(rutaArchivo);

    // Verificar si el archivo existe
    fs.exists(rutaCompleta, (existe) => {
      if (existe) {
        console.log(`El archivo ${rutaArchivo} existe. Enviando...`);
        // Crear un stream de lectura
        const archivoStream = fs.createReadStream(rutaCompleta);
        
        // Enviar el archivo al cliente
        archivoStream.pipe(socket);
        
        archivoStream.on('end', () => {
          console.log('Archivo enviado correctamente');
        });

        archivoStream.on('error', (err) => {
          console.error('Error al enviar el archivo:', err);
        });
      } else {
        console.log(`El archivo ${rutaArchivo} no existe`);
        socket.write('Archivo no encontrado');
        socket.end(); // Cerrar la conexión
      }
    });
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  socket.on('error', (err) => {
    console.error('Error en la conexión del servidor:', err);
  });
});

// Configurar el servidor para escuchar en el puerto 60300
server.listen(60300, () => {
  console.log('Servidor escuchando en el puerto 60300...');
});

import net from 'net';
import { resolve } from 'path';
import fs from 'fs';

const servidor = net.createServer((conexion) => {
  console.log("Te has conectado");

  conexion.on('data', (datos) => {
    const rutaArchivoDesdeCliente = datos.toString().trim();
    const rutaAbsoluta = resolve(rutaArchivoDesdeCliente);
    console.log("Ruta solicitada:", rutaAbsoluta);

    // Verificar si el archivo existe
    if (fs.existsSync(rutaAbsoluta) && fs.statSync(rutaAbsoluta).isFile()) {
      const leerFichero = fs.createReadStream(rutaAbsoluta);
      leerFichero.pipe(conexion);
    } else {
      // Enviar mensaje de error si el archivo no existe
      conexion.write("Error: El archivo no existe en el servidor.");
      conexion.end();  // Cerrar la conexión después de enviar el error
    }
  });
});

servidor.listen(60300, () => {
  console.log("Servidor escuchando en el puerto 60300");
});

import net from 'net';
import fs from 'fs';
import path from 'path';

const rutaArchivo = process.argv[2];  // Solo tomamos la ruta del archivo a recibir

if (!rutaArchivo) {
  console.log("Debes proporcionar la ruta del archivo a recibir.");
  process.exit(1);  // Salimos si no se ha dado la ruta
}

const cliente = net.connect({ port: 60300 }, () => {
  console.log("Solicitando archivo:", rutaArchivo);
  cliente.write(rutaArchivo);  // Enviamos la ruta al servidor
});

cliente.on('data', (datos) => {
  const mensaje = datos.toString().trim();

  if (mensaje === "Archivo no encontrado") {
    console.log("Error: El archivo solicitado no existe en el servidor.");
    cliente.end();
    return;
  }

  // Guardamos el archivo recibido con el mismo nombre que la ruta original
  const rutaDestinoFinal = path.basename(rutaArchivo);
  const escribirEnFichero = fs.createWriteStream(rutaDestinoFinal);

  escribirEnFichero.write(datos, (err) => {
    if (err) {
      console.log("Error al escribir el archivo:", err);
    } else {
      console.log(`Archivo guardado en ${rutaDestinoFinal}`);
    }
  });

  escribirEnFichero.on('finish', () => {
    cliente.end();
  });
});

cliente.on('error', (err) => {
  console.log("Error de conexión con el servidor:", err);
});

cliente.on('end', () => {
  console.log("Conexión cerrada");
});

 */ 
