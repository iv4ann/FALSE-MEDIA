import React, { useState } from "react";
import unsplashEzen4Jyrvyq from "../assets/unsplash_ezEn4jYrVYQ.png";

const navigationItems = ["Imagenes", "Videos", "Noticias", "Audios"];

// Base de datos completa con los ítems de tu Bloque IV
const mediaCategories = {
  Imagenes: [
    { id: 16, type: 'image', url: '/messi.jpg', thumb: '/messi.jpg', title: 'Messi', isIA: true, desc: 'Ítem 16. Messi anotando un gol.', exp: 'Al observar mas de cerca a los jugadores de Espana, todos tienen el numero 5 como tambien la red no esta generada bien en la imagen.' },
    { id: 17, type: 'image', url: '/everest.jpg', thumb: '/everest.jpg', title: 'Paisaje nublado', isIA: false, desc: 'Ítem 17. Paisaje nublado.', exp: 'No es IA, las proporciones de las nubes son reales.' },
    { id: 18, type: 'image', url: '/a274e7eb-7874-447f-8160-2b92c0eb56a6.jpeg', thumb: '/a274e7eb-7874-447f-8160-2b92c0eb56a6.jpeg', title: 'Elvis Retro', isIA: true, desc: 'Ítem 18. Elvis en un acantilado.', exp: 'Si es IA, Elvis y la valla se ven sobrepuestos con respecto al paisaje.' }
  ],
  Noticias: [
    { id: 19, type: 'image', url: '/Captura de pantalla 2026-07-22 225643.jpg', thumb: '/Captura de pantalla 2026-07-22 225643.jpg', title: 'Noticia del Papa', isIA: true, desc: 'Ítem 19. Noticia del Papa Francisco I.', exp: 'Si es IA, aunque en un principio parece real si pones atencion las texturas de la chamarra no se ven bien.' },
    { id: 20, type: 'image', url: '/noticia1.png', thumb: '/noticia1.png', title: 'Meteorito en NJ', isIA: false, desc: 'Ítem 20. Noticia de Meteorito que cayo en Nueva Jersey.', exp: 'No es IA, en este tipo de noticias es importante verificar la fuente.' }
  ],
  Videos: [
    { id: 21, type: 'video', url: '/Attack on Titan – If it was made in 1970! [t12Uzr3OL-Q].mp4', thumb: '/everest.jpg', title: 'Caricatura 70s', isIA: true, desc: 'Ítem 21. Caricatura de los 70s.', exp: 'No manches pa se ve luego luego.' },
    { id: 22, type: 'video', url: '/The Better Minecraft Movie [HFkr74Xy1Y4].mp4', thumb: '/messi.jpg', title: 'Gordon Ramsay', isIA: false, desc: 'Ítem 22. Gordon Ramsay en Minecraft.', exp: 'No manches pa se ve luego luego.' },
    { id: 23, type: 'video', url: '/CRAFT (1979)： The First Night ｜ Episode 1 [zX-e9LRR_ko].mp4', thumb: '/noticia1.png', title: 'Pelicula Retro', isIA: true, desc: 'Ítem 23. Pelicula Retro.', exp: 'No manches pa se ve luego luego.' }
  ],
  Audios: [
    { id: 24, type: 'audio', url: '/Gangsta’s Paradise - 1950\'s Soul Version - Soul\'d Out (128k).mp3', thumb: '/a274e7eb-7874-447f-8160-2b92c0eb56a6.jpeg', title: 'Audio 1', isIA: true, desc: 'Ítem 24. Audio 1.', exp: 'No manches pa se ve luego luego.' },
    { id: 25, type: 'audio', url: '/Foster The People - Houdini (Official Video) - FosterThePeople (128k).mp3', thumb: '/everest.jpg', title: 'Audio 2', isIA: false, desc: 'Ítem 25. Audio 2.', exp: 'No manches pa se ve luego luego.' },
    { id: 26, type: 'audio', url: '/Shaggy - It Wasn\'t Me (Country AI Version) [OD-Edp2BlsQ].mp3', thumb: '/messi.jpg', title: 'Audio 3', isIA: true, desc: 'Ítem 26. Audio 3.', exp: 'No manches pa se ve luego luego.' }
  ]
};

export const Messi = ({ respuestas, setRespuestas }) => {
  const [activeCategory, setActiveCategory] = useState("Imagenes");
  const [activeIndex, setActiveIndex] = useState(0); // <-- Solo déjalo una vez
  const [intentoCambio, setIntentoCambio] = useState(false);

  const currentCategoryData = mediaCategories[activeCategory];
  const activeItem = currentCategoryData[activeIndex];
  const userAns = respuestas[activeItem.id];
  const isCorrect = (userAns === 'IA' && activeItem.isIA) || (userAns === 'REAL' && !activeItem.isIA);

  const getVisibleItems = () => {
    return [
      ...currentCategoryData.slice(activeIndex),
      ...currentCategoryData.slice(0, activeIndex),
    ];
  };

  const handleNavClick = (cat) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    setIntentoCambio(false);
  };

  const handleAnswer = (ans) => {
    if (userAns) {
      setIntentoCambio(true);
      setTimeout(() => setIntentoCambio(false), 3000);
      return;
    }
    setRespuestas({ ...respuestas, [activeItem.id]: ans });
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden font-sans">
      <main className="relative w-[1440px] h-[1024px] overflow-hidden shrink-0 bg-black shadow-2xl">
        
        {/* FONDO TEMÁTICO DE FALSE-MEDIA */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Fondo Retro Televisores"
            src={unsplashEzen4Jyrvyq}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Barra de Navegación superior */}
        <nav className="absolute top-[60px] w-full flex justify-center gap-[120px] z-20">
          {navigationItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`font-vt323 text-[28px] transition-colors cursor-pointer tracking-widest outline-none focus-visible:underline ${
                activeCategory === item ? "text-[#ff3f14] drop-shadow-[0_0_10px_rgba(255,63,20,0.8)]" : "text-white/70 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* SECCIÓN IZQUIERDA: Textos, Reproductor y Botones Real/IA */}
        <section className="absolute top-[150px] left-[100px] w-[540px] z-20 flex flex-col gap-4">
          
          <div>
            <h1 className="m-0 font-silkscreen text-[44px] leading-[1.1] text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]">
              {activeItem.title}
            </h1>
            <p className="mt-2 font-vt323 text-[20px] leading-[26px] text-gray-300">
              {activeItem.desc}
            </p>
          </div>

          {/* Visor Multimedia Activo (Imagenes, Videos o Audios) */}
          <div className="bg-black/80 rounded-xl overflow-hidden flex justify-center items-center h-[210px] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            {activeItem.type === 'image' && (
              <img src={activeItem.url} alt="Reto" className="max-h-[210px] w-auto object-contain" />
            )}
            {activeItem.type === 'video' && (
              <video controls playsInline className="w-full max-h-[210px] object-contain">
                <source src={activeItem.url} type="video/mp4" />
              </video>
            )}
            {activeItem.type === 'audio' && (
              <div className="w-full p-4 flex flex-col items-center">
                <div className="w-14 h-14 mb-2 rounded-full bg-[#ff3f14]/20 flex items-center justify-center animate-pulse">
                   <span className="font-silkscreen text-[#ff3f14] text-xl">AUDIO</span>
                </div>
                <audio controls className="w-full">
                  <source src={activeItem.url} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>

          {/* Botones de Selección: IA vs Real */}
          <div className="w-full">
            <span className="block text-xs font-vt323 text-white/60 tracking-widest uppercase mb-1">Evalúa el contenido:</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAnswer('IA')}
                className={`py-2 px-3 rounded-lg font-vt323 text-xl border transition-all cursor-pointer ${
                  userAns === 'IA' 
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.6)]' 
                    : userAns 
                      ? 'bg-white/5 text-white/30 border-white/10' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                GENERADO POR IA
              </button>
              <button
                type="button"
                onClick={() => handleAnswer('REAL')}
                className={`py-2 px-3 rounded-lg font-vt323 text-xl border transition-all cursor-pointer ${
                  userAns === 'REAL' 
                    ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.6)]' 
                    : userAns 
                      ? 'bg-white/5 text-white/30 border-white/10' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                ES REAL
              </button>
            </div>
          </div>

          {/* Feedback Explicativo */}
          <div className={`transition-all duration-500 overflow-hidden ${userAns ? 'max-h-[160px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`p-3 rounded-lg border backdrop-blur-md ${
              isCorrect ? 'bg-emerald-900/40 border-emerald-500/50' : 'bg-amber-900/40 border-amber-500/50'
            }`}>
              <div className={`font-silkscreen text-lg mb-1 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}
              </div>
              <p className="text-gray-200 font-vt323 text-[18px] leading-tight">
                <strong className="text-white">¿Cómo identificarlo?:</strong> {activeItem.exp}
              </p>
            </div>
          </div>

          {/* Alerta de intento de cambio */}
          <div className={`transition-all duration-300 overflow-hidden ${intentoCambio ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-1.5 bg-red-900/60 border border-red-500/50 text-red-200 font-vt323 text-lg rounded-lg text-center">
               No se puede modificar la respuesta una vez enviada.
            </div>
          </div>

        </section>

        {/* SECCIÓN DERECHA: Carrusel Dinámico de Fotografías */}
        <section className="absolute top-[300px] left-[760px] flex items-center gap-[30px] z-20">
          {getVisibleItems().map((item, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => {
                  const originalIndex = currentCategoryData.findIndex((i) => i.id === item.id);
                  setActiveIndex(originalIndex);
                  setIntentoCambio(false);
                }}
                className={`relative shrink-0 overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-[10px_10px_30px_rgba(0,0,0,0.9)] border border-white/10 ${
                  isFirst
                    ? "w-[320px] h-[440px] rounded-[10px] scale-100 opacity-100 border-white/40 ring-2 ring-[#ff3f14]/50"
                    : "w-[220px] h-[340px] rounded-[10px] opacity-40 hover:opacity-80 hover:-translate-y-2"
                }`}
              >
                {respuestas[item.id] && (
                  <div className="absolute top-3 right-3 z-30 bg-black/80 backdrop-blur px-3 py-1 rounded-full border border-white/20">
                    <span className="font-vt323 text-white text-lg">Resuelto</span>
                  </div>
                )}
                <img
                  className="w-full h-full object-cover"
                  alt={item.title}
                  src={item.thumb}
                />
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};