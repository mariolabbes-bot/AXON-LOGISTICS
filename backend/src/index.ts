import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sql, checkConnection } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  const dbStatus = await checkConnection();
  res.json({ 
    status: 'OK', 
    service: 'AXON LOGISTICS Backend',
    database: dbStatus.success ? 'Connected' : 'Error',
    db_time: dbStatus.time || null,
    error: dbStatus.error || null
  });
});

/**
 * Endpoint de Enrolamiento de Facturas (Admin Desktop)
 */
app.patch('/api/invoices/enroll', async (req, res) => {
  const { invoice_id, barcode, method } = req.body; // method: 'Scan' | 'Manual'
  
  try {
    // 1. Validar unicidad del código (Postgres lo hará, pero manejamos el error)
    // const result = await sql`UPDATE facturas SET codigo_barra_etiqueta = ${barcode} WHERE id = ${invoice_id}`;
    
    // 2. Registrar Auditoría
    // await sql`INSERT INTO auditoria_operativa (entidad_tipo, entidad_id, metodo_ingreso, detalles) 
    //           VALUES ('Factura', ${invoice_id}, ${method}, 'Vinculación de etiqueta')`;
    
    res.json({ success: true, message: 'Factura vinculada correctamente' });
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
        return res.status(409).json({ error: 'El código de barras ya está asignado a otra factura' });
    }
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint de Enrolamiento en Caliente de Productos (Mobile)
 */
app.patch('/api/products/enroll', async (req, res) => {
  const { sku, barcode_ean, method } = req.body;

  try {
    // 1. Simulación de lógica de concurrencia:
    // SELECT codigo_barra_ean FROM productos WHERE sku = ${sku}
    // Si ya tiene código y es diferente -> Conflicto
    // Si no tiene -> UPDATE
    
    // await sql`INSERT INTO auditoria_operativa (entidad_tipo, metodo_ingreso, detalles) 
    //           VALUES ('Producto', ${method}, ${`Enrolamiento SKU: ${sku}`})`;

    res.json({ success: true, message: 'Producto enrolado globalmente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`AXON LOGISTICS API running at http://localhost:${port}`);
});
