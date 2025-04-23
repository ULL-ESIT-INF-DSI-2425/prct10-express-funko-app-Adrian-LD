/**
 * Tipos para la aplicación de Funko Pops
 */
export declare enum FunkoType {
    POP = "Pop!",
    POP_RIDES = "Pop! Rides",
    VINYL_SODA = "Vynil Soda",
    VINYL_GOLD = "Vynil Gold",
    OTHER = "Other"
}
export declare enum FunkoGenre {
    ANIMATION = "Animaci\u00F3n",
    MOVIES_TV = "Pel\u00EDculas y TV",
    VIDEOGAMES = "Videojuegos",
    SPORTS = "Deportes",
    MUSIC = "M\u00FAsica",
    ANIME = "\u00C1nime",
    OTHER = "Otro"
}
export interface FunkoPop {
    id: number;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    franchiseNumber: number;
    exclusive: boolean;
    specialFeatures: string;
    marketValue: number;
}
export interface Response {
    success: boolean;
    message?: string;
    data?: FunkoPop | FunkoPop[];
}
