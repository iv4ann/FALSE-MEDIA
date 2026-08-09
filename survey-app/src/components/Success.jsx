import React from 'react';

export default function Success({ onRestart }) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-black border-2 border-[#ff3f14] shadow-[8px_8px_0px_#ff3f14,0_0_30px_rgba(255,63,20,0.2)] relative p-8 md:p-12 text-center my-8 font-sans overflow-hidden">
      
      {/* Efecto Scanlines Retro */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-40"></div>

      <div className="relative z-30 space-y-8">
        
        {/* Encabezado Principal */}
        <div className="border-b-2 border-[#ff3f14]/50 pb-6">
          <div className="inline-block bg-[#ff3f14] text-black font-vt323 text-xl px-4 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#ffffff] mb-6">
            Misión Completada
          </div>
          <h2 className="text-4xl md:text-5xl font-silkscreen text-white drop-shadow-[0_0_10px_rgba(255,63,20,0.8)]">
            DATOS TRANSMITIDOS
          </h2>
          <p className="text-2xl font-vt323 text-[#ff3f14] mt-2 tracking-wide">
            &gt; CONEXIÓN CERRADA CON ÉXITO_
          </p>
        </div>

        {/* Cuerpo del Mensaje */}
        <div className="px-4">
          <p className="font-vt323 text-white/80 text-xl leading-relaxed">
            Tu valiosa participación ha sido procesada en los servidores locales. 
            Estos registros de interacción formarán parte vital del reporte final de 
            <span className="text-[#ff3f14]"> FALSE-MEDIA </span> 
            sobre la alfabetización digital y la detección de Inteligencia Artificial en Durango.
          </p>
        </div>

        {/* Tarjeta de Estado del Sistema */}
        <div className="bg-white/5 border border-[#ff3f14]/30 p-5 font-vt323 text-xl text-left text-white/60 max-w-lg mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            <span>ESTADO: <span className="text-white">ENCRIPTACIÓN ACTIVA</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            <span>PRIVACIDAD: <span className="text-white">100% ANÓNIMO</span></span>
          </div>
        </div>

        {/* Botón de Acción Retro */}
        <div className="pt-6">
          <button
            onClick={onRestart}
            className="py-3 px-8 bg-transparent border-2 border-[#ff3f14] text-[#ff3f14] font-silkscreen text-xl hover:bg-[#ff3f14] hover:text-white transition-colors duration-300 shadow-[4px_4px_0px_rgba(255,63,20,0.4)] hover:shadow-[4px_4px_0px_#ffffff] cursor-pointer"
          >
            [ VOLVER AL INICIO ]
          </button>
        </div>

        {/* Pie de Ventana */}
        <div className="pt-8 text-sm font-vt323 text-white/30 tracking-widest uppercase">
          Laboratorio de Investigación Aplicada • UTD TI BIS
        </div>

      </div>
    </div>
  );
}