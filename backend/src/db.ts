import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

/**
 * Instancia de conexión a Neon (Serverless)
 */
export const sql = neon(process.env.DATABASE_URL);

/**
 * Función para verificar la salud de la conexión
 */
export async function checkConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return { success: true, time: result[0]?.current_time };
  } catch (error: any) {
    console.error('Database connection error:', error.message);
    return { success: false, error: error.message };
  }
}
