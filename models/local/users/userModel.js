import { promises as fs } from 'fs';
import { randomUUID as uuid } from 'crypto';

import data from '../../../data/users.json' with { type: 'json' };

export class UserModel {
  static async getAll() {
    return data;
  }

  static async insert(user) {
    const newUser = {
      id: uuid(),
      ...user,
    };
    data.push(newUser);

    return newUser;
  }
}
