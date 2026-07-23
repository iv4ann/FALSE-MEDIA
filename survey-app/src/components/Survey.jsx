import React, { useState } from 'react'

// Componente interno para las filas Likert (1 al 5)
const LikertRow = ({ label, desc, value, onChange, opcionesTextos }) => {
  const opciones = [
    { num: 1, texto: opcionesTextos[0] },
    { num: 2, texto: opcionesTextos[1] },
    { num: 3, texto: opcionesTextos[2] },
    { num: 4, texto: opcionesTextos[3] },
    { num: 5, texto: opcionesTextos[4] },
  ]

  return (
    <div className="py-6 border-b border-slate-100 last:border-none text-left transition-all">
      <div className="mb-3">
        <p className="text-sm md:text-base font-extrabold text-slate-800 leading-snug">
          {label}
        </p>
        {desc && (
          <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
            {desc}
          </p>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4">
        {opciones.map((op) => (
          <label
            key={op.num}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border text-center cursor-pointer transition-all duration-200 select-none ${
              value === op.num
                ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]'
                : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <input
              type="radio"
              name={label}
              value={op.num}
              checked={value === op.num}
              onChange={() => onChange(op.num)}
              className="sr-only"
            />
            <span className="text-base sm:text-lg font-black mb-1">{op.num}</span>
            <span className="text-[10px] sm:text-xs leading-tight opacity-85 block font-medium">
              {op.texto}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
const MediaChallengeCard = ({ label, desc, mediaType, mediaUrl, value, onChange, esIA, explicacion }) => {
  
  // Estado para saber si intentó cambiar su respuesta
  const [intentoCambio, setIntentoCambio] = React.useState(false); 

  const handleVerifyingClick = (opcion) => {
    if (value) {
      // Activamos el mensaje
      setIntentoCambio(true);
      
      // A los 5 segundos cambiamos el estado, lo que activará el desvanecimiento CSS
      setTimeout(() => {
        setIntentoCambio(false);
      }, 5000);

      return;
    }
    // Si no hay respuesta, la guardamos
    onChange(opcion);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left">
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1">{label}</label>
        {desc && <p className="text-xs text-slate-500">{desc}</p>}
      </div>

      {/* Contenedor Multimedia Dinámico */}
      <div className="bg-slate-900 rounded-lg overflow-hidden flex justify-center items-center max-h-80 border border-slate-700 w-full">
        {mediaType === 'image' && (
          <img src={mediaUrl} alt="Reto IA" className="max-h-80 w-auto object-contain" />
        )}
        {mediaType === 'video' && (
          <video 
            controls 
            playsInline 
            preload="metadata" 
            className="w-full max-h-80 object-contain bg-black"
          >
            <source src={mediaUrl} type="video/mp4" />
            Tu navegador no soporta la reproducción de este video.
          </video>
        )}
        {mediaType === 'audio' && (
          <div className="w-full p-6 flex flex-col items-center justify-center bg-slate-900">
            <audio controls className="w-full">
              <source src={mediaUrl} type="audio/mpeg" />
              Tu navegador no soporta la reproducción de audio.
            </audio>
          </div>
        )}
      </div>

      {/* Botones de Selección */}
      <div>
        <span className="block text-xs font-bold text-slate-400 uppercase mb-2">¿Cuál es tu veredicto?</span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleVerifyingClick('IA')}
            className={`py-2.5 px-4 rounded-lg font-medium text-sm border transition-all cursor-pointer ${
              value === 'IA' 
                ? 'bg-purple-600 text-white border-purple-600' 
                : value 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-70' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🤖 Generado por IA
          </button>
          <button
            type="button"
            onClick={() => handleVerifyingClick('REAL')}
            className={`py-2.5 px-4 rounded-lg font-medium text-sm border transition-all cursor-pointer ${
              value === 'REAL' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : value 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-70' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            📷 Real / Humano
          </button>
        </div>
      </div>

      {/* Caja de Retroalimentación */}
      {value && (
        <div className={`mt-4 p-4 rounded-lg border text-xs leading-relaxed ${
          (value === 'IA' && esIA) || (value === 'REAL' && !esIA)
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="font-bold mb-1 text-sm">
            {(value === 'IA' && esIA) || (value === 'REAL' && !esIA) ? '✅ ¡Correcto!' : '⚠️ Dato curioso:'}
          </div>
          <p className="text-slate-700"><strong>¿Cómo identificarlo?:</strong> {explicacion}</p>
        </div>
      )}

      {/* Mensaje de advertencia con transición de desvanecimiento */}
      <div 
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          intentoCambio ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg text-center">
          🛑 ¡Alto ahí, pa! Ya elegiste tu respuesta para este reto y no se puede modificar.
        </div>
      </div>

    </div>
  );
};
export default function Survey({ participant, onSubmit, onEarlyEnd }) {
  const [resideDurango, setResideDurango] = useState(null)
  
  const [stage, setStage] = useState(1); // 1 = Primer bloque / Encuesta 1 | 2 = Encuesta 2 | 3 = Finalizado
  
  // Estado completo con las variables estadísticas del estudio
  const [respuestas, setRespuestas] = useState({
    // Bloque I
    item2_edad: '13 a 29 años (Jóvenes)',
    item3_dispositivo: 'Teléfono celular / Smartphone',
    // Bloque II
    item4_frecuencia_tec: null,
    item5_familiaridad_ia: null,
    item6_confianza_identificar: null,
    item7_frecuencia_noticias: null,
    item8_verificacion_fuentes: null,
    item9_impacto_falsos: null,
    // Bloque III
    item10_algoritmos_redes: null,
    item11_uso_ia_productividad: null,
    item12_dependencia_ansiedad: null,
    item13_regulacion_leyes: null,
    item14_privacidad_datos: null,
    item15_reemplazo_laboral: null,
    // AQUÍ PUEDES AGREGAR TUS NUEVAS VARIABLES PARA LA ENCUESTA 2 (Ejemplo: item16_ejemplo: null)
    item16_imagenes: null,
    item17_imagenes: null,
    item18_imagenes: null,
    item19_noticias: null,
    item20_noticias: null,
    item21_videos: null,
    item22_videos: null,
    item23_videos: null,
    item24_audio: null,
    item25_audio: null,
    item26_audio: null,
  })

  const handleLikertChange = (key, val) => {
    setRespuestas((prev) => ({ ...prev, [key]: val }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setRespuestas((prev) => ({ ...prev, [name]: value }))
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validar si reside en Durango
    if (resideDurango === 'no') {
      onEarlyEnd()
      return
    }

    // 2. Preparar los datos
    const datosEncuesta = {
      participante: participant || { name: 'Anónimo' },
      resideEnDurango: resideDurango,
      ...respuestas,
      fecha: new Date().toISOString()
    }

    // 3. Lógica de Sincronización (Online/Offline)
    const API_URL = 'https://false-media.onrender.com/api/guardar-encuesta';

    try {
      // Intentar enviar a la base de datos en la nube (Neon)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEncuesta),
      })

      if (!response.ok) throw new Error('No se pudo conectar')
      console.log("✅ Datos guardados en la nube con éxito")

    } catch (err) {
      // Si falla (no hay internet), guardamos localmente
      console.warn("⚠️ Sin conexión: Guardando en LocalStorage...")
      const pendientes = JSON.parse(localStorage.getItem('encuestas_pendientes') || '[]')
      pendientes.push(datosEncuesta)
      localStorage.setItem('encuestas_pendientes', JSON.stringify(pendientes))
      alert("La encuesta se guardó localmente. Se enviará a la nube cuando tengas conexión.")
    }

    // 4. Finalizar el flujo en la UI
    onSubmit(datosEncuesta) 
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden my-6 transition-all text-left font-sans text-slate-800">
      
      {/* Encabezado Principal */}
      <div className="bg-slate-900 text-white px-6 py-8 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-yellow-300 border border-white/10">
            Instrumento de Medición v3.0 ({stage === 1 ? 'Fase 1: 15 Ítems' : 'Fase 2: Encuesta Final'})
          </span>
          <h2 className="text-xl md:text-2xl font-black mt-2 tracking-tight">
            Interacción Digital, Inteligencia Artificial y Sociedad
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Muestra local de la ciudad de Durango • Participante: <span className="text-white font-medium">{participant?.name || 'Anónimo'}</span>
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-200 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] shrink-0">
          <span className="text-slate-950 font-black text-xs">DGO</span>
        </div>
      </div>

      {/* Introducción y Consentimiento Informado */}
      <div className="bg-slate-50 px-6 py-5 md:px-10 border-b border-slate-200/80 text-xs md:text-sm text-slate-600 leading-relaxed">
        <span className="font-bold text-slate-800 block mb-1">Introducción y Consentimiento Informado:</span>
        ¡Hola! Bienvenido a nuestra plataforma de estudio. El objetivo de esta prueba es evaluar la interacción humana con contenidos digitales, algoritmos y herramientas de Inteligencia Artificial en la ciudad de Durango. La participación es totalmente anónima y los datos se procesarán de forma estricta y confidencial para fines de investigación académica.
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-14">
        
        {/* ========================================================================= */}
        {/* PANTALLA 1: BLOQUES I, II y III (Tus 15 preguntas actuales)               */}
        {/* ========================================================================= */}
        {stage === 1 && (
          <div className="space-y-14 animate-fadeIn">
            
            {/* ================= BLOQUE I: VARIABLES DE FILTRO Y CONTEXTO ================= */}
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Bloque I: Variables de Filtro y Contexto
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ayúdanos a segmentar la muestra demográfica y técnica de esta sesión.
                </p>
              </div>

              {/* Ítem 1: Filtro Durango */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 transition-all">
                <p className="text-sm font-bold text-slate-800 mb-1">
                  ● Ítem 1. ¿Resides actualmente en la ciudad de Durango, Dgo.?
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Este estudio está enfocado exclusivamente en analizar el ecosistema y comportamiento de los habitantes locales.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className={`flex-1 py-3.5 px-4 rounded-xl border text-center font-bold text-sm cursor-pointer transition-all ${
                    resideDurango === 'si' 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.01]' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}>
                    <input type="radio" name="durango" className="sr-only" onChange={() => setResideDurango('si')} />
                    [✓] Sí, resido en Durango
                  </label>

                  <label className={`flex-1 py-3.5 px-4 rounded-xl border text-center font-bold text-sm cursor-pointer transition-all ${
                    resideDurango === 'no' 
                      ? 'bg-red-600 border-red-600 text-white shadow-md scale-[1.01]' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}>
                    <input type="radio" name="durango" className="sr-only" onChange={() => setResideDurango('no')} />
                    [✗] No resido ahí (Fin de la encuesta)
                  </label>
                </div>
              </div>

              {/* Aviso de salida temprana si marca NO */}
              {resideDurango === 'no' && (
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center animate-fadeIn">
                  <p className="text-sm font-bold text-amber-900 mb-2">
                    📍 Muestra Restringida por Geocalización
                  </p>
                  <p className="text-xs text-amber-800 mb-5 max-w-md mx-auto">
                    Agradecemos mucho tu interés en colaborar, pero la metodología del proyecto requiere que los encuestados vivan en la ciudad de Durango para validar las estadísticas.
                  </p>
                  <button
                    type="button"
                    onClick={onEarlyEnd}
                    className="py-3 px-8 bg-slate-900 text-white font-bold rounded-full text-xs hover:bg-slate-800 transition shadow-md cursor-pointer"
                  >
                    Concluir prueba ahora
                  </button>
                </div>
              )}

              {/* Ítem 2 e Ítem 3 (Solo si reside en Durango) */}
              {resideDurango === 'si' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      ● Ítem 2. Selecciona tu rango de edad actual:
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">Clasificación por grupo generacional.</p>
                    <select
                      name="item2_edad"
                      value={respuestas.item2_edad}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-800 transition shadow-sm"
                    >
                      <option value="3 a 12 años (Niño - Responder con apoyo de tutor)">3 a 12 años (Niño - Con apoyo de tutor)</option>
                      <option value="13 a 29 años (Jóvenes)">13 a 29 años (Jóvenes)</option>
                      <option value="30 a 59 años (Adultos)">30 a 59 años (Adultos)</option>
                      <option value="60 a 70 años (Adultos Mayores)">60 a 70 años (Adultos Mayores)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      ● Ítem 3. Dispositivo utilizado en este momento:
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">Ayuda a evaluar la accesibilidad y formato de pantalla.</p>
                    <select
                      name="item3_dispositivo"
                      value={respuestas.item3_dispositivo}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-800 transition shadow-sm"
                    >
                      <option value="Teléfono celular / Smartphone">Teléfono celular / Smartphone</option>
                      <option value="Computadora de escritorio / Laptop">Computadora de escritorio / Laptop</option>
                      <option value="Tableta">Tableta (iPad / Android Tablet)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ================= BLOQUE II: ALFABETIZACIÓN DIGITAL ================= */}
            {resideDurango === 'si' && (
              <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Bloque II: Alfabetización Digital y Consumo de Medios
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Califica tu nivel de experiencia en una escala donde <strong className="text-slate-600">1 es el valor mínimo</strong> y <strong className="text-slate-600">5 es el valor máximo</strong>.
                  </p>
                </div>

                <LikertRow
                  label="● Ítem 4. ¿Con qué frecuencia utilizas dispositivos tecnológicos (celulares, computadoras, apps) en tu vida diaria?"
                  desc="Mide el nivel de inmersión técnica y dependencia en tu rutina laboral, escolar o personal."
                  value={respuestas.item4_frecuencia_tec}
                  onChange={(val) => handleLikertChange('item4_frecuencia_tec', val)}
                  opcionesTextos={['Nunca o casi nunca', 'Pocas veces', 'Regularmente', 'Frecuentemente', 'Todo el tiempo']}
                />

                <LikertRow
                  label="● Ítem 5. ¿Qué tan familiarizado estás con el concepto y funcionamiento de la 'Inteligencia Artificial' (IA)?"
                  desc="Evalúa tu comprensión teórica y práctica sobre herramientas automatizadas como ChatGPT, editores generativos, etc."
                  value={respuestas.item5_familiaridad_ia}
                  onChange={(val) => handleLikertChange('item5_familiaridad_ia', val)}
                  opcionesTextos={['No sé qué es', 'He escuchado el término', 'Sé qué es, no la uso', 'La uso ocasionalmente', 'Conozco y uso seguido']}
                />

                <LikertRow
                  label="● Ítem 6. ¿Qué tanta confianza tienes en tu capacidad para identificar si un texto, imagen o video en internet fue creado por una computadora (IA)?"
                  desc="Autopercepción sobre tu agudeza visual y crítica para detectar detalles artificiales, 'deepfakes' o textos sintéticos."
                  value={respuestas.item6_confianza_identificar}
                  onChange={(val) => handleLikertChange('item6_confianza_identificar', val)}
                  opcionesTextos={['Ninguna confianza', 'Poca confianza', 'Neutral', 'Confianza moderada', 'Absoluta confianza']}
                />

                <LikertRow
                  label="● Ítem 7. ¿Con qué frecuencia buscas información o consumes noticias en redes sociales y entornos digitales (Facebook, TikTok, X, portales web)?"
                  desc="Determina el canal principal por el cual te informas sobre el acontecer local y global diariamente."
                  value={respuestas.item7_frecuencia_noticias}
                  onChange={(val) => handleLikertChange('item7_frecuencia_noticias', val)}
                  opcionesTextos={['Nunca o casi nunca', 'Pocas veces', 'Regularmente', 'Frecuentemente', 'Todo el tiempo']}
                />

                <LikertRow
                  label="● Ítem 8. Cuando encuentras una noticia o una imagen impactante en internet, ¿qué tan seguido te detienes a verificar si la fuente es real antes de compartirla o creerla?"
                  desc="Frecuencia de adopción de hábitos de 'fact-checking' (verificación de hechos) y prevención de desinformación."
                  value={respuestas.item8_verificacion_fuentes}
                  onChange={(val) => handleLikertChange('item8_verificacion_fuentes', val)}
                  opcionesTextos={['Nunca lo verifico', 'Raras veces', 'A veces', 'La mayoría de veces', 'Siempre lo verifico']}
                />

                <LikertRow
                  label="● Ítem 9. ¿Qué tanto impacto consideras que tienen los contenidos falsos generados por computadora (IA) en las decisiones de la vida cotidiana de las personas?"
                  desc="Percepción sobre la gravedad, riesgo social y manipulación del comportamiento humano ante las 'Fake News'."
                  value={respuestas.item9_impacto_falsos}
                  onChange={(val) => handleLikertChange('item9_impacto_falsos', val)}
                  opcionesTextos={['Ningún impacto', 'Poco impacto', 'Impacto moderado', 'Gran impacto', 'Impacto total / Crítico']}
                />
              </div>
            )}

            {/* ================= BLOQUE III: CONCIENCIA ALGORÍTMICA Y ÉTICA ================= */}
            {resideDurango === 'si' && (
              <div className="space-y-4 pt-6 border-t border-slate-100 animate-fadeIn">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Bloque III: Conciencia Algorítmica, Privacidad y Ética Tecnológica
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Analiza cómo interactúas con la automatización en tu productividad, seguridad y expectativas futuras.
                  </p>
                </div>

                <LikertRow
                  label="● Ítem 10. ¿Con qué frecuencia notas que las redes sociales (TikTok, Instagram, YouTube) te muestran recomendaciones adaptadas a tus conversaciones o búsquedas recientes?"
                  desc="Mide el grado de conciencia sobre la personalización algorítmica y el rastreo de datos de comportamiento en línea."
                  value={respuestas.item10_algoritmos_redes}
                  onChange={(val) => handleLikertChange('item10_algoritmos_redes', val)}
                  opcionesTextos={['Nunca o casi nunca', 'Pocas veces', 'Regularmente', 'Frecuentemente', 'Todo el tiempo']}
                />

                <LikertRow
                  label="● Ítem 11. ¿Con qué frecuencia utilizas herramientas de Inteligencia Artificial para realizar tareas escolares, laborales o proyectos creativos?"
                  desc="Evalúa la integración real de asistentes generativos (ChatGPT, Copilot, Canva AI) en tu productividad diaria."
                  value={respuestas.item11_uso_ia_productividad}
                  onChange={(val) => handleLikertChange('item11_uso_ia_productividad', val)}
                  opcionesTextos={['Nunca las uso', 'Raras veces', 'A veces / Ocasional', 'Frecuentemente', 'Diariamente / Siempre']}
                />

                <LikertRow
                  label="● Ítem 12. Cuando pasas varias horas sin acceso a internet o a tu teléfono celular, ¿qué tanto nivel de incomodidad, ansiedad o desconexión experimentas?"
                  desc="Analiza el impacto psicoemocional y el nivel de apego o dependencia hacia el ecosistema digital conectado."
                  value={respuestas.item12_dependencia_ansiedad}
                  onChange={(val) => handleLikertChange('item12_dependencia_ansiedad', val)}
                  opcionesTextos={['Ninguna incomodidad', 'Poca incomodidad', 'Incomodidad moderada', 'Mucha incomodidad', 'Ansiedad total / Alta']}
                />

                <LikertRow
                  label="● Ítem 13. ¿Qué tan de acuerdo estás con que los gobiernos e instituciones deberían crear leyes estrictas para regular y limitar el desarrollo de la Inteligencia Artificial?"
                  desc="Explora tu postura ética sobre la necesidad de límites legales ante el avance descontrolado de la tecnología."
                  value={respuestas.item13_regulacion_leyes}
                  onChange={(val) => handleLikertChange('item13_regulacion_leyes', val)}
                  opcionesTextos={['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral / Indiferente', 'De acuerdo', 'Totalmente de acuerdo']}
                />

                <LikertRow
                  label="● Ítem 14. ¿Qué tanta importancia le das a revisar los permisos de privacidad (acceso a cámara, micrófono, ubicación) al instalar una nueva aplicación?"
                  desc="Evalúa tus hábitos de autoprotección, ciberseguridad y el cuidado de tus datos personales en dispositivos."
                  value={respuestas.item14_privacidad_datos}
                  onChange={(val) => handleLikertChange('item14_privacidad_datos', val)}
                  opcionesTextos={['Ninguna importancia', 'Poca importancia', 'Importancia moderada', 'Mucha importancia', 'Absoluta importancia']}
                />

                <LikertRow
                  label="● Ítem 15. ¿Qué tanto grado de preocupación tienes de que la automatización y la Inteligencia Artificial puedan reemplazar empleos humanos en tu área académica o laboral en los próximos años?"
                  desc="Mide las expectativas, certidumbre y temores económicos frente al impacto laboral de la IA en nuestra región."
                  value={respuestas.item15_reemplazo_laboral}
                  onChange={(val) => handleLikertChange('item15_reemplazo_laboral', val)}
                  opcionesTextos={['Ninguna preocupación', 'Poca preocupación', 'Preocupación moderada', 'Alta preocupación', 'Preocupación máxima']}
                />

                {/* BOTÓN PARA AVANZAR A LA PANTALLA 2 */}
                <div className="pt-8 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setStage(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto py-4 px-12 rounded-full font-extrabold text-sm bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl shadow-blue-900/10 hover:shadow-2xl transform active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  >
                    Continuar a la Encuesta 2 ➔
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* PANTALLA 2: AQUÍ EMPIEZAS A TRABAJAR TU SEGUNDA ENCUESTA                  */}
        {/* ========================================================================= */}
        {stage === 2 && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Banner superior de la Fase 2 */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-blue-950">Fase 2: Encuesta Complementaria</h3>
                <p className="text-xs text-blue-800 mt-0.5">
                  Estás en la segunda parte del estudio. Completa estos ítems finales para guardar tu registro.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-blue-600 hover:underline shrink-0 ml-4 cursor-pointer"
              >
                ⬅ Volver al Bloque anterior
              </button>
            </div>

            {/* BLOQUE IV: TUS NUEVAS PREGUNTAS VAN AQUÍ ADENTRO */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  Bloque IV: Identificacion de Imagenes, Videos y Musica creada por IA.
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  [Escribe aquí la descripción o instrucciones para tus nuevas preguntas]
                </p>
              </div>
            <MediaChallengeCard
                  label="● Ítem 16. Messi anotando un gol."
                  mediaType="image"
                  mediaUrl="/messi.jpg"
                  value={respuestas.item16_imagenes}
                  onChange={(val) => handleLikertChange('item16_imagenes', val)}
                  esIA={true}//si es IA pa
                  explicacion="Si es IA, si te fijas bien los jugadores de Espana tienen todos el mismo numero."
                />
              <MediaChallengeCard
                 label="● Ítem 17. Paisaje nublado."
                  mediaType="image"
                  mediaUrl="/everest.jpg"
                  value={respuestas.item17_imagenes}
                  onChange={(val) => handleLikertChange('item17_imagenes', val)}
                  esIA={true}//si es IA pa
                  explicacion="Si es IA, si te fijas bien los jugadores de Espana tienen todos el mismo numero."
                />
                 <MediaChallengeCard
                 label="● Ítem 18. Elvis en un acantilado."
                  mediaType="image"
                  mediaUrl="/a274e7eb-7874-447f-8160-2b92c0eb56a6.jpeg"
                  value={respuestas.item18_imagenes}
                  onChange={(val) => handleLikertChange('item18_imagenes', val)}
                  esIA={true}//si es IA pa
                  explicacion="Si es IA, si te fijas bien los jugadores de Espana tienen todos el mismo numero."
                />
               
               <MediaChallengeCard
                  label="● Ítem 19. Noticia del Papa Francisco I."
                  mediaType="image"
                  mediaUrl="/Captura de pantalla 2026-07-22 225643.jpg"
                  value={respuestas.item19_noticias}
                  onChange={(val) => handleLikertChange('item19_noticias', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
                <MediaChallengeCard
                  label="● Ítem 20. Noticia de Meteorito que cayo en Nueva Jersey."
                  mediaType="image"
                  mediaUrl="/noticia1.png"
                  value={respuestas.item20_noticias}
                  onChange={(val) => handleLikertChange('item20_noticias', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
                <MediaChallengeCard
                  label="● Ítem 21. Caricatura de los 70s."
                  mediaType="video"
                  mediaUrl="Attack on Titan – If it was made in 1970! [t12Uzr3OL-Q].mp4"
                  value={respuestas.item21_videos}
                  onChange={(val) => handleLikertChange('item21_videos', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
                <MediaChallengeCard
                  label="● Ítem 22. Gordon Ramsay en Minecraft."
                  mediaType="video"
                  mediaUrl="/The Better Minecraft Movie [HFkr74Xy1Y4].mp4"
                  value={respuestas.item22_videos}
                  onChange={(val) => handleLikertChange('item22_videos', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
                <MediaChallengeCard
                  label="● Ítem 23. Pelicula Retro."
                  mediaType="video"
                  mediaUrl="/CRAFT (1979)： The First Night ｜ Episode 1 [zX-e9LRR_ko].mp4"
                  value={respuestas.item23_videos}
                  onChange={(val) => handleLikertChange('item23_videos', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
               <MediaChallengeCard
                  label="● Ítem 24. Audio 1."
                  mediaType="audio"
                  mediaUrl="/Gangsta’s Paradise - 1950's Soul Version - Soul'd Out (128k).mp3"
                  value={respuestas.item24_audio}
                  onChange={(val) => handleLikertChange('item24_audio', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                /> 
                
               <MediaChallengeCard
                  label="● Ítem 25. Audio 2."
                  mediaType="audio"
                  mediaUrl="/Foster The People - Houdini (Official Video) - FosterThePeople (128k).mp3"
                  value={respuestas.item25_audio}
                  onChange={(val) => handleLikertChange('item25_audio', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                /> 
                <MediaChallengeCard
                  label="● Ítem 26. Audio 3."
                  mediaType="audio"
                  mediaUrl="Shaggy - It Wasn't Me (Country AI Version) [OD-Edp2BlsQ].mp3"
                  value={respuestas.item26_audio}
                  onChange={(val) => handleLikertChange('item26_audio', val)}
                  esIA={true}   
                  explicacion="No manches pa se ve luego luego."
                />
              {/* ---> AQUÍ VAS A AGREGAR TUS NUEVOS COMPONENTES LikertRow O INPUTS <--- */}
              
              
              
            </div>

            {/* Botón de Envío Definitivo a tu base de datos en Render */}
            <div className="pt-8 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto py-4 px-12 rounded-full font-extrabold text-sm bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-950 hover:to-slate-900 text-white shadow-xl shadow-slate-900/10 hover:shadow-2xl transform active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Registrar Todas las Respuestas y Concluir ✨
              </button>
            </div>

          </div>
        )}

      </form>
    </div>
  )
}