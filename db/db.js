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
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado a Postgres:', res.rows[0]);
  } catch (err) {
    console.error('Error al conectar:', err);
  }
}

testConnection();

export default pool;
