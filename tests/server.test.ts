import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '../src/APP/server';
import { FunkoManager } from '../src/APP/Control_Funkos';
import { Funko } from '../src/APP/Funko_id';

// Mock del FunkoManager
vi.mock('../src/APP/Control_Funkos');

const testUser = 'testuser';
const testFunko = {
  id: 1,
  name: 'Test Funko',
  description: 'Test Description',
  type: 'Pop!',
  genre: 'Animación',
  franchise: 'Test Franchise',
  franchiseNumber: 1,
  exclusive: true,
  specialFeatures: 'Test Features',
  marketValue: 19.99
};

describe('API de Funko Pops', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  describe('Ruta raíz', () => {
    it('GET / - Debe devolver la documentación de la API', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'success',
        message: expect.any(String),
        endpoints: expect.any(Object),
        example: expect.any(String)
      });
    });
  });

  describe('Operaciones CRUD', () => {
    describe('Añadir Funko', () => {
      it('POST /funkos/:user - Debe añadir un nuevo Funko', async () => {
        vi.mocked(FunkoManager.prototype.addFunko).mockResolvedValue({
          success: true,
          message: 'Funko añadido correctamente',
          data: testFunko
        });

        const response = await request(app)
          .post(`/funkos/${testUser}`)
          .send(testFunko);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(FunkoManager.prototype.addFunko).toHaveBeenCalledWith(expect.any(Funko));
      });
    });

    describe('Listar Funkos', () => {
      it('GET /funkos/:user - Debe listar todos los Funkos de un usuario', async () => {
        vi.mocked(FunkoManager.prototype.listFunkos).mockResolvedValue({
          success: true,
          data: [testFunko]
        });

        const response = await request(app).get(`/funkos/${testUser}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0]).toEqual(testFunko);
      });
    });

    describe('Obtener Funko específico', () => {
      it('GET /funkos/:user/:id - Debe devolver un Funko específico', async () => {
        vi.mocked(FunkoManager.prototype.getFunko).mockResolvedValue({
          success: true,
          data: testFunko
        });

        const response = await request(app).get(`/funkos/${testUser}/1`);

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(testFunko);
      });
    });

    describe('Actualizar Funko', () => {
      it('PATCH /funkos/:user/:id - Debe actualizar un Funko existente', async () => {
        vi.mocked(FunkoManager.prototype.updateFunko).mockResolvedValue({
          success: true,
          message: 'Funko actualizado correctamente',
          data: testFunko
        });

        const response = await request(app)
          .patch(`/funkos/${testUser}/1`)
          .send(testFunko);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });

    describe('Eliminar Funko', () => {
      it('DELETE /funkos/:user/:id - Debe eliminar un Funko existente', async () => {
        vi.mocked(FunkoManager.prototype.deleteFunko).mockResolvedValue({
          success: true,
          message: 'Funko eliminado correctamente'
        });

        const response = await request(app).delete(`/funkos/${testUser}/1`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });

  describe('Manejo de errores', () => {
    it('Debe devolver 404 para rutas no existentes', async () => {
      const response = await request(app).get('/ruta-inexistente');
      expect(response.status).toBe(404);
    });

    it('Debe manejar errores internos del servidor', async () => {
      vi.mocked(FunkoManager.prototype.listFunkos).mockRejectedValue(new Error('Error de prueba'));

      const response = await request(app).get(`/funkos/${testUser}`);
      expect(response.status).toBe(500);
    });
  });
});