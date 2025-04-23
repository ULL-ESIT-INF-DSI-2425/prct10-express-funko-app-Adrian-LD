import * as fs from 'fs';
import * as path from 'path';
// Directorio base de almacenamiento de Funkos
const BASE_DIR = path.join(__dirname, 'data');
// Asegurarse de que el directorio del usuario existe
function ensureUserDir(user) {
    const userDir = path.join(BASE_DIR, user);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }
    return userDir;
}
// Guardar el Funko en el archivo JSON
export function saveFunko(user, funko) {
    const userDir = ensureUserDir(user);
    const filePath = path.join(userDir, `${funko.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
}
// Cargar todos los Funkos de un usuario
export function loadFunkos(user) {
    const userDir = ensureUserDir(user);
    const files = fs.readdirSync(userDir);
    const funkos = files.map(file => {
        const filePath = path.join(userDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });
    return funkos;
}
