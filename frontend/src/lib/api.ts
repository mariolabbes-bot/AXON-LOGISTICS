/**
 * Cliente API para AXON LOGISTICS
 * Gestiona la comunicación con el backend de Render.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error at ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Verifica la salud de los servicios (Backend + DB)
 */
export async function getHealthStatus() {
  try {
    return await fetchFromAPI('/health');
  } catch (error) {
    return { status: 'Offline', database: 'Unknown' };
  }
}
