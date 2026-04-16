import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

async function init() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DATABASE_URL found in .env");
    return;
  }

  const sql = neon(connectionString);
  const schemaPath = path.join(__dirname, '../database/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  console.log("Iniciando creación de tablas en Neon...");
  
  try {
    // El driver de neon-serverless prefiere ejecutar comandos individuales o bloques limpios.
    // Separamos por punto y coma para mayor seguridad (aunque no es perfecto con comentarios).
    const commands = schema
      .split(';')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    for (const cmd of commands) {
      await sql(cmd);
    }

    console.log("✅ Tablas creadas exitosamente en Neon.");
  } catch (err) {
    console.error("❌ Error al inicializar base de datos:", err);
  }
}

init();
