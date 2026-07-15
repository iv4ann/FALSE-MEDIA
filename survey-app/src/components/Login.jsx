import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!consent) return
    onLogin({ 
      name: name.trim() || 'Participante anónimo',
      email: email.trim() || 'Sin correo'
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 my-4">
      
      {/* Contenedor principal de pantalla dividida */}
      <div className="flex flex-col lg:flex-row min-h-[620px]">
        
        {/* ================= COLUMNA IZQUIERDA: FORMULARIO ================= */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-between text-left">
          
          <div>
            {/* Círculo gris minimalista (Logo placeholder como en la imagen) */}
            <div className="w-8 h-8 rounded-full bg-slate-200 mb-8 animate-pulse"></div>

            {/* Títulos principales */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Bienvenido al Estudio de Durango
            </h1>
            <p className="text-sm text-slate-500 mt-1 mb-8">
              ¿Ya participaste antes? <span className="underline cursor-pointer text-slate-700 font-medium">Ver resultados públicos</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Input 1: Correo / Institución */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Correo Electrónico o Matrícula <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="ejemplo@utd.edu.mx"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-slate-800 text-sm transition bg-white placeholder-slate-300 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Input 2: Nombre Completo */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Nombre Completo <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Martín"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-slate-800 text-sm transition bg-white placeholder-slate-300 shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Cuadrícula de viñetas estilo "Requisitos" de la foto */}
              <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  100% Anónimo y seguro
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Sin datos sensibles
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Exclusivo en Durango
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Fines estadísticos
                </div>
              </div>

              {/* Checkbox de consentimiento (estilo oscuro exacto a la foto) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      checked={consent} 
                      onChange={(e) => setConsent(e.target.checked)} 
                      className="sr-only" 
                    />
                    <div className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                      consent 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}>
                      {consent && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[3]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 leading-relaxed font-normal">
                    Doy mi consentimiento informado para participar voluntariamente en esta prueba de interacción con contenidos digitales.
                  </span>
                </label>
              </div>

              {/* Términos y condiciones en texto pequeño */}
              <p className="text-[11px] text-slate-400 leading-normal pt-1">
                Al iniciar la prueba, aceptas los <span className="underline font-medium text-slate-600 cursor-pointer">Términos de uso</span> y la <span className="underline font-medium text-slate-600 cursor-pointer">Política de confidencialidad</span> del proyecto integrador.
              </p>

              {/* Botón en forma de píldora (Pill Button como en la imagen) */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={!consent} 
                  className={`py-3.5 px-8 rounded-full font-semibold text-sm transition-all duration-300 shadow-md transform active:scale-[0.98] ${
                    consent 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 hover:shadow-lg cursor-pointer' 
                      : 'bg-slate-200/80 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  Iniciar investigación
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* ================= COLUMNA DERECHA: ARTE GEOMÉTRICO 3D ================= */}
        {/* Se oculta en móviles (hidden) y se activa en escritorio (lg:block) */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-slate-900 via-[#131620] to-slate-950 relative overflow-hidden border-l border-slate-100">
          
          {/* Luces ambientales (Glow effects) */}
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Esfera amarilla brillante superior (Esfera de luz en la foto) */}
          <div className="absolute top-16 right-12 w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-200 shadow-[0_0_35px_rgba(250,204,21,0.6)] border border-yellow-100/50 animate-bounce" style={{ animationDuration: '6s' }}></div>

          {/* Esfera amarilla brillante inferior */}
          <div className="absolute bottom-1/3 left-12 w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-100 shadow-[0_0_40px_rgba(250,204,21,0.5)] border border-yellow-100/50"></div>

          {/* Cubo flotante superior izquierdo (Simulado con CSS) */}
          <div className="absolute top-20 left-10 w-28 h-28 bg-gradient-to-br from-slate-700/80 to-slate-900/90 rounded-2xl border border-slate-600/40 shadow-2xl transform -rotate-12 backdrop-blur-md"></div>

          {/* Cubo principal central con destello naranja (Bloque central en la foto) */}
          <div className="absolute top-1/3 right-8 w-48 h-48 bg-gradient-to-br from-amber-900/40 via-slate-800/90 to-slate-950 rounded-3xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform rotate-12 flex items-center justify-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/30 rounded-full blur-xl"></div>
          </div>

          {/* Cilindro/Bloque oscuro inferior */}
          <div className="absolute -bottom-10 right-16 w-36 h-44 bg-gradient-to-tr from-slate-950 to-slate-800/80 rounded-2xl border border-slate-700/30 shadow-2xl transform -rotate-18"></div>

          {/* Textura de cuadrícula sutil en el fondo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          {/* Pie de imagen en la parte inferior de la obra */}
          <div className="absolute bottom-6 left-8 right-8 text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
              Laboratorio de Investigación Aplicada
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}