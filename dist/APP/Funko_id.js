/**
 * Clase que representa un Funko Pop
 */
export class Funko {
    id;
    name;
    description;
    type;
    genre;
    franchise;
    franchiseNumber;
    exclusive;
    specialFeatures;
    marketValue;
    constructor(id, name, description, type, genre, franchise, franchiseNumber, exclusive, specialFeatures, marketValue) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.genre = genre;
        this.franchise = franchise;
        this.franchiseNumber = franchiseNumber;
        this.exclusive = exclusive;
        this.specialFeatures = specialFeatures;
        this.marketValue = marketValue;
    }
    /**
     * Convierte el Funko a un objeto JSON
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            type: this.type,
            genre: this.genre,
            franchise: this.franchise,
            franchiseNumber: this.franchiseNumber,
            exclusive: this.exclusive,
            specialFeatures: this.specialFeatures,
            marketValue: this.marketValue
        };
    }
    /**
     * Crea un Funko desde un objeto JSON
     */
    static fromJSON(json) {
        return new Funko(json.id, json.name, json.description, json.type, json.genre, json.franchise, json.franchiseNumber, json.exclusive, json.specialFeatures, json.marketValue);
    }
}
