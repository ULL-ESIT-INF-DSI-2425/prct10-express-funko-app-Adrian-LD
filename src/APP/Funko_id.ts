import { FunkoPop, FunkoType, FunkoGenre } from './funko_type.js';
/**
 * Clase que representa un Funko Pop
 */
export class Funko {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public type: FunkoType,
    public genre: FunkoGenre,
    public franchise: string,
    public franchiseNumber: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public marketValue: number
  ) {}

  /**
   * Convierte el Funko a un objeto JSON
   */
  toJSON(): FunkoPop {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      genre: this.genre,
      franchise: this.franchise,
      franchiseNumber: this.franchiseNumber,
      exclusive: this.exclusive,
      specialFeatures: this.specialFeatures,
      marketValue: this.marketValue
    };
  }

  /**
   * Crea un Funko desde un objeto JSON
   */
  static fromJSON(json: FunkoPop): Funko {
    return new Funko(
      json.id,
      json.name,
      json.description,
      json.type,
      json.genre,
      json.franchise,
      json.franchiseNumber,
      json.exclusive,
      json.specialFeatures,
      json.marketValue
    );
  }
}