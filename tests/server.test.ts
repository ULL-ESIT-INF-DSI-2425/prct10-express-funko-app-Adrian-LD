import { describe, expect, test } from "vitest";
import { findCharacter } from "../src/modi-hoy";

describe("test", () => {
  test("", () => 
    new Promise<void>((done) => {
      const filter = {
        name: "Goku",
        gender: "Male",
        race: "Saiyan",
        affiliation: "Z Fighter",
      };

      findCharacter(filter)
        .then((characters) => {
          expect(characters.length).to.be.greaterThan(0); 
          expect(characters[0].name).to.be.equal("Goku"); 
          expect(characters[0].name).to.be.equal("Male"); 
          expect(characters[0].name).to.be.equal("Saiyan"); 
          expect(characters[0].name).to.be.equal("Z Fighter"); 
          done();
        })
        .catch((error) => {
          done(error); 
        });
    }));

  test("", () => 
    new Promise<void>((done) => {
      const filter = {
        name: "4",
        gender: "Male",
        race: "Saiyan",
        affiliation: "Z Fighter",
      };

      findCharacter(filter)
        .then(() => {
          done(console.log("Error"));
        })
        .catch((error) => {
          expect(error.message).to.be.equal("No se encontraron personaje");
          done();
        });
    }));

    test("", () => 
      new Promise<void>((done) => {
        const filter = {
          name: "Bulma",
          gender: "Female",
          race: "Human",
          affiliation: "Z Fighter",
        };
  
        findCharacter(filter)
          .then((characters) => {
            expect(characters.length).to.be.greaterThan(0); 
            expect(characters[0].name).to.be.equal("Bulman"); 
            expect(characters[1].gender).to.be.equal("Female");
            expect(characters[2].race).to.be.equal("Human"); 
            expect(characters[3].affiliation).to.be.equal("Z Fighter");
            done();
          })
          .catch((error) => {
            done(error); 
          });
      }));

      test("", () => 
        new Promise<void>((done) => {
          const filter = {
            name: "",
            gender: "",
            race: "",
            affiliation: "",
          };
    
          findCharacter(filter)
            .then((characters) => {
              expect(characters.length).to.be.greaterThan(0); 
              done();
            })
            .catch((error) => {
              done(error); 
            });
        }));

});
