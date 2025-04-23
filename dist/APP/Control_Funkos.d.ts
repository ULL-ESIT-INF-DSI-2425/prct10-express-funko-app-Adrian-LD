import { Funko } from './Funko_id.js';
import { Response } from './funko_type.js';
export declare class FunkoManager {
    private username;
    private readonly userDir;
    constructor(username: string);
    private getFunkoPath;
    private ensureUserDir;
    addFunko(funko: Funko): Promise<Response>;
    updateFunko(funko: Funko): Promise<Response>;
    deleteFunko(id: number): Promise<Response>;
    getFunko(id: number): Promise<Response>;
    listFunkos(): Promise<Response>;
}
