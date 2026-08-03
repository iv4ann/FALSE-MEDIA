import React, { useState } from "react";
import unsplashEzen4Jyrvyq from "../assets/unsplash_ezEn4jYrVYQ.png";

const videosData = [
  { id: 21, type: 'video', url: '/Attack on Titan – If it was made in 1970! [t12Uzr3OL-Q].mp4', thumb: '/everest.jpg', title: 'Caricatura 70s', isIA: true, desc: 'Ítem 21. Caricatura de los 70s.', exp: 'No manches pa se ve luego luego.' },
  { id: 22, type: 'video', url: '/The Better Minecraft Movie [HFkr74Xy1Y4].mp4', thumb: '/messi.jpg', title: 'Gordon Ramsay', isIA: false, desc: 'Ítem 22. Gordon Ramsay en Minecraft.', exp: 'No manches pa se ve luego luego.' },
  { id: 23, type: 'video', url: '/CRAFT (1979)： The First Night ｜ Episode 1 [zX-e9LRR_ko].mp4', thumb: '/noticia1.png', title: 'Pelicula Retro', isIA: true, desc: 'Ítem 23. Pelicula Retro.', exp: 'No manches pa se ve luego luego.' }
];

export default function Videos({ respuestas, setRespuestas }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intentoCambio, setIntentoCambio] = useState(false);

  const activeItem = videosData[activeIndex];
  const userAns = respuestas[activeItem.id];
  const isCorrect = (userAns === 'IA' && activeItem.isIA) || (userAns === 'REAL' && !activeItem.isIA);

  const getVisibleItems = () => [
    ...videosData.slice(activeIndex),
    ...videosData.slice(0, activeIndex),
  ];

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
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-60" alt="Fondo" src={unsplashEzen4Jyrvyq} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        <nav className="absolute top-[60px] w-full flex justify-center gap-[120px] z-20">
          <span className="font-vt323 text-[28px] text-[#ff3f14] tracking-widest drop-shadow-[0_0_10px_rgba(255,63,20,0.8)]">
            SECCIÓN: VIDEOS
          </span>
        </nav>

        <section className="absolute top-[150px] left-[100px] w-[540px] z-20 flex flex-col gap-4">
          <div>
            <h1 className="m-0 font-silkscreen text-[44px] leading-[1.1] text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]">{activeItem.title}</h1>
            <p className="mt-2 font-vt323 text-[20px] leading-[26px] text-gray-300">{activeItem.desc}</p>
          </div>

          <div className="bg-black/80 rounded-xl overflow-hidden flex justify-center items-center h-[210px] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <video controls playsInline key={activeItem.url} className="w-full max-h-[210px] object-contain">
              <source src={activeItem.url} type="video/mp4" />
            </video>
          </div>

          <div className="w-full">
            <span className="block text-xs font-vt323 text-white/60 tracking-widest uppercase mb-1">Evalúa el contenido:</span>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => handleAnswer('IA')} className={`py-2 px-3 rounded-lg font-vt323 text-xl border transition-all cursor-pointer ${userAns === 'IA' ? 'bg-purple-600 text-white border-purple-400' : userAns ? 'bg-white/5 text-white/30 border-white/10' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>GENERADO POR IA</button>
              <button type="button" onClick={() => handleAnswer('REAL')} className={`py-2 px-3 rounded-lg font-vt323 text-xl border transition-all cursor-pointer ${userAns === 'REAL' ? 'bg-blue-600 text-white border-blue-400' : userAns ? 'bg-white/5 text-white/30 border-white/10' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>ES REAL</button>
            </div>
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${userAns ? 'max-h-[160px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`p-3 rounded-lg border backdrop-blur-md ${isCorrect ? 'bg-emerald-900/40 border-emerald-500/50' : 'bg-amber-900/40 border-amber-500/50'}`}>
              <div className={`font-silkscreen text-lg mb-1 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>{isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}</div>
              <p className="text-gray-200 font-vt323 text-[18px] leading-tight"><strong className="text-white">¿Cómo identificarlo?:</strong> {activeItem.exp}</p>
            </div>
          </div>
          
          <div className={`transition-all duration-300 overflow-hidden ${intentoCambio ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-1.5 bg-red-900/60 border border-red-500/50 text-red-200 font-vt323 text-lg rounded-lg text-center">No se puede modificar la respuesta.</div>
          </div>
        </section>

        <section className="absolute top-[300px] left-[760px] flex items-center gap-[30px] z-20">
          {getVisibleItems().map((item, index) => (
            <div key={item.id} onClick={() => { setActiveIndex(videosData.findIndex((i) => i.id === item.id)); setIntentoCambio(false); }} className={`relative shrink-0 overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-[10px_10px_30px_rgba(0,0,0,0.9)] border border-white/10 ${index === 0 ? "w-[320px] h-[440px] rounded-[10px] scale-100 opacity-100 border-white/40 ring-2 ring-[#ff3f14]/50" : "w-[220px] h-[340px] rounded-[10px] opacity-40 hover:opacity-80 hover:-translate-y-2"}`}>
              {respuestas[item.id] && <div className="absolute top-3 right-3 z-30 bg-black/80 backdrop-blur px-3 py-1 rounded-full border border-white/20"><span className="font-vt323 text-white text-lg">Resuelto</span></div>}
              <img className="w-full h-full object-cover" alt={item.title} src={item.thumb} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}