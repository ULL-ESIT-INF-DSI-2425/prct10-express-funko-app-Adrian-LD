/**
 * Tipos para la aplicación de Funko Pops
 */

export enum FunkoType {
    POP = 'Pop!',
    POP_RIDES = 'Pop! Rides',
    VINYL_SODA = 'Vynil Soda',
    VINYL_GOLD = 'Vynil Gold',
    OTHER = 'Other'
  }
  
  export enum FunkoGenre {
    ANIMATION = 'Animación',
    MOVIES_TV = 'Películas y TV',
    VIDEOGAMES = 'Videojuegos',
    SPORTS = 'Deportes',
    MUSIC = 'Música',
    ANIME = 'Ánime',
    OTHER = 'Otro'
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