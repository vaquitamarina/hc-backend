import { UserModel } from './models/user/userModel.js';
import pool from './db/db.js';
const result = await UserModel.login('2023-119018', 'vaquitaMarina1234');
console.log(result);

pool.end();
