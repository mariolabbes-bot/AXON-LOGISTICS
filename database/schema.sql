-- Schema Inicial AXON LOGISTICS
-- Fase 1: Ingesta y Trazabilidad

-- 1. Maestro de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    comuna VARCHAR(100) NOT NULL,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Maestro de Productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    precio_base NUMERIC(12, 2) DEFAULT 0,
    codigo_barra_ean VARCHAR(255) UNIQUE, -- Enrolamiento en caliente
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Cabecera de Facturas
CREATE TABLE IF NOT EXISTS facturas (
    id SERIAL PRIMARY KEY,
    folio VARCHAR(20) UNIQUE NOT NULL,
    cliente_id INTEGER REFERENCES clientes(id),
    fecha_emision DATE NOT NULL,
    monto_total NUMERIC(12, 2) DEFAULT 0,
    estado VARCHAR(50) DEFAULT 'Pendiente', -- Pendiente, En Despacho, Entregado, etc.
    codigo_barra_etiqueta VARCHAR(255) UNIQUE, -- Vinculación administrativa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Detalle de Facturas (Trazabilidad Etapa 1)
CREATE TABLE IF NOT EXISTS detalle_facturas (
    id SERIAL PRIMARY KEY,
    factura_id INTEGER REFERENCES facturas(id),
    producto_id INTEGER REFERENCES productos(id),
    precio_unitario NUMERIC(12, 2) NOT NULL,
    cant_facturada INTEGER NOT NULL,            -- Lo legal
    cant_despachada_bodega INTEGER,             -- Lo que salió físicamente (Picking)
    cant_recibida_cliente INTEGER,              -- Lo que aceptó el cliente (Entrega)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Log de Errores de Ingesta
CREATE TABLE IF NOT EXISTS log_errores_ingesta (
    id SERIAL PRIMARY KEY,
    folio_referencia VARCHAR(50),
    error_mensaje TEXT,
    data_original JSONB,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Auditoría Operativa (Trazabilidad de Ingresos)
CREATE TABLE IF NOT EXISTS auditoria_operativa (
    id SERIAL PRIMARY KEY,
    entidad_tipo VARCHAR(50), -- 'Factura' o 'Producto'
    entidad_id INTEGER,
    metodo_ingreso VARCHAR(20), -- 'Scan' o 'Manual'
    usuario_id INTEGER,
    detalles TEXT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_facturas_folio ON facturas(folio);
CREATE INDEX IF NOT EXISTS idx_clientes_rut ON clientes(rut);
CREATE INDEX IF NOT EXISTS idx_productos_sku ON productos(sku);
