import { readJSON } from '../utils/readJson.js';

const users = readJSON('../data/users.json');

export class UserModel {
  static async getAll() {
    return users;
  }
}
