import express, { Request, Response, NextFunction, Application } from 'express';
import { Funko } from './Funko_id.js';
import { FunkoManager } from './Control_Funkos.js';
import { FunkoPop, Response as ApiResponse } from './funko_type.js';

const app: Application = express();
const port = 3000;

app.use(express.json());

// Ruta de bienvenida
app.get('/', (req: Request, res: Response): void => {
    res.json({
        status: 'success',
        message: 'Bienvenido a la API de gestión de Funko Pops',
        endpoints: {
            list: 'GET /funkos/:user',
            get: 'GET /funkos/:user/:id',
            add: 'POST /funkos/:user',
            update: 'PATCH /funkos/:user/:id',
            delete: 'DELETE /funkos/:user/:id'
        },
        example: 'Prueba GET /funkos/testuser'
    });
});

// Middleware para validar usuario - Versión corregida
app.use('/funkos/:user', (req: Request, res: Response, next: NextFunction): void => {
    if (!req.params.user || req.params.user.trim() === '') {
        res.status(400).json({
            success: false,
            message: 'El nombre de usuario es requerido'
        });
        return;
    }
    next();
});

// Añadir un Funko - Versión corregida
app.post('/funkos/:user', async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.params;
        const funkoData: FunkoPop = req.body;

        if (!funkoData.id || !funkoData.name) {
            res.status(400).json({
                success: false,
                message: 'Los campos id y name son obligatorios'
            });
            return;
        }

        const funko = Funko.fromJSON(funkoData);
        const manager = new FunkoManager(user);
        const result = await manager.addFunko(funko);

        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        console.error('Error en POST /funkos/:user:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Listar todos los Funkos de un usuario - Versión corregida
app.get('/funkos/:user', async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.params;
        const manager = new FunkoManager(user);
        const result = await manager.listFunkos();

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error('Error en GET /funkos/:user:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Obtener un Funko específico - Versión corregida
app.get('/funkos/:user/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            res.status(400).json({
                success: false,
                message: 'El ID debe ser un número'
            });
            return;
        }

        const manager = new FunkoManager(user);
        const result = await manager.getFunko(numericId);

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error('Error en GET /funkos/:user/:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar un Funko - Versión corregida
app.patch('/funkos/:user/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, id } = req.params;
        const funkoData: FunkoPop = req.body;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            res.status(400).json({
                success: false,
                message: 'El ID debe ser un número'
            });
            return;
        }

        if (numericId !== funkoData.id) {
            res.status(400).json({
                success: false,
                message: 'El ID en la ruta no coincide con el ID en el cuerpo'
            });
            return;
        }

        const funko = Funko.fromJSON(funkoData);
        const manager = new FunkoManager(user);
        const result = await manager.updateFunko(funko);

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error('Error en PATCH /funkos/:user/:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Eliminar un Funko - Versión corregida
app.delete('/funkos/:user/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            res.status(400).json({
                success: false,
                message: 'El ID debe ser un número'
            });
            return;
        }

        const manager = new FunkoManager(user);
        const result = await manager.deleteFunko(numericId);

        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        console.error('Error en DELETE /funkos/:user/:id:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Manejo de rutas no encontradas
app.use((req: Request, res: Response): void => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Iniciar el servidor
app.listen(port, (): void => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});