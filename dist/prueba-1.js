import request from 'request';
export function findSpell(name = '', type = '', incantation = '') {
    const url = `https://wizard-world-api.herokuapp.com/Spells?name=${name}&type=${type}&incantation=${incantation}`;
    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, response) => {
            if (error) {
                reject(error);
            }
            else if (!response.body || response.body.length === 0) {
                reject(new Error('No se encontraron hechizos.'));
            }
            else {
                resolve(response.body);
            }
        });
    });
}
