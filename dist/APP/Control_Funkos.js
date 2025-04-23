import { promises as fs } from 'fs';
import path from 'path';
export class FunkoManager {
    username;
    userDir;
    constructor(username) {
        this.username = username;
        this.userDir = path.join(__dirname, '../users', username);
    }
    getFunkoPath(id) {
        return path.join(this.userDir, `${id}.json`);
    }
    async ensureUserDir() {
        try {
            await fs.mkdir(this.userDir, { recursive: true });
        }
        catch (err) {
            if (err.code !== 'EEXIST')
                throw err;
        }
    }
    async addFunko(funko) {
        await this.ensureUserDir();
        const funkoPath = this.getFunkoPath(funko.id);
        try {
            await fs.access(funkoPath);
            return {
                success: false,
                message: `Funko with ID ${funko.id} already exists for user ${this.username}`
            };
        }
        catch {
            await fs.writeFile(funkoPath, JSON.stringify(funko.toJSON(), null, 2));
            return {
                success: true,
                message: 'Funko added successfully',
                data: funko.toJSON()
            };
        }
    }
    async updateFunko(funko) {
        const funkoPath = this.getFunkoPath(funko.id);
        try {
            await fs.access(funkoPath);
            await fs.writeFile(funkoPath, JSON.stringify(funko.toJSON(), null, 2));
            return {
                success: true,
                message: 'Funko updated successfully',
                data: funko.toJSON()
            };
        }
        catch {
            return {
                success: false,
                message: `Funko with ID ${funko.id} not found for user ${this.username}`
            };
        }
    }
    async deleteFunko(id) {
        const funkoPath = this.getFunkoPath(id);
        try {
            await fs.access(funkoPath);
            await fs.unlink(funkoPath);
            return {
                success: true,
                message: 'Funko deleted successfully'
            };
        }
        catch {
            return {
                success: false,
                message: `Funko with ID ${id} not found for user ${this.username}`
            };
        }
    }
    async getFunko(id) {
        const funkoPath = this.getFunkoPath(id);
        try {
            const data = await fs.readFile(funkoPath, 'utf-8');
            const funkoJson = JSON.parse(data);
            return {
                success: true,
                data: funkoJson
            };
        }
        catch {
            return {
                success: false,
                message: `Funko with ID ${id} not found for user ${this.username}`
            };
        }
    }
    async listFunkos() {
        try {
            await fs.access(this.userDir);
            const files = await fs.readdir(this.userDir);
            const funkoPromises = files.map(async (file) => {
                const data = await fs.readFile(path.join(this.userDir, file), 'utf-8');
                return JSON.parse(data);
            });
            const funkos = await Promise.all(funkoPromises);
            return {
                success: true,
                data: funkos
            };
        }
        catch {
            return {
                success: false,
                message: `No funkos found for user ${this.username}`
            };
        }
    }
}
