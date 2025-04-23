export class Libro {
    id;
    titulo;
    autor;
    genero;
    año;
    paginas;
    constructor(id, titulo, autor, genero, año, paginas) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.año = año;
        this.paginas = paginas;
    }
}
