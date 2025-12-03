import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

// Crear un pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Probar conexión
async function testConnection() {
  try {
    await pool.query('SELECT NOW()');
    // console.log('Conectado a Postgres');
  } catch {
    // console.error('Error al conectar');
  }
}

// Ejecutar solo si no es test
if (process.env.NODE_ENV !== 'test') {
  testConnection();
}

export { testConnection };
export default pool;
