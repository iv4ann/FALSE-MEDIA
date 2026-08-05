import React, { useState, useEffect } from "react";
import { Messi } from "./messi";
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
import unsplashEzen4Jyrvyq from "../assets/unsplash_ezEn4jYrVYQ.png";

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
// COMPONENTE MODAL DE AUTENTICACIÓN (LOGIN / SIGNUP)
// ==========================================
const AuthModal = ({ type, onClose, onAuthSuccess }) => {
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleTextValidation = (e) => {
    e.target.setCustomValidity('');
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Por favor, rellena este campo.');
    }
  };

  const handleEmailValidation = (e) => {
    const val = e.target.value;
    e.target.setCustomValidity('');
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Por favor, rellena este campo.');
    } else if (e.target.validity.typeMismatch) {
      if (!val.includes('@')) {
        e.target.setCustomValidity(`Por favor incluye un '@' en el correo electrónico. A '${val}' le falta un '@'.`);
      } else if (val.endsWith('@')) {
        e.target.setCustomValidity(`Por favor ingresa una parte después del '@'. '${val}' está incompleto.`);
      } else {
        e.target.setCustomValidity('El formato del correo electrónico no es válido.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return;
    setErrorMsg('');
    setLoading(true);

    const endpoint = isLogin ? 'https://false-media.onrender.com/api/login' : 'https://false-media.onrender.com/api/registro';
    const payload = isLogin ? { email, password } : { nombre: name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onAuthSuccess(data.usuario);
        onClose();
      } else {
        setErrorMsg(data.error || 'Ocurrió un error');
      }
    } catch (err) {
      setErrorMsg('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans overflow-y-auto">
      <div className="w-full max-w-5xl bg-black border-2 border-[#ff3f14] shadow-[8px_8px_0px_#ff3f14,0_0_40px_rgba(255,63,20,0.4)] flex flex-col md:flex-row min-h-[620px] relative overflow-hidden my-auto">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20 opacity-40"></div>
        
        <button onClick={onClose} className="absolute top-4 right-6 font-vt323 text-white/60 hover:text-white text-3xl cursor-pointer z-[150] bg-black/40 px-2 py-1 rounded">
          [X]
        </button>

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
            </div>

            {errorMsg && (
              <div className="mb-4 p-2 bg-red-900/60 border border-red-500 text-red-200 font-vt323 text-lg rounded">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-[#ff3f14] font-vt323 text-xl mb-1 uppercase">Identificación (Nombre)</label>
                  <input
                    type="text"
                    required
                    onInvalid={handleTextValidation}
                    onInput={handleTextValidation}
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
                  onInvalid={handleEmailValidation}
                  onInput={handleEmailValidation}
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
                  onInvalid={handleTextValidation}
                  onInput={handleTextValidation}
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
                  disabled={!consent || loading} 
                  className={`py-2 px-8 font-silkscreen text-xl transition-all duration-300 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] ${
                    consent && !loading
                      ? 'bg-[#ff3f14] text-white hover:bg-white hover:text-black hover:shadow-[#ff3f14] cursor-pointer' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed shadow-none'
                  }`}
                >
                  {loading ? 'PROCESANDO...' : (isLogin ? 'ACCEDER' : 'REGISTRAR')}
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
// MODAL PARA EDITAR PERFIL
// ==========================================
const EditProfileModal = ({ user, onClose, onUpdateSuccess }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextValidation = (e) => {
    e.target.setCustomValidity('');
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Por favor, rellena este campo.');
    }
  };

  const handleEmailValidation = (e) => {
    const val = e.target.value;
    e.target.setCustomValidity('');
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Por favor, rellena este campo.');
    } else if (e.target.validity.typeMismatch) {
      if (!val.includes('@')) {
        e.target.setCustomValidity(`Por favor incluye un '@' en el correo electrónico. A '${val}' le falta un '@'.`);
      } else if (val.endsWith('@')) {
        e.target.setCustomValidity(`Por favor ingresa una parte después del '@'. '${val}' está incompleto.`);
      } else {
        e.target.setCustomValidity('El formato del correo electrónico no es válido.');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    const payload = { nombre: name, email: email };
    if (password.trim() !== "") {
      payload.password = password;
    }

    try {
      const response = await fetch('https://false-media.onrender.com/api/usuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        onUpdateSuccess(data.usuario || { ...user, name: name, email: email });
        onClose();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
      <div className="w-full max-w-md bg-black border-2 border-[#ff3f14] p-6 shadow-[8px_8px_0px_#ff3f14] relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-vt323 text-white/50 hover:text-white text-2xl cursor-pointer z-50">
          [X]
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="font-silkscreen text-white text-xl">MODIFICAR PERFIL</h2>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-[#ff3f14] font-vt323 text-xl mb-1">Nombre</label>
            <input 
              type="text" 
              required 
              onInvalid={handleTextValidation}
              onInput={handleTextValidation}
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white font-vt323 text-xl focus:outline-none focus:border-[#ff3f14]"
            />
          </div>
          
          <div>
            <label className="block text-[#ff3f14] font-vt323 text-xl mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              onInvalid={handleEmailValidation}
              onInput={handleEmailValidation}
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white font-vt323 text-xl focus:outline-none focus:border-[#ff3f14]"
            />
          </div>

          <div>
            <label className="block text-[#ff3f14] font-vt323 text-xl mb-1">Nueva Contraseña <span className="text-white/40 text-sm">(Opcional)</span></label>
            <input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white font-vt323 text-xl focus:outline-none focus:border-[#ff3f14]"
              placeholder="Deja en blanco para no cambiar"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 mt-4 bg-[#ff3f14] text-white font-silkscreen hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            {loading ? 'GUARDANDO...' : 'ACTUALIZAR DATOS'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// MODAL PARA ELIMINAR CUENTA (NUEVO)
// ==========================================
const DeleteProfileModal = ({ user, onClose, onDeleteSuccess, mostrarAlerta }) => {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const expectedText = `delete ${user.name}`;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmText !== expectedText) return;
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('https://false-media.onrender.com/api/usuario', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        onDeleteSuccess();
      } else {
        mostrarAlerta("No se pudo eliminar la cuenta.");
        onClose();
      }
    } catch (err) {
      mostrarAlerta("Error de red al intentar borrar la cuenta.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
      <div className="w-full max-w-md bg-black border-2 border-red-700 p-6 shadow-[8px_8px_0px_#b91c1c] relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-vt323 text-white/50 hover:text-white text-2xl cursor-pointer z-50">
          [X]
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-silkscreen text-red-500 text-xl">ADVERTENCIA CRÍTICA</h2>
        </div>
        
        <p className="font-vt323 text-white text-xl mb-6">
          Estás a punto de eliminar tu perfil de forma <span className="text-red-500">permanente</span>. Esta acción no se puede deshacer.
        </p>
        
        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-white/70 font-vt323 text-lg mb-2">
              Para confirmar, escribe exactamente: <span className="text-[#ff3f14] bg-white/10 px-2 py-1 font-bold">{expectedText}</span>
            </label>
            <input 
              type="text" 
              required 
              value={confirmText} 
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-red-700/50 text-white font-vt323 text-xl focus:outline-none focus:border-red-500 focus:bg-red-950/30"
              placeholder={expectedText}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || confirmText !== expectedText}
            className={`w-full py-2 font-silkscreen transition-colors ${
              confirmText === expectedText 
              ? 'bg-red-700 text-white hover:bg-red-600 cursor-pointer' 
              : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {loading ? 'ELIMINANDO...' : 'BORRAR MI CUENTA'}
          </button>
        </form>
      </div>
    </div>
  );
};


// ==========================================
// COMPONENTE PRINCIPAL (FRAME)
// ==========================================
export const Frame = ({ respuestasMultimedia, setRespuestasMultimedia, onSubmitReal }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState(null);
  const [user, setUser] = useState(null);
  
  const [alertaMensaje, setAlertaMensaje] = useState(null);

  const mostrarAlerta = (mensaje) => {
    setAlertaMensaje(mensaje);
    setTimeout(() => {
      setAlertaMensaje(null);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    if (activeNavigation === 'Survey') setActiveNavigation(null);
  };

  // ----------------------------------------------------
  // VISTA INTERNA (Secciones y Encuesta)
  // ----------------------------------------------------
  if (activeNavigation) {
    return (
      <div className="w-full h-screen bg-black flex flex-col overflow-hidden font-sans">
        
        {alertaMensaje && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-[#4a0a0a] text-white/90 font-vt323 text-2xl px-10 py-3 rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-[#2b0505]">
            {alertaMensaje}
          </div>
        )}

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

          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="font-vt323 text-[#ff3f14] text-[22px]">[OP: {user.name.toUpperCase()}]</span>
                <button onClick={() => setActiveModal('edit')} className="bg-amber-600 text-white px-3 py-1 rounded font-vt323 text-xl hover:bg-amber-500 cursor-pointer">Modificar</button>
                <button onClick={() => setActiveModal('delete')} className="bg-red-700 text-white px-3 py-1 rounded font-vt323 text-xl hover:bg-red-600 cursor-pointer">Borrar Cuenta</button>
                <button onClick={handleLogout} className="bg-white text-black px-4 py-1 rounded font-vt323 text-xl hover:bg-[#ff3f14] hover:text-white cursor-pointer">Desconectar</button>
              </>
            )}
          </div>
        </header>

        <main className={`w-full flex-1 overflow-x-hidden flex justify-center items-start py-12 pb-24 relative ${activeModal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
          <div className="relative transform scale-105 origin-top transition-transform w-full px-4">
            {activeNavigation === 'Imagenes' && <Messi respuestas={respuestasMultimedia} setRespuestas={setRespuestasMultimedia} />}
            {activeNavigation === 'Videos' && <Videos respuestas={respuestasMultimedia} setRespuestas={setRespuestasMultimedia} />}
            {activeNavigation === 'Noticias' && <Noticias respuestas={respuestasMultimedia} setRespuestas={setRespuestasMultimedia} />}
            {activeNavigation === 'Audios' && <Audios respuestas={respuestasMultimedia} setRespuestas={setRespuestasMultimedia} />}
            
            {activeNavigation === 'Survey' && (
              <Survey participant={user} onEarlyEnd={() => setActiveNavigation(null)} onSubmit={(surveyData) => onSubmitReal(surveyData)} />
            )}
          </div>
        </main>

        {activeModal === 'edit' && (
          <EditProfileModal user={user} onClose={() => setActiveModal(null)} onUpdateSuccess={(updated) => setUser({ ...user, name: updated.nombre, email: updated.email })} />
        )}

        {activeModal === 'delete' && (
          <DeleteProfileModal 
            user={user} 
            onClose={() => setActiveModal(null)} 
            mostrarAlerta={mostrarAlerta}
            onDeleteSuccess={() => { 
              localStorage.removeItem('token'); 
              setUser(null); 
              setActiveNavigation(null); 
              setActiveModal(null);
              mostrarAlerta("Cuenta eliminada permanentemente."); 
            }} 
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
      
      {alertaMensaje && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-[#4a0a0a] text-white/90 font-vt323 text-2xl px-10 py-3 rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-[#2b0505]">
          {alertaMensaje}
        </div>
      )}

      {/* 1. BARRA SUPERIOR FIJA */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-[#000000cc] border-b border-white/10 flex items-center justify-end px-10 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="font-vt323 text-[#ff3f14] text-[26px]">[OP: {user.name.toUpperCase()}]</span>
              <button onClick={() => setActiveModal('edit')} className="bg-amber-600 text-white px-3 py-1 rounded font-vt323 text-xl hover:bg-amber-500 cursor-pointer">Modificar</button>
              <button onClick={() => setActiveModal('delete')} className="bg-red-700 text-white px-3 py-1 rounded font-vt323 text-xl hover:bg-red-600 cursor-pointer">Borrar Cuenta</button>
              <button onClick={handleLogout} className="bg-white text-black px-5 py-1.5 rounded font-vt323 text-[26px] hover:bg-[#ff3f14] hover:text-white cursor-pointer">Desconectar</button>
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
          <img className="absolute top-0 left-0 w-full h-[1159px] object-cover pointer-events-none z-0" alt="Retro television displays" src={unsplashEzen4Jyrvyq} />
          <div className="absolute top-[1157px] left-0 w-full h-[1024px] bg-black shadow-[0px_4px_122px_155px_#00000040,0px_4px_67.3px_156px_#00000040] pointer-events-none z-0" />

          <div className="relative w-[1440px] h-full shrink-0 z-10 pointer-events-none">
            
            <header className="absolute top-0 left-0 w-[1440px] h-[716px]">
              <div className="absolute top-[188px] left-[1025px] w-[586px] h-[349px] rounded-[293px/174.5px] border border-dashed border-white pointer-events-auto" aria-hidden="true" />
              <nav className="absolute top-[660px] left-[390px] w-[724px] h-[57px] flex items-center justify-center gap-[60px] bg-[#ff3f14] rounded-md shadow-[4px_4px_0px_#000000bf] pointer-events-auto">
                {navigationItems.map((item) => (
                  <button key={item.label} type="button" className="flex items-center gap-4 font-vt323 font-normal text-white text-2xl tracking-[0] leading-[normal] whitespace-nowrap hover:scale-105 transition-transform cursor-pointer focus-visible:outline-white" onClick={() => setActiveNavigation(item.label)}>
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
                FALSE-MEDIA nace como una plataforma web y un espacio de concientización diseñado para visibilizar el uso irresponsable de la inteligencia artificial, promoviendo el pensamiento crítico frente a la proliferación masiva de deepfakes, audios sintéticos y noticias alteradas. Nuestro objetivo es examinar cómo la manipulación digital afecta la confianza pública.
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
                  mostrarAlerta("No has iniciado sesion.");
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
          onAuthSuccess={(userData) => setUser({ name: userData.nombre, email: userData.email })} 
        />
      )}

      {activeModal === 'edit' && (
        <EditProfileModal user={user} onClose={() => setActiveModal(null)} onUpdateSuccess={(updated) => setUser({ ...user, name: updated.nombre, email: updated.email })} />
      )}

      {activeModal === 'delete' && (
        <DeleteProfileModal 
          user={user} 
          onClose={() => setActiveModal(null)}
          mostrarAlerta={mostrarAlerta}
          onDeleteSuccess={() => { 
            localStorage.removeItem('token'); 
            setUser(null); 
            setActiveNavigation(null); 
            setActiveModal(null);
            mostrarAlerta("Cuenta eliminada permanentemente."); 
          }} 
        />
      )}

    </div>
  );
};