"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirección del lado del cliente para mayor estabilidad en Vercel
    router.replace('/driver');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-axon-orange border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse uppercase tracking-widest text-xs">
          Cargando AXON LOGISTICS...
        </p>
      </div>
    </div>
  );
}
