import request from "request";
import { personajes } from "./personaje.js";

/**
 * Filtro de atributos opccionales 
 */
type QueryFilter = {
  name?: string,
  gender?: string,
  race?:string,
  affiliation?: string,
}

/**
 * Personajes para inicalizar la funcion fincharacter
 */
const filter: QueryFilter = {
  name: 'Goku',
  gender: 'Male',
  race: 'Saiyan',
  affiliation: 'Z Fighter',
}


/**
 *  Funcion que accede a una api para consultar personajes
 * @param filter objeto que ocntiene las propiedades pedidas en el ejercicio
 * @returns todos los atributos del personaje que concuerde con el objeto pasado
 */
export function findCharacter(filter:QueryFilter):Promise<personajes[]> {
  const { name, gender, race, affiliation } = filter;
  const url = `https://dragonball-api.com/api/characters?name=${name}&gender=${gender}&race=${race}&affiliation=${affiliation}`;
  return new Promise<personajes[]>((resolve, reject) => {
    request({url: url, json:true}, (error: Error, response) => {
      if (error) {
        reject(error);
      } else if (!response.body || response.body.length === 0) {
        reject(new Error('No se encontraron personaje'));
      } else {
        resolve(response.body);
      }
    });
  });
};


