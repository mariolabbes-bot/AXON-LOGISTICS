import * as fs from 'fs';

/**
 * AXON LOGISTICS - Script de Ingesta de Facturas
 * Este script procesa datos planos (JSON/CSV) y los normaliza en la base de datos.
 */

interface RawInvoiceItem {
    sku: string;
    description: string;
    quantity: number;
    price: number;
}

interface RawInvoiceData {
    folio: string;
    emission_date: string;
    monto_total: number;
    client: {
        rut: string;
        name: string;
        address: string;
        commune: string;
    };
    items: RawInvoiceItem[];
}

interface ProcessResult {
    success: boolean;
    folio: string;
    error?: string;
}

/**
 * Simulación de Geocodificación Silenciosa
 */
async function getCoordinates(address: string, commune: string) {
    console.log(`[Geocoding] Consultando: ${address}, ${commune}...`);
    // En una implementación real, aquí se llamaría a Google Maps API o similar.
    return {
        lat: -33.4489 + (Math.random() * 0.1),
        lng: -70.6693 + (Math.random() * 0.1)
    };
}

/**
 * Lógica Principal de Ingesta
 */
export async function ingestInvoices(filePath: string) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const invoices: RawInvoiceData[] = JSON.parse(rawData);
    
    const results: ProcessResult[] = [];
    const failedRows: any[] = [];

    for (const data of invoices) {
        try {
            console.log(`\n>>> Procesando Folio: ${data.folio}`);

            // 1. VALIDACIÓN: Folio duplicado (Simulación de DB)
            // if (await db.findInvoiceByFolio(data.folio)) throw new Error('Folio Duplicado');

            // 2. IDEMPOTENCIA: Upsert Cliente
            // const coords = await getCoordinates(data.client.address, data.client.commune);
            // await db.upsertCliente({...data.client, ...coords});

            // 3. IDEMPOTENCIA: Upsert Productos e ítems
            for (const item of data.items) {
                // await db.upsertProducto({sku: item.sku, description: item.description});
            }

            // 4. PERSISTENCIA: Cabecera y Detalle con Trazabilidad Inicial
            /*
            const invoiceId = await db.insertInvoice({
                folio: data.folio,
                cliente_id: clientId,
                fecha_emision: data.emission_date,
                monto_total: data.monto_total
            });

            for (const item of data.items) {
                await db.insertDetail({
                    invoice_id: invoiceId,
                    sku: item.sku,
                    cant_facturada: item.quantity,
                    cant_despachada_bodega: null, // Pendiente Picking
                    cant_recibida_cliente: null   // Pendiente Entrega
                });
            }
            */

            results.push({ success: true, folio: data.folio });
            console.log(`[OK] Ingesta completada para Folio ${data.folio}`);

        } catch (error: any) {
            console.error(`[ERROR] Falló Folio ${data.folio}: ${error.message}`);
            
            // LOG DE ERRORES: Registro en tabla de errores para reporte final
            failedRows.push({
                folio_referencia: data.folio,
                error_mensaje: error.message,
                data_original: data
            });

            results.push({ success: false, folio: data.folio, error: error.message });
        }
    }

    // Reporte de Finalización
    console.log("\n========================================");
    console.log("REPORTE FINAL DE INGESTA");
    console.log(`Exitosos: ${results.filter(r => r.success).length}`);
    console.log(`Fallidos: ${results.filter(r => !r.success).length}`);
    console.log("========================================\n");

    if (failedRows.length > 0) {
        console.log("Detalle de Filas Fallidas:");
        failedRows.forEach(f => console.log(`- Folio ${f.folio_referencia}: ${f.error_mensaje}`));
    }

    return { results, failedRows };
}
