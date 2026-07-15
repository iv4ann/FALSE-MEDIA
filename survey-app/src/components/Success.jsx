import React from 'react'

export default function Success({ onRestart }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900 via-[#131620] to-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800/80 overflow-hidden relative p-8 md:p-14 text-center my-8">
      
      {/* Luces de fondo (Glows que combinan con el Login) */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Esfera decorativa superior */}
      <div className="absolute top-8 right-10 w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-200 shadow-[0_0_25px_rgba(250,204,21,0.5)] border border-yellow-100/40 animate-pulse"></div>

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        
        {/* Icono de Check en cubo simulado */}
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-amber-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center transform rotate-6">
          <div className="transform -rotate-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Textos de agradecimiento */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            Misión Completada
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 text-white">
            ¡Respuestas Registradas!
          </h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Tu valiosa participación ha sido guardada en memoria. Estos datos formarán parte del reporte final sobre el consumo de medios y detección de Inteligencia Artificial en Durango.
          </p>
        </div>

        {/* Tarjeta interna informativa */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 text-xs text-slate-300 text-left flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
          <span>Los datos han sido procesados de forma 100% anónima de acuerdo a los protocolos de investigación.</span>
        </div>

        {/* Botón en forma de píldora para reiniciar */}
        <div className="pt-2">
          <button
            onClick={onRestart}
            className="w-full py-4 px-8 rounded-full font-bold text-sm bg-white hover:bg-slate-100 text-slate-950 transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-white/10 transform active:scale-[0.98] cursor-pointer"
          >
            Registrar una nueva respuesta 🔄
          </button>
        </div>

      </div>

      {/* Pie de tarjeta */}
      <div className="mt-10 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
        Proyecto Integrador • Laboratorio de Investigación
      </div>

    </div>
  )
}