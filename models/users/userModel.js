import { promises as fs } from 'fs';

export class UserModel {
  static async getAll() {
    try {
      const data = await fs.readFile('./data/users.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }
}
