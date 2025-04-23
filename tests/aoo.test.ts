import { describe, it, expect } from 'vitest';
import { findSpell } from '../src/prueba-1.js';
describe('findSpell', () => {
  it('debería encontrar al menos un hechizo válido con nombre', async () => {
    const spells = await findSpell('Accio');
    expect(spells.length).toBeGreaterThan(0);
    expect(spells[0]).toHaveProperty('name');
  });

  it('debería lanzar un error si no se encuentra ningún hechizo', async () => {
    try {
      await findSpell('HechizoInexistente123');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('No se encontraron hechizos.');
    }
  });

});
