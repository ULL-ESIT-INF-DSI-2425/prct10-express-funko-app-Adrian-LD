import { promises as fs } from 'fs';
import path from 'path';
import { Funko } from './Funko_id.js';
import { FunkoPop, Response } from './funko_type.js';

export class FunkoManager {
  private readonly userDir: string;

  constructor(private username: string) {
    this.userDir = path.join(__dirname, '../users', username);
  }

  private getFunkoPath(id: number): string {
    return path.join(this.userDir, `${id}.json`);
  }

  private async ensureUserDir(): Promise<void> {
    try {
      await fs.mkdir(this.userDir, { recursive: true });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err;
    }
  }

  public async addFunko(funko: Funko): Promise<Response> {
    await this.ensureUserDir();
    const funkoPath = this.getFunkoPath(funko.id);

    try {
      await fs.access(funkoPath);
      return {
        success: false,
        message: `Funko with ID ${funko.id} already exists for user ${this.username}`
      };
    } catch {
      await fs.writeFile(funkoPath, JSON.stringify(funko.toJSON(), null, 2));
      return {
        success: true,
        message: 'Funko added successfully',
        data: funko.toJSON()
      };
    }
  }

  public async updateFunko(funko: Funko): Promise<Response> {
    const funkoPath = this.getFunkoPath(funko.id);

    try {
      await fs.access(funkoPath);
      await fs.writeFile(funkoPath, JSON.stringify(funko.toJSON(), null, 2));
      return {
        success: true,
        message: 'Funko updated successfully',
        data: funko.toJSON()
      };
    } catch {
      return {
        success: false,
        message: `Funko with ID ${funko.id} not found for user ${this.username}`
      };
    }
  }

  public async deleteFunko(id: number): Promise<Response> {
    const funkoPath = this.getFunkoPath(id);

    try {
      await fs.access(funkoPath);
      await fs.unlink(funkoPath);
      return {
        success: true,
        message: 'Funko deleted successfully'
      };
    } catch {
      return {
        success: false,
        message: `Funko with ID ${id} not found for user ${this.username}`
      };
    }
  }

  public async getFunko(id: number): Promise<Response> {
    const funkoPath = this.getFunkoPath(id);

    try {
      const data = await fs.readFile(funkoPath, 'utf-8');
      const funkoJson: FunkoPop = JSON.parse(data);
      return {
        success: true,
        data: funkoJson
      };
    } catch {
      return {
        success: false,
        message: `Funko with ID ${id} not found for user ${this.username}`
      };
    }
  }

  public async listFunkos(): Promise<Response> {
    try {
      await fs.access(this.userDir);
      const files = await fs.readdir(this.userDir);
      
      const funkoPromises = files.map(async file => {
        const data = await fs.readFile(path.join(this.userDir, file), 'utf-8');
        return JSON.parse(data) as FunkoPop;
      });
      
      const funkos = await Promise.all(funkoPromises);
      return {
        success: true,
        data: funkos
      };
    } catch {
      return {
        success: false,
        message: `No funkos found for user ${this.username}`
      };
    }
  }
}