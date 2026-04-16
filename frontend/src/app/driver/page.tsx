"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Camera, 
  ChevronRight, 
  ScanLine,
  Menu,
  Sun,
  Moon,
  Activity
} from 'lucide-react';
import { getHealthStatus } from '@/lib/api';

/**
 * AXON LOGISTICS - Driver Dashboard (AXON CRM Identity)
 * Incluye Modo de Alto Contraste para visibilidad diurna.
 */
export default function DriverDashboard() {
  const [highContrast, setHighContrast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemStatus, setSystemStatus] = useState({ backend: 'checking', db: 'checking' });

  useEffect(() => {
    setIsLoaded(true);
    
    // Verificación inicial de salud
    const checkSystems = async () => {
      const health = await getHealthStatus();
      setSystemStatus({ 
        backend: health.status === 'OK' ? 'online' : 'offline', 
        db: health.database === 'Connected' ? 'online' : 'offline' 
      });
    };

    checkSystems();
    const interval = setInterval(checkSystems, 30000); // Re-check cada 30s
    return () => clearInterval(interval);
  }, []);

  // Datos simulados (AXON CRM Context)
  const nextStop = {
    client: "Supermercado Central S.A.",
    address: "Av. Principal 4500, Santiago",
    invoices: ["F-1001", "F-1002"],
    items: 24,
    priority: "Alta"
  };

  const toggleContrast = () => setHighContrast(!highContrast);

  if (!isLoaded) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${highContrast ? 'high-contrast' : ''} bg-[var(--background)] text-[var(--foreground)] font-sans max-w-md mx-auto shadow-2xl relative`}>
      
      {/* Header Premium (Basado en AXON CRM theme) */}
      <header className={`px-6 py-8 rounded-b-[2.5rem] shadow-xl border-b transition-all duration-300 ${highContrast ? 'bg-white border-slate-200' : 'bg-slate-900/60 backdrop-blur-xl border-white/5'}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${highContrast ? 'bg-slate-100 border-slate-300' : 'bg-axon-orange/20 border-axon-orange/40'}`}>
              <span className={`font-black text-lg ${highContrast ? 'text-black' : 'text-axon-orange'}`}>MC</span>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${highContrast ? 'text-slate-500' : 'text-slate-400'}`}>Operativo Terreno</p>
              <h2 className="font-extrabold text-xl tracking-tight">Mario Cárcamo</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Indicador de Conexión */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
              systemStatus.db === 'online' ? 'bg-axon-teal/10 text-axon-teal' : 'bg-red-500/10 text-red-500'
            }`}>
              <Activity size={10} className={systemStatus.db === 'online' ? 'animate-pulse' : ''} />
              {systemStatus.db === 'online' ? 'DB Online' : 'DB Offline'}
            </div>

            {/* Toggle de Contraste (Requerimiento Crítico) */}
            <motion.button 
            onClick={toggleContrast}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-2xl transition-colors ${highContrast ? 'bg-axon-orange text-white' : 'bg-white/5 text-axon-orange border border-white/10'}`}
          >
            {highContrast ? <Moon size={22} /> : <Sun size={22} />}
          </motion.button>
        </div>

        {/* Stats Grid con estilo CRM */}
        <div className={`grid grid-cols-3 gap-3 p-4 rounded-3xl transition-all ${highContrast ? 'bg-slate-50 border border-slate-200' : 'bg-black/20 border border-white/5'}`}>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Paradas</p>
            <p className={`text-2xl font-black ${highContrast ? 'text-black' : 'text-white'}`}>12</p>
          </div>
          <div className="text-center border-x border-slate-500/20">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Pend.</p>
            <p className={`text-2xl font-black ${highContrast ? 'text-black' : 'text-axon-orange'}`}>8</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Entregas</p>
            <p className={`text-2xl font-black ${highContrast ? 'text-black' : 'text-axon-teal'}`}>4</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${highContrast ? 'text-slate-400' : 'text-slate-500'}`}>Carga Actual (LIFO)</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${highContrast ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-400'}`}>
            ID: AS-992
          </span>
        </div>

        {/* Próxima Parada (Card estilo AXON CRM) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`group overflow-hidden relative p-7 rounded-[2.5rem] shadow-2xl transition-all duration-500 ${
            highContrast 
              ? 'bg-white border-2 border-black shadow-none' 
              : 'bg-glass backdrop-blur-2xl border border-white/10 hover:border-white/20'
          }`}
        >
          {/* Badge de Prioridad */}
          <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest ${
            highContrast ? 'bg-black text-white' : 'bg-axon-orange text-white'
          }`}>
            {nextStop.priority}
          </div>

          <div className="relative z-10">
            <h4 className={`text-2xl font-black mb-1 leading-tight tracking-tight ${highContrast ? 'text-black' : 'text-slate-100'}`}>
              {nextStop.client}
            </h4>
            
            <div className="flex items-center gap-2 mb-6 opacity-70">
              <MapPin size={14} className={highContrast ? 'text-black' : 'text-axon-orange'} />
              <p className={`text-xs font-medium truncate ${highContrast ? 'text-slate-700' : 'text-slate-300'}`}>{nextStop.address}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                    highContrast 
                      ? 'bg-slate-100 border-black text-black' 
                      : 'bg-slate-800 border-white/20 text-axon-orange backdrop-blur-md'
                  }`}>
                    DOC
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none ${highContrast ? 'text-slate-500' : 'text-slate-400'}`}>Total SKUs</p>
                <p className="text-xl font-black">{nextStop.items}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Center */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all ${
              highContrast 
                ? 'bg-white border-2 border-black' 
                : 'bg-slate-800/40 border border-white/10 hover:bg-axon-orange/10 hover:border-axon-orange/50'
            }`}
          >
            <div className={`p-4 rounded-2xl ${highContrast ? 'bg-black text-white' : 'bg-axon-orange/20 text-axon-orange'}`}>
              <ScanLine size={28} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Escanear</span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all ${
              highContrast 
                ? 'bg-black text-white shadow-[8px_8px_0px_rgba(32,168,146,0.3)]' 
                : 'bg-axon-teal-gradient shadow-xl shadow-axon-teal/20'
            }`}
          >
            <div className={`p-4 rounded-2xl ${highContrast ? 'bg-white text-black' : 'bg-white/20 text-white'}`}>
              <CheckCircle2 size={28} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Finalizar</span>
          </motion.button>
        </div>

        {/* Seccion Critica: Logística Inversa */}
        <motion.button 
          whileHover={{ x: 5 }}
          className={`mt-6 w-full py-6 px-7 rounded-3xl flex justify-between items-center transition-all ${
            highContrast 
              ? 'bg-slate-100 border-2 border-black' 
              : 'bg-red-500/10 border border-red-500/20 hover:bg-red-500/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${highContrast ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-500'}`}>
              <Camera size={20} />
            </div>
            <div className="text-left">
              <span className={`block text-[11px] font-black uppercase tracking-widest ${highContrast ? 'text-black' : 'text-red-400'}`}>Logística Inversa</span>
              <span className={`text-[10px] font-medium opacity-60`}>Devoluciones y Faltantes</span>
            </div>
          </div>
          <ChevronRight size={18} className={highContrast ? 'text-black' : 'text-red-500'} />
        </motion.button>
      </main>

      {/* Navigation Bar Glassmorphism */}
      <footer className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] py-4 px-10 rounded-[2.5rem] flex justify-between items-center z-50 transition-all shadow-2xl ${
        highContrast 
          ? 'bg-white border-2 border-black' 
          : 'bg-slate-900/80 backdrop-blur-3xl border border-white/5'
      }`}>
        <Truck className={highContrast ? 'text-black' : 'text-axon-orange'} size={24} />
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${highContrast ? 'bg-black' : 'bg-white/5 border border-white/10'}`}>
          <Package className={highContrast ? 'text-white' : 'text-slate-400'} size={22} />
        </div>
        <MapPin className="text-slate-500" size={24} />
      </footer>
    </div>
  );
}
