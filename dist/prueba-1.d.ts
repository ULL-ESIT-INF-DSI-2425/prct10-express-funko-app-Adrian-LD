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
export declare function findSpell(name?: string, type?: string, incantation?: string): Promise<Spell[]>;
