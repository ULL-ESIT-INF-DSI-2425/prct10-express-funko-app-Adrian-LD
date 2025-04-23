import { FunkoPop, FunkoType, FunkoGenre } from './funko_type.js';
/**
 * Clase que representa un Funko Pop
 */
export declare class Funko {
    readonly id: number;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    franchiseNumber: number;
    exclusive: boolean;
    specialFeatures: string;
    marketValue: number;
    constructor(id: number, name: string, description: string, type: FunkoType, genre: FunkoGenre, franchise: string, franchiseNumber: number, exclusive: boolean, specialFeatures: string, marketValue: number);
    /**
     * Convierte el Funko a un objeto JSON
     */
    toJSON(): FunkoPop;
    /**
     * Crea un Funko desde un objeto JSON
     */
    static fromJSON(json: FunkoPop): Funko;
}
