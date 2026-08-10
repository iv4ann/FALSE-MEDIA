import React from 'react';

export default function Success({ onRestart }) {
  return (
    <div className="fixed inset-0 w-full h-screen bg-black flex flex-col items-center justify-center p-4 font-sans overflow-hidden z-[9999]">
      
      {/* Efecto Scanlines Retro */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-40"></div>

      {/* Viñetas decorativas en las esquinas */}
      <div className="absolute top-8 left-8 border-t-4 border-l-4 border-[#ff3f14] w-16 h-16 opacity-50 z-10"></div>
      <div className="absolute bottom-8 right-8 border-b-4 border-r-4 border-[#ff3f14] w-16 h-16 opacity-50 z-10"></div>
      <div className="absolute top-8 right-8 border-t-4 border-r-4 border-[#ff3f14] w-16 h-16 opacity-50 z-10"></div>
      <div className="absolute bottom-8 left-8 border-b-4 border-l-4 border-[#ff3f14] w-16 h-16 opacity-50 z-10"></div>

      <div className="relative z-30 w-full max-w-4xl bg-black/80 border-2 border-[#ff3f14] shadow-[8px_8px_0px_#ff3f14,0_0_50px_rgba(255,63,20,0.3)] p-10 md:p-16 text-center backdrop-blur-sm">
        
        {/* Encabezado Principal */}
        <div className="border-b-2 border-[#ff3f14]/50 pb-8 mb-8">
          <div className="inline-block bg-[#ff3f14] text-black font-vt323 text-2xl px-6 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#ffffff] mb-6 animate-pulse">
            Misión Completada
          </div>
          <h2 className="text-5xl md:text-7xl font-silkscreen text-white drop-shadow-[0_0_15px_rgba(255,63,20,0.8)]">
            DATOS TRANSMITIDOS
          </h2>
          <p className="text-3xl font-vt323 text-[#ff3f14] mt-4 tracking-wider">
            &gt; CONEXIÓN CERRADA CON ÉXITO_
          </p>
        </div>

        {/* Cuerpo del Mensaje */}
        <div className="px-4 mb-10">
          <p className="font-vt323 text-white/80 text-2xl leading-relaxed">
            Tu valiosa participación ha sido procesada en los servidores locales. 
            Estos registros de interacción formarán parte vital del reporte final de 
            <span className="text-[#ff3f14]"> FALSE-MEDIA </span> 
            sobre la alfabetización digital y la detección de Inteligencia Artificial en Durango.
          </p>
        </div>

        {/* Tarjeta de Estado del Sistema */}
        <div className="bg-white/5 border border-[#ff3f14]/30 p-6 font-vt323 text-2xl text-left text-white/60 max-w-xl mx-auto flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-4">
            <span className="w-4 h-4 bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></span>
            <span>ESTADO: <span className="text-white">ENCRIPTACIÓN ACTIVA</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-4 h-4 bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></span>
            <span>PRIVACIDAD: <span className="text-white">100% ANÓNIMO</span></span>
          </div>
        </div>

        {/* Botón de Acción Retro */}
        <div>
          <button
            onClick={onRestart}
            className="py-4 px-10 bg-transparent border-2 border-[#ff3f14] text-[#ff3f14] font-silkscreen text-2xl hover:bg-[#ff3f14] hover:text-black transition-all duration-300 shadow-[6px_6px_0px_rgba(255,63,20,0.4)] hover:shadow-[6px_6px_0px_#ffffff] hover:-translate-y-1 cursor-pointer"
          >
            [ VOLVER AL INICIO ]
          </button>
        </div>

        {/* Pie de Ventana */}
        <div className="absolute bottom-4 left-0 w-full text-center text-base font-vt323 text-white/30 tracking-widest uppercase">
          Laboratorio de Investigación Aplicada • UTD TI BIS
        </div>

      </div>
    </div>
  );
}