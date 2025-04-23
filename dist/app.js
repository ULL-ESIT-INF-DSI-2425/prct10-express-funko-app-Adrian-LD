import https from 'https';
// URL base de la API
const BASE_URL = 'https://wizard-world-api.herokuapp.com/Spells';
// Función findSpell
const findSpell = (name = '', type = '') => {
    return new Promise((resolve, reject) => {
        let url = `${BASE_URL}?`;
        // Construir la URL con los parámetros si están definidos
        if (name)
            url += `name=${encodeURIComponent(name)}&`;
        if (type)
            url += `type=${encodeURIComponent(type)}&`;
        // Eliminar el último "&" si es necesario
        url = url.endsWith('&') ? url.slice(0, -1) : url;
        console.log('URL de la petición:', url); // Para verificar la URL de la consulta
        // Realizamos la petición https
        https.get(url, (response) => {
            let data = '';
            // Acumulamos los datos de la respuesta
            response.on('data', (chunk) => {
                data += chunk;
            });
            // Cuando finalice la respuesta
            response.on('end', () => {
                try {
                    const spells = JSON.parse(data);
                    // Imprimimos la respuesta cruda para depuración
                    console.log('Respuesta de la API:', spells);
                    // Si no se encuentran hechizos, rechazamos la promesa
                    if (spells.length === 0) {
                        return reject('No se encontraron hechizos. Intenta con otros parámetros.');
                    }
                    // Devolvemos los hechizos encontrados
                    resolve(spells);
                }
                catch (error) {
                    reject('Error al procesar la respuesta: ' + error.message);
                }
            });
        }).on('error', (error) => {
            reject(`Error en la petición HTTP: ${error.message}`);
        });
    });
};
findSpell('Expelliarmus', 'Charm') // Ambos parámetros
    .then((spells) => {
    console.log('Hechizos encontrados:', spells);
})
    .catch((error) => {
    console.log('Error:', error);
});
