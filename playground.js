import { UserModel } from './models/user/userModel.js';
import pool from './db/db.js';

try {
  const userData = {
    userCode: 'U005',
    firstName: 'María',
    lastName: 'Gómez',
    dni: '87632d31',
    email: 'mar1aiaa@example.com',
    role: 'estudiante',
    passwordHash: 'clave123',
  };

  const result = await UserModel.insert(userData);
  console.log('Resultado insert:', result);

  const res = await pool.query('SELECT * FROM usuarios');
  console.log('Usuarios en la BD:');
  console.log(res.rows);
} catch (error) {
  console.error('Error en playground:', error);
} finally {
  await pool.end();
}
