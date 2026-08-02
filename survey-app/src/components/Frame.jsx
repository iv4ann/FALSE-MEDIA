import React, { useState, useEffect } from "react";
import { Messi } from "./Messi"; 
import Videos from "./Videos";
import Noticias from "./Noticias";
import Audios from "./Audios";
import Survey from "./Survey";

import ellipse3 from "../assets/Ellipse 3.svg";
import ellipse8 from "../assets/Ellipse 8.svg";
import ellipse9 from "../assets/Ellipse 9.svg";
import line1 from "../assets/Line 1.svg";
import line2 from "../assets/Line 2.svg";
import line3 from "../assets/Line 3.svg";
import polygon3 from "../assets/Polygon 3.svg";
import polygon4 from "../assets/Polygon 4.svg";
import polygon5 from "../assets/Polygon 5.svg";
import polygon6 from "../assets/Polygon 6.svg";
import rectangle6 from "../assets/Rectangle 6.svg";
import rectangle9 from "../assets/Rectangle 9.svg";
import rectangle10 from "../assets/Rectangle 10.svg";
import unsplashEzen4Jyrvyq from "../assets/unsplash_eZen4JyrVYQ.png";

const navigationItems = [
  { label: "Videos", icon: polygon5 },
  { label: "Audios", icon: polygon6 },
  { label: "Noticias", icon: polygon4 },
  { label: "Imagenes", icon: polygon3 },
];

const contentSections = [
  {
    title: "NOTICIAS",
    image: rectangle6,
    imageLeft: "left-16",
    line: line1,
    lineLeft: "left-16",
    description:
      "Esta sección recopila reportes de actualidad e investigaciones enfocadas en exponer cómo la inteligencia artificial se utiliza para fabricar noticias falsas y manipular la opinión pública a gran escala, promoviendo un análisis crítico ante la desinformación digital.",
  },
  {
    title: "VIDEOS",
    image: rectangle9,
    imageLeft: "left-[395px]",
    line: line3,
    lineLeft: "left-[393px]",
    description:
      "Aquí encontrarás evidencias visuales, análisis de deepfakes y comparativas que demuestran la alarmante facilidad con la que se pueden alterar rostros y escenarios mediante IA, evidenciando los graves riesgos de creer ciegamente en lo que vemos en la red.",
  },
  {
    title: "AUDIO",
    image: rectangle10,
    imageLeft: "left-[726px]",
    line: line2,
    lineLeft: "left-[726px]",
    description:
      "Espacio dedicado a registrar y analizar casos de clonación de voz, audios sintéticos y fraudes auditivos, mostrando el impacto oculto que la manipulación sonora genera en la confianza, la privacidad y la seguridad de las personas.",
  },
];

// ==========================================
// COMPONENTE MODAL DE AUTENTICACIÓN
// ==========================================
const AuthModal = ({ type, onClose, onAuth }) => {
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;
    if (onAuth) onAuth({ email, name: isLogin ? 'Operador Local' : name }); 
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans overflow-y-auto">
      <div className="w-full max-w-5xl bg-black border-2 border-[#ff3f14] shadow-[8px_8px_0px_#ff3f14,0_0_40px_rgba(255,63,20,0.4)] flex flex-col md:flex-row min-h-[620px] relative overflow-hidden my-auto">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-40"></div>
        <div className="w-full md:w-3/5 p-8 md:p-12 relative z-30 flex flex-col justify-between bg-black">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-silkscreen text-white text-3xl mb-1 text-shadow-sm shadow-[#ff3f14]">
                  {isLogin ? 'INICIAR SESIÓN' : 'REGISTRO DE OPERADOR'}
                </h2>
                <p className="font-vt323 text-[#ff3f14] text-xl tracking-wider">
                  &gt; ESTUDIO DE DURANGO_
                </p>
              </div>
              <button onClick={onClose} className="font-vt323 text-white/50 hover:text-white text-2xl cursor-pointer">
                [X]
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-[#ff3f14] font-vt323 text-xl mb-1 uppercase">Identificación (Nombre)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 focus:border-[#ff3f14] focus:outline-none focus:ring-1 focus:ring-[#ff3f14] text-white font-vt323 text-xl transition-colors placeholder-white/30"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-[#ff3f14] font-vt323 text-xl mb-1 uppercase">Frecuencia (Correo)</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 focus:border-[#ff3f14] focus:outline-none focus:ring-1 focus:ring-[#ff3f14] text-white font-vt323 text-xl transition-colors placeholder-white/30"
                  placeholder="usuario@red.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[#ff3f14] font-vt323 text-xl mb-1 uppercase">Código de Acceso (Contraseña)</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 focus:border-[#ff3f14] focus:outline-none focus:ring-1 focus:ring-[#ff3f14] text-white font-vt323 text-xl transition-colors placeholder-white/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
                {['100% Anónimo y seguro', 'Sin datos sensibles', 'Exclusivo en Durango', 'Fines estadísticos'].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-vt323 text-white/70">
                    <span className="w-2 h-2 bg-emerald-500 shadow-[0_0_5px_#10b981]"></span>
                    {req}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="sr-only" />
                    <div className={`w-5 h-5 border-2 transition-all duration-200 flex items-center justify-center ${
                      consent ? 'bg-[#ff3f14] border-[#ff3f14]' : 'bg-transparent border-white/50 group-hover:border-white'
                    }`}>
                      {consent && <span className="font-silkscreen text-white text-xs">X</span>}
                    </div>
                  </div>
                  <span className="text-lg font-vt323 text-white/80 leading-tight">
                    Doy mi consentimiento informado para participar voluntariamente en esta prueba de interacción.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit" 
                  disabled={!consent} 
                  className={`py-2 px-8 font-silkscreen text-xl transition-all duration-300 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] ${
                    consent 
                      ? 'bg-[#ff3f14] text-white hover:bg-white hover:text-black hover:shadow-[#ff3f14] cursor-pointer' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isLogin ? 'ACCEDER' : 'REGISTRAR'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:block md:w-2/5 relative border-l-2 border-[#ff3f14] bg-black">
          <img src={unsplashEzen4Jyrvyq} alt="Retro tech" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
          <div className="absolute inset-0 bg-[#ff3f14]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]"></div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center z-30">
             <div className="inline-block px-4 py-1 border border-[#ff3f14] bg-black/80 font-vt323 text-[#ff3f14] text-2xl shadow-[0_0_15px_rgba(255,63,20,0.5)]">
               SISTEMA DE ANÁLISIS ACTIVO
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (FRAME)
// ==========================================
export const Frame = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState(null);
  const [user, setUser] = useState(null);

  // ----------------------------------------------------
  // VISTA INTERNA (Secciones y Encuesta)
  // ----------------------------------------------------
  if (activeNavigation) {
    return (
      <div className="w-full h-screen bg-black flex flex-col overflow-hidden font-sans">
        <header className="w-full h-[80px] shrink-0 bg-[#000000cc] border-b border-white/10 flex items-center justify-between px-10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-50">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveNavigation(null)} 
              className="text-[#ff3f14] font-silkscreen text-2xl hover:text-white hover:scale-105 transition-all drop-shadow-[0_0_8px_rgba(255,63,20,0.6)] cursor-pointer"
            >
              ← INICIO
            </button>
            
            <nav className="flex gap-8 ml-4 border-l border-white/20 pl-8">
              {['Imagenes', 'Videos', 'Noticias', 'Audios'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveNavigation(cat)}
                  className={`font-vt323 text-[28px] tracking-widest transition-colors cursor-pointer ${
                    activeNavigation === cat 
                      ? 'text-[#ff3f14] drop-shadow-[0_0_10px_rgba(255,63,20,0.8)] underline underline-offset-8' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="font-vt323 font-normal text-[#ff3f14] text-[26px] tracking-[0]">
                  [OP: {user.name.toUpperCase()}]
                </span>
                <button 
                  onClick={() => {
                    setUser(null);
                    if (activeNavigation === 'Survey') setActiveNavigation(null);
                  }} 
                  className="bg-white rounded-md px-5 py-1.5 font-vt323 font-normal text-black text-[26px] tracking-[0] hover:bg-[#ff3f14] hover:text-white transition-colors shadow-md cursor-pointer"
                >
                  Desconectar
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setActiveModal('login')} className="font-vt323 font-normal text-white text-[26px] tracking-[0] hover:text-[#ff3f14] transition-colors cursor-pointer">
                  Log in
                </button>
                <button onClick={() => setActiveModal('signup')} className="bg-white rounded-md px-5 py-1.5 font-vt323 font-normal text-black text-[26px] tracking-[0] hover:bg-[#ff3f14] hover:text-white transition-colors shadow-md cursor-pointer">
                  Sign up
                </button>
              </>
            )}
          </div>
        </header>

        <main className={`w-full flex-1 overflow-x-hidden flex justify-center items-start py-12 pb-24 relative ${activeModal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
          <div className="relative transform scale-105 origin-top transition-transform w-full px-4">
            {activeNavigation === 'Imagenes' && <Messi />}
            {activeNavigation === 'Videos' && <Videos />}
            {activeNavigation === 'Noticias' && <Noticias />}
            {activeNavigation === 'Audios' && <Audios />}
            {activeNavigation === 'Survey' && (
              <Survey 
                participant={user} 
                onEarlyEnd={() => setActiveNavigation(null)} 
                onSubmit={() => setActiveNavigation(null)} 
              />
            )}
          </div>
        </main>

        {(activeModal === 'login' || activeModal === 'signup') && (
          <AuthModal 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
            onAuth={(userData) => setUser(userData)} 
          />
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // VISTA PRINCIPAL (INICIO)
  // ----------------------------------------------------
  return (
    <div className="w-full h-screen bg-black overflow-hidden font-sans relative flex flex-col">
      
      {/* 1. BARRA SUPERIOR FIJA */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-[#000000cc] border-b border-white/10 flex items-center justify-end px-10 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="font-vt323 font-normal text-[#ff3f14] text-[26px] tracking-[0]">
                [OP: {user.name.toUpperCase()}]
              </span>
              <button 
                onClick={() => setUser(null)} 
                className="bg-white rounded-md px-5 py-1.5 font-vt323 font-normal text-black text-[26px] tracking-[0] hover:bg-[#ff3f14] hover:text-white transition-colors shadow-md cursor-pointer"
              >
                Desconectar
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveModal('login')} className="font-vt323 font-normal text-white text-[26px] tracking-[0] hover:text-[#ff3f14] transition-colors cursor-pointer">
                Log in
              </button>
              <button onClick={() => setActiveModal('signup')} className="bg-white rounded-md px-5 py-1.5 font-vt323 font-normal text-black text-[26px] tracking-[0] hover:bg-[#ff3f14] hover:text-white transition-colors shadow-md cursor-pointer">
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. ÚNICO CONTENEDOR CON SCROLL DE LA APP */}
      <main className={`w-full h-full overflow-x-hidden relative ${activeModal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
        
        <div className="relative w-full h-[2048px] flex justify-center">
          
          <img
            className="absolute top-0 left-0 w-full h-[1159px] object-cover pointer-events-none z-0"
            alt="Retro television displays and electronic equipment"
            src={unsplashEzen4Jyrvyq}
          />
          <div className="absolute top-[1157px] left-0 w-full h-[1024px] bg-black shadow-[0px_4px_122px_155px_#00000040,0px_4px_67.3px_156px_#00000040] pointer-events-none z-0" />

          <div className="relative w-[1440px] h-full shrink-0 z-10 pointer-events-none">
            
            <header className="absolute top-0 left-0 w-[1440px] h-[716px]">
              <div
                className="absolute top-[188px] left-[1025px] w-[586px] h-[349px] rounded-[293px/174.5px] border border-dashed border-white pointer-events-auto"
                aria-hidden="true"
              />
              <nav
                className="absolute top-[660px] left-[390px] w-[724px] h-[57px] flex items-center justify-center gap-[60px] bg-[#ff3f14] rounded-md shadow-[4px_4px_0px_#000000bf] pointer-events-auto"
              >
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex items-center gap-4 font-vt323 font-normal text-white text-2xl tracking-[0] leading-[normal] whitespace-nowrap hover:scale-105 transition-transform cursor-pointer focus-visible:outline-white"
                    onClick={() => setActiveNavigation(item.label)}
                  >
                    {item.label}
                    <img className="w-[8px] h-[10px]" alt="" src={item.icon} aria-hidden="true" />
                  </button>
                ))}
              </nav>
              
              <img className="absolute top-[275px] left-[938px] w-44 h-44 object-cover pointer-events-auto" alt="" src={ellipse8} />
              <img className="absolute top-[478px] left-[1221px] w-[131px] h-[131px] object-cover pointer-events-auto" alt="" src={ellipse9} />
              <img className="absolute top-[134px] left-[1221px] w-[131px] h-[131px] object-cover pointer-events-auto" alt="" src={ellipse3} />
              
              <h1 className="absolute top-[134px] left-[122px] m-0 font-silkscreen font-normal text-white text-[61px] tracking-[0] leading-[73.2px] whitespace-nowrap pointer-events-auto">
                FALSE MEDIA
              </h1>
            </header>

            {contentSections.map((section) => (
              <img key={section.title} className={`absolute top-[936px] ${section.imageLeft} w-[300px] h-[600px] object-cover pointer-events-auto`} alt="" src={section.image} />
            ))}

            <section className="pointer-events-auto">
              <h2 className="absolute top-[969px] left-[1050px] w-[350px] m-0 font-silkscreen font-normal text-white text-[50px] tracking-[0] leading-[55px]">
                ACERCA DE<br />NOSOTROS
              </h2>
              <p className="absolute top-[1120px] left-[1050px] w-[330px] m-0 font-vt323 font-normal text-white text-[22px] tracking-[0] leading-[26px]">
                FALSE-MEDIA nace como una plataforma web y un espacio de concientización diseñado para visibilizar el uso irresponsable de la inteligencia artificial...
              </p>
            </section>

            <section className="pointer-events-auto">
              <div className="absolute top-[1582px] left-16 w-[830px] h-12 px-4 flex justify-between items-center shadow-[inset_0px_0px_1px_#ffffff,0px_0px_10px_#00000040,0px_4px_40px_#5aa4ff]">
                {contentSections.map((section) => (
                  <h3 key={section.title} className="m-0 bg-[linear-gradient(180deg,rgba(255,0,255,1)_0%,rgba(255,35,128,1)_50%,rgba(255,0,255,1)_75%,rgba(0,255,255,1)_100%)] bg-clip-text text-transparent font-silkscreen text-[36px]">
                    {section.title}
                  </h3>
                ))}
              </div>
              {contentSections.map((section) => (
                <img key={`${section.title}-line`} className={`top-[1672px] ${section.lineLeft} absolute w-[300px] h-[3px]`} alt="" src={section.line} />
              ))}

              <div className="inline-flex items-center gap-[27px] absolute top-[1724px] left-[66px]">
                {contentSections.map((section) => (
                  <p key={`${section.title}-desc`} className="relative w-[300px] h-[260px] font-vt323 text-white text-[22px] leading-[26px]">
                    {section.description}
                  </p>
                ))}
              </div>
            </section>

            <section className="pointer-events-auto">
              <p className="absolute top-[1420px] left-[1050px] w-[330px] m-0 font-silkscreen text-white text-[32px] leading-[38px]">
                550%<br />INCREMENTO<br />DEEPFAKE
              </p>
              <p className="absolute top-[1560px] left-[1050px] w-[330px] m-0 font-silkscreen text-white text-[32px] leading-[38px]">
                1 DE CADA 1,000<br />PERSONAS<br />ACIERTA<br />100%
              </p>
            </section>

            <button
              type="button"
              className="absolute top-[1750px] left-[1050px] w-[205px] h-[75px] flex items-center justify-center bg-[#ff3f14] rounded-[9px] shadow-[4px_4px_0px_#000000bf] hover:scale-105 transition-transform cursor-pointer pointer-events-auto"
              onClick={() => {
                if (user) {
                  setActiveNavigation('Survey');
                } else {
                  alert("⚠️ ACCESO DENEGADO: Necesitas iniciar sesión o registrarte como Operador para acceder al sistema de encuestas.");
                  setActiveModal('signup');
                }
              }}
            >
              <span className="font-silkscreen text-white text-xl">ENCUESTA</span>
            </button>

          </div>
        </div>
      </main>

      {(activeModal === 'login' || activeModal === 'signup') && (
        <AuthModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          onAuth={(userData) => setUser(userData)} 
        />
      )}

    </div>
  );
};