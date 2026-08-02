import React, { useState } from 'react';

// Componente interno para las filas Likert con estilo RETRO
const LikertRow = ({ label, desc, value, onChange, opcionesTextos }) => {
  const opciones = [
    { num: 1, texto: opcionesTextos[0] },
    { num: 2, texto: opcionesTextos[1] },
    { num: 3, texto: opcionesTextos[2] },
    { num: 4, texto: opcionesTextos[3] },
    { num: 5, texto: opcionesTextos[4] },
  ];

  return (
    <div className="py-6 border-b border-[#ff3f14]/30 last:border-none text-left transition-all">
      <div className="mb-4">
        <p className="text-xl md:text-2xl font-vt323 text-[#ff3f14] leading-snug">
          {label}
        </p>
        {desc && (
          <p className="text-lg text-white/60 mt-1 font-vt323 leading-relaxed">
            &gt; {desc}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
        {opciones.map((op) => (
          <label
            key={op.num}
            className={`flex flex-col items-center justify-center p-3 border-2 text-center cursor-pointer transition-all duration-200 select-none ${
              value === op.num
                ? 'bg-[#ff3f14] border-[#ff3f14] text-black shadow-[0_0_15px_rgba(255,63,20,0.5)] scale-[1.02]'
                : 'bg-black border-white/20 text-white/50 hover:bg-white/10 hover:border-[#ff3f14] hover:text-white'
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
            <span className="text-2xl sm:text-3xl font-silkscreen mb-1">{op.num}</span>
            <span className="text-sm sm:text-base leading-tight block font-vt323">
              {op.texto}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function Survey({ participant, onSubmit, onEarlyEnd }) {
  const [resideDurango, setResideDurango] = useState(null);
  
  const [respuestas, setRespuestas] = useState({
    item2_edad: '13 a 29 años (Jóvenes)',
    item3_dispositivo: 'Teléfono celular / Smartphone',
    item4_frecuencia_tec: null,
    item5_familiaridad_ia: null,
    item6_confianza_identificar: null,
    item7_frecuencia_noticias: null,
    item8_verificacion_fuentes: null,
    item9_impacto_falsos: null,
    item10_algoritmos_redes: null,
    item11_uso_ia_productividad: null,
    item12_dependencia_ansiedad: null,
    item13_regulacion_leyes: null,
    item14_privacidad_datos: null,
    item15_reemplazo_laboral: null,
  });

  const handleLikertChange = (key, val) => {
    setRespuestas((prev) => ({ ...prev, [key]: val }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resideDurango === 'no') {
      if (onEarlyEnd) onEarlyEnd();
      return;
    }

    const datosEncuesta = {
      participante: participant || { name: 'Anónimo' },
      resideEnDurango: resideDurango,
      ...respuestas,
      fecha: new Date().toISOString()
    };

    const API_URL = 'https://false-media.onrender.com/api/guardar-encuesta';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEncuesta),
      });

      if (!response.ok) throw new Error('No se pudo conectar');
      console.log("✅ Datos guardados en la nube con éxito");

    } catch (err) {
      console.warn("⚠️ Sin conexión: Guardando en LocalStorage...");
      const pendientes = JSON.parse(localStorage.getItem('encuestas_pendientes') || '[]');
      pendientes.push(datosEncuesta);
      localStorage.setItem('encuestas_pendientes', JSON.stringify(pendientes));
      alert("SISTEMA OFFLINE: La encuesta se guardó localmente. Se enviará a la nube cuando tengas conexión.");
    }

    if (onSubmit) onSubmit(datosEncuesta);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border-2 border-[#ff3f14] shadow-[8px_8px_0px_#ff3f14,0_0_30px_rgba(255,63,20,0.2)] overflow-hidden my-6 transition-all text-left font-sans text-white relative">
      
      {/* Efecto Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-30"></div>

      {/* Encabezado Principal Retro */}
      <div className="bg-[#ff3f14]/10 border-b-2 border-[#ff3f14] px-6 py-8 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-30">
        <div>
          <span className="text-sm font-vt323 uppercase tracking-widest bg-[#ff3f14] text-black px-3 py-1 shadow-[2px_2px_0px_#ffffff]">
            INSTRUMENTO DE MEDICIÓN V3.0
          </span>
          <h2 className="text-3xl md:text-4xl font-silkscreen text-white mt-4 tracking-tight drop-shadow-[0_0_8px_rgba(255,63,20,0.8)]">
            INTERACCIÓN DIGITAL Y SOCIEDAD
          </h2>
          <p className="text-xl font-vt323 text-[#ff3f14] mt-2">
            &gt; MUESTRA LOCAL DURANGO_ • OP: <span className="text-white">{participant?.name || 'ANÓNIMO'}</span>
          </p>
        </div>
      </div>

      <div className="bg-white/5 border-b border-[#ff3f14]/30 px-6 py-5 md:px-10 text-lg font-vt323 text-white/80 leading-relaxed relative z-30">
        <span className="font-silkscreen text-[#ff3f14] block mb-2 text-xl">AVISO DE SISTEMA:</span>
        El objetivo de esta prueba es evaluar la interacción humana con contenidos digitales y algoritmos. 
        La participación es anónima y los datos se procesarán de forma confidencial para fines de investigación académica en la región.
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-14 relative z-30">
        
        {/* BLOQUE I */}
        <div className="space-y-6">
          <div className="border-b border-[#ff3f14]/50 pb-3">
            <h3 className="text-2xl font-silkscreen text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-3 h-3 bg-[#ff3f14] shadow-[0_0_8px_#ff3f14]"></span>
              BLOQUE I: PARÁMETROS DE FILTRO
            </h3>
          </div>

          <div className="bg-white/5 border border-white/20 p-6 transition-all">
            <p className="text-2xl font-vt323 text-[#ff3f14] mb-2">
              &gt; Ítem 1. ¿Resides actualmente en la ciudad de Durango, Dgo.?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <label className={`flex-1 py-4 px-4 border-2 text-center font-silkscreen text-lg cursor-pointer transition-all ${
                resideDurango === 'si' 
                  ? 'bg-[#ff3f14] border-[#ff3f14] text-black shadow-[4px_4px_0px_#ffffff]' 
                  : 'bg-black border-white/30 text-white hover:border-[#ff3f14]'
              }`}>
                <input type="radio" name="durango" className="sr-only" onChange={() => setResideDurango('si')} />
                [✓] SÍ, RESIDO EN DURANGO
              </label>

              <label className={`flex-1 py-4 px-4 border-2 text-center font-silkscreen text-lg cursor-pointer transition-all ${
                resideDurango === 'no' 
                  ? 'bg-red-700 border-red-700 text-white shadow-[4px_4px_0px_#ffffff]' 
                  : 'bg-black border-white/30 text-white hover:border-red-500'
              }`}>
                <input type="radio" name="durango" className="sr-only" onChange={() => setResideDurango('no')} />
                [X] NO RESIDO AHÍ
              </label>
            </div>
          </div>

          {resideDurango === 'no' && (
            <div className="p-6 bg-red-950/50 border-2 border-red-500 text-center animate-pulse">
              <p className="text-xl font-silkscreen text-red-500 mb-2">ACCESO DENEGADO: MUESTRA RESTRINGIDA</p>
              <p className="text-lg font-vt323 text-white/80 mb-6">El proyecto requiere residentes de Durango para validar las estadísticas locales.</p>
              <button type="button" onClick={onEarlyEnd} className="py-3 px-8 bg-red-600 font-silkscreen text-white shadow-[4px_4px_0px_#ffffff] hover:bg-white hover:text-black transition-colors cursor-pointer">
                TERMINAR CONEXIÓN
              </button>
            </div>
          )}

          {resideDurango === 'si' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <label className="block text-xl font-vt323 text-[#ff3f14] mb-2">&gt; Ítem 2. Rango de edad:</label>
                <div className="relative">
                  <select name="item2_edad" value={respuestas.item2_edad} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/30 focus:border-[#ff3f14] focus:outline-none text-white font-vt323 text-2xl transition-colors cursor-pointer appearance-none">
                    <option value="3 a 12 años (Niño - Responder con apoyo de tutor)">3 a 12 años (Niño - Con apoyo de tutor)</option>
                    <option value="13 a 29 años (Jóvenes)">13 a 29 años (Jóvenes)</option>
                    <option value="30 a 59 años (Adultos)">30 a 59 años (Adultos)</option>
                    <option value="60 a 70 años (Adultos Mayores)">60 a 70 años (Adultos Mayores)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#ff3f14] font-silkscreen">V</div>
                </div>
              </div>

              <div>
                <label className="block text-xl font-vt323 text-[#ff3f14] mb-2">&gt; Ítem 3. Dispositivo de acceso:</label>
                <div className="relative">
                  <select name="item3_dispositivo" value={respuestas.item3_dispositivo} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/30 focus:border-[#ff3f14] focus:outline-none text-white font-vt323 text-2xl transition-colors cursor-pointer appearance-none">
                    <option value="Teléfono celular / Smartphone">Teléfono celular / Smartphone</option>
                    <option value="Computadora de escritorio / Laptop">Computadora de escritorio / Laptop</option>
                    <option value="Tableta">Tableta (iPad / Android Tablet)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#ff3f14] font-silkscreen">V</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BLOQUE II */}
        {resideDurango === 'si' && (
          <div className="space-y-4 pt-8 border-t border-[#ff3f14]/30">
            <div className="border-b border-[#ff3f14]/50 pb-3">
              <h3 className="text-2xl font-silkscreen text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-[#ff3f14] shadow-[0_0_8px_#ff3f14]"></span>
                BLOQUE II: ALFABETIZACIÓN DIGITAL
              </h3>
              <p className="text-xl font-vt323 text-white/60 mt-2">CALIFICA DEL 1 (MÍNIMO) AL 5 (MÁXIMO).</p>
            </div>

            <LikertRow label="&gt; Ítem 4. Frecuencia de uso de dispositivos tecnológicos (celulares, PC) en vida diaria." value={respuestas.item4_frecuencia_tec} onChange={(val) => handleLikertChange('item4_frecuencia_tec', val)} opcionesTextos={['Nunca', 'Pocas veces', 'Regular', 'Frecuente', 'Siempre']} />
            <LikertRow label="&gt; Ítem 5. Familiaridad con el concepto y uso de Inteligencia Artificial (IA)." value={respuestas.item5_familiaridad_ia} onChange={(val) => handleLikertChange('item5_familiaridad_ia', val)} opcionesTextos={['No sé qué es', 'He escuchado', 'Conozco teoría', 'Uso ocasional', 'Uso avanzado']} />
            <LikertRow label="&gt; Ítem 6. Confianza en tu capacidad para identificar textos/imágenes creadas por IA." value={respuestas.item6_confianza_identificar} onChange={(val) => handleLikertChange('item6_confianza_identificar', val)} opcionesTextos={['Ninguna', 'Poca', 'Neutral', 'Moderada', 'Absoluta']} />
            <LikertRow label="&gt; Ítem 7. Frecuencia con la que buscas información/noticias en redes sociales." value={respuestas.item7_frecuencia_noticias} onChange={(val) => handleLikertChange('item7_frecuencia_noticias', val)} opcionesTextos={['Nunca', 'Pocas veces', 'Regular', 'Frecuente', 'Siempre']} />
            <LikertRow label="&gt; Ítem 8. Frecuencia con la que verificas la fuente antes de creer/compartir una noticia." value={respuestas.item8_verificacion_fuentes} onChange={(val) => handleLikertChange('item8_verificacion_fuentes', val)} opcionesTextos={['Nunca', 'Raras veces', 'A veces', 'Casi siempre', 'Siempre']} />
            <LikertRow label="&gt; Ítem 9. Nivel de impacto que crees que tiene el contenido falso (IA) en la sociedad." value={respuestas.item9_impacto_falsos} onChange={(val) => handleLikertChange('item9_impacto_falsos', val)} opcionesTextos={['Ninguno', 'Poco', 'Moderado', 'Grave', 'Crítico']} />
          </div>
        )}

        {/* BLOQUE III */}
        {resideDurango === 'si' && (
          <div className="space-y-4 pt-8 border-t border-[#ff3f14]/30">
            <div className="border-b border-[#ff3f14]/50 pb-3">
              <h3 className="text-2xl font-silkscreen text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-[#ff3f14] shadow-[0_0_8px_#ff3f14]"></span>
                BLOQUE III: CONCIENCIA Y ÉTICA
              </h3>
            </div>

            <LikertRow label="&gt; Ítem 10. Frecuencia con la que notas que el algoritmo rastrea tus conversaciones." value={respuestas.item10_algoritmos_redes} onChange={(val) => handleLikertChange('item10_algoritmos_redes', val)} opcionesTextos={['Nunca', 'Pocas veces', 'Regular', 'Frecuente', 'Siempre']} />
            <LikertRow label="&gt; Ítem 11. Uso de herramientas IA (ChatGPT, Canva AI) para productividad." value={respuestas.item11_uso_ia_productividad} onChange={(val) => handleLikertChange('item11_uso_ia_productividad', val)} opcionesTextos={['Nunca', 'Raras veces', 'A veces', 'Frecuente', 'Diario']} />
            <LikertRow label="&gt; Ítem 12. Nivel de ansiedad/incomodidad al pasar horas sin conexión a internet." value={respuestas.item12_dependencia_ansiedad} onChange={(val) => handleLikertChange('item12_dependencia_ansiedad', val)} opcionesTextos={['Ninguna', 'Poca', 'Moderada', 'Mucha', 'Extrema']} />
            <LikertRow label="&gt; Ítem 13. Acuerdo con que se creen leyes estrictas para limitar el desarrollo de IA." value={respuestas.item13_regulacion_leyes} onChange={(val) => handleLikertChange('item13_regulacion_leyes', val)} opcionesTextos={['En desacuerdo', 'Poco de acuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo']} />
            <LikertRow label="&gt; Ítem 14. Importancia que le das a revisar permisos (cámara/micrófono) en apps." value={respuestas.item14_privacidad_datos} onChange={(val) => handleLikertChange('item14_privacidad_datos', val)} opcionesTextos={['Ninguna', 'Poca', 'Moderada', 'Mucha', 'Absoluta']} />
            <LikertRow label="&gt; Ítem 15. Preocupación de que la IA reemplace empleos humanos en tu área." value={respuestas.item15_reemplazo_laboral} onChange={(val) => handleLikertChange('item15_reemplazo_laboral', val)} opcionesTextos={['Ninguna', 'Poca', 'Moderada', 'Alta', 'Máxima']} />

            <div className="pt-12 border-t border-[#ff3f14]/30 flex justify-end">
              <button type="submit" className="w-full sm:w-auto py-4 px-12 font-silkscreen text-2xl bg-[#ff3f14] text-white shadow-[4px_4px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ff3f14] transition-all cursor-pointer">
                TRANSMITIR DATOS ➔
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}