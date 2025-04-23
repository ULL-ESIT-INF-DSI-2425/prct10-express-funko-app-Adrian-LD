import net from 'net';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
const SERVER_PORT = 60300;
const server = net.createServer((socket) => {
    console.log('Cliente conectado.');
    // Para leer la entrada línea a línea
    const rl = readline.createInterface({
        input: socket,
        terminal: false
    });
    rl.on('line', (line) => {
        if (line.trim() === '')
            return;
        let request;
        try {
            request = JSON.parse(line);
        }
        catch (err) {
            socket.write(JSON.stringify({
                success: false,
                error: 'JSON inválido en la solicitud'
            }) + "\n");
            return;
        }
        handleRequest(request, socket);
    });
    socket.on('error', (err) => {
        console.error('Error en la conexión:', err.message);
    });
    socket.on('close', () => {
        console.log('Cliente desconectado.');
        rl.close();
    });
});
server.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando en el puerto ${SERVER_PORT}`);
});
/**
 * Procesa la solicitud recibida y llama a la función correspondiente.
 */
function handleRequest(request, socket) {
    const { type, user, id, funko } = request;
    if (!user || !type) {
        socket.write(JSON.stringify({
            success: false,
            error: 'La solicitud debe tener los campos "user" y "type".'
        }) + "\n");
        return;
    }
    const userDir = path.join('./data', user);
    // Garantizamos que el directorio del usuario existe
    fs.mkdir(userDir, { recursive: true }, (err) => {
        if (err) {
            socket.write(JSON.stringify({
                success: false,
                error: 'Error creando la carpeta del usuario'
            }) + "\n");
            return;
        }
        // Despacho de la operación solicitada.
        switch (type) {
            case 'add':
                if (!funko) {
                    socket.write(JSON.stringify({
                        success: false,
                        error: 'Falta la información del Funko para agregar'
                    }) + "\n");
                }
                else {
                    addFunko(userDir, funko, socket);
                }
                break;
            case 'update':
                if (!funko) {
                    socket.write(JSON.stringify({
                        success: false,
                        error: 'Falta la información del Funko para actualizar'
                    }) + "\n");
                }
                else {
                    updateFunko(userDir, funko, socket);
                }
                break;
            case 'remove':
                if (id === undefined) {
                    socket.write(JSON.stringify({
                        success: false,
                        error: 'Falta el ID del Funko para eliminar'
                    }) + "\n");
                }
                else {
                    removeFunko(userDir, id, socket);
                }
                break;
            case 'read':
                if (id === undefined) {
                    socket.write(JSON.stringify({
                        success: false,
                        error: 'Falta el ID del Funko para leer'
                    }) + "\n");
                }
                else {
                    readFunko(userDir, id, socket);
                }
                break;
            case 'list':
                listFunkos(userDir, socket);
                break;
            default:
                socket.write(JSON.stringify({
                    success: false,
                    error: 'Tipo de operación no válido'
                }) + "\n");
                break;
        }
    });
}
/**
 * Agrega un nuevo Funko en el directorio del usuario.
 */
function addFunko(userDir, funko, socket) {
    // Verificar campos obligatorios
    if (!funko.id || !funko.name || !funko.type || !funko.genre || funko.marketValue === undefined) {
        socket.write(JSON.stringify({
            success: false,
            error: 'Faltan propiedades obligatorias en el Funko.'
        }) + "\n");
        return;
    }
    const filePath = path.join(userDir, `${funko.id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // El archivo existe
            socket.write(JSON.stringify({
                success: false,
                message: `Ya existe un Funko con ID ${funko.id}.`
            }) + "\n");
            return;
        }
        fs.writeFile(filePath, JSON.stringify(funko, null, 2), (err) => {
            if (err) {
                socket.write(JSON.stringify({
                    success: false,
                    error: 'Error al agregar el Funko.'
                }) + "\n");
            }
            else {
                socket.write(JSON.stringify({
                    success: true,
                    message: 'Funko agregado correctamente.'
                }) + "\n");
            }
        });
    });
}
/**
 * Actualiza un Funko existente.
 */
function updateFunko(userDir, funko, socket) {
    const filePath = path.join(userDir, `${funko.id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            socket.write(JSON.stringify({
                success: false,
                message: `No se encontró un Funko con ID ${funko.id}.`
            }) + "\n");
            return;
        }
        fs.writeFile(filePath, JSON.stringify(funko, null, 2), (err) => {
            if (err) {
                socket.write(JSON.stringify({
                    success: false,
                    error: 'Error al actualizar el Funko.'
                }) + "\n");
            }
            else {
                socket.write(JSON.stringify({
                    success: true,
                    message: 'Funko actualizado correctamente.'
                }) + "\n");
            }
        });
    });
}
/**
 * Elimina un Funko.
 */
function removeFunko(userDir, id, socket) {
    const filePath = path.join(userDir, `${id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            socket.write(JSON.stringify({
                success: false,
                message: `No se encontró un Funko con ID ${id}.`
            }) + "\n");
            return;
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                socket.write(JSON.stringify({
                    success: false,
                    error: 'Error al eliminar el Funko.'
                }) + "\n");
            }
            else {
                socket.write(JSON.stringify({
                    success: true,
                    message: 'Funko eliminado correctamente.'
                }) + "\n");
            }
        });
    });
}
/**
 * Lee la información de un Funko específico.
 */
function readFunko(userDir, id, socket) {
    const filePath = path.join(userDir, `${id}.json`);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            socket.write(JSON.stringify({
                success: false,
                message: `No se encontró un Funko con ID ${id}.`
            }) + "\n");
            return;
        }
        let funkoData;
        try {
            funkoData = JSON.parse(data);
        }
        catch (e) {
            socket.write(JSON.stringify({
                success: false,
                error: 'Error al interpretar los datos del Funko.'
            }) + "\n");
            return;
        }
        socket.write(JSON.stringify({
            success: true,
            message: `Funko con ID ${id} obtenido.`,
            funko: funkoData
        }) + "\n");
    });
}
/**
 * Lista todos los Funkos registrados para el usuario.
 */
function listFunkos(userDir, socket) {
    fs.readdir(userDir, (err, files) => {
        if (err || !files || files.length === 0) {
            socket.write(JSON.stringify({
                success: true,
                message: 'No se encontraron Funkos.',
                funkos: [],
                count: 0
            }) + "\n");
            return;
        }
        const funkos = [];
        let pending = files.length;
        files.forEach((file) => {
            const fullPath = path.join(userDir, file);
            fs.readFile(fullPath, 'utf-8', (err, data) => {
                if (!err) {
                    try {
                        const funko = JSON.parse(data);
                        funkos.push(funko);
                    }
                    catch (e) {
                        // Ignoramos errores de parseo
                    }
                }
                pending--;
                if (pending === 0) {
                    socket.write(JSON.stringify({
                        success: true,
                        message: 'Listado de Funkos obtenido.',
                        funkos: funkos,
                        count: funkos.length
                    }) + "\n");
                }
            });
        });
    });
}
