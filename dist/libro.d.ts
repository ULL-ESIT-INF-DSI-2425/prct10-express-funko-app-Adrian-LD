export declare class Libro {
    id: number;
    titulo: string;
    autor: string;
    genero: string;
    año: number;
    paginas: number;
    constructor(id: number, titulo: string, autor: string, genero: string, año: number, paginas: number);
}
export type ResponseType = {
    success: boolean;
    message?: string;
    libro?: Libro;
    libros?: Libro[];
};
