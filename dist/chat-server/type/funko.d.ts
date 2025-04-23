export type FunkoType = 'Pop!' | 'Pop! Rides' | 'Vynil Soda';
export type FunkoGenre = 'Movies' | 'Games' | 'Anime';
export interface Funko {
    id: number;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    marketValue: number;
}
