import { Libro, ResponseType } from './libro.js';
export declare function addLibro(username: string, libro: Libro): Promise<ResponseType>;
export declare function getLibro(username: string, id: number): Promise<ResponseType>;
export declare function listLibros(username: string): Promise<ResponseType>;
export declare function deleteLibro(username: string, id: number): Promise<ResponseType>;
export declare function updateLibro(username: string, libro: Libro): Promise<ResponseType>;
