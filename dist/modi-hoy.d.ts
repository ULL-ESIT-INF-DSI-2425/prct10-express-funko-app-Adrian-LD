import { personajes } from "./personaje.js";
type QueryFilter = {
    name?: string;
    gender?: string;
    race?: string;
    affiliation?: string;
};
export declare function findCharacter(filter: QueryFilter): Promise<personajes[]>;
export {};
