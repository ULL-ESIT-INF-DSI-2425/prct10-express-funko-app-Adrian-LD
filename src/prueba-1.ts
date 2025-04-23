import request from 'request';

export interface Spell {
  id: string;
  name: string;
  incantation: string;
  effect: string;
  canBeVerbal: boolean;
  type: string;
  light: string;
  creator: string;
}

export function findSpell(name: string = '', type: string = '',incantation: string = ''): Promise<Spell[]> {
  const url = `https://wizard-world-api.herokuapp.com/Spells?name=${name}&type=${type}&incantation=${incantation}`;

  return new Promise<Spell[]>((resolve, reject) => {
    request({ url, json: true }, (error: Error, response) => {
      if (error) {
        reject(error);
      } else if (!response.body || response.body.length === 0) {
        reject(new Error('No se encontraron hechizos.'));
      } else {
        resolve(response.body);
      }
    });
  });
}
