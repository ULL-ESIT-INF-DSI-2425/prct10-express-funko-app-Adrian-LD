import request from "request";
const filter = {
    name: 'Goku',
    gender: 'Male',
    race: 'Saiyan',
    affiliation: 'Z Fighter',
};
export function findCharacter(filter) {
    const { name, gender, race, affiliation } = filter;
    const url = `https://dragonball-api.com/api/characters?name=${name}&gender=${gender}&race=${race}&affiliation=${affiliation}`;
    return new Promise((resolve, reject) => {
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                reject(error);
            }
            else if (!response.body || response.body.length === 0) {
                reject(new Error('No se encontraron personaje'));
            }
            else {
                resolve(response.body);
            }
        });
    });
}
;
