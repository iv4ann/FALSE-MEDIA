import React, { useState } from 'react'
import { Frame } from "./components/Frame";
import Login from './components/Login'
import Survey from './components/Survey'
import Success from './components/Success'

function App() {
  // Añadimos 'home' como la vista inicial por defecto
  const [view, setView] = useState('home') // 'home' | 'login' | 'survey' | 'end' | 'thanks'
  const [participant, setParticipant] = useState(null)

  const handleLogin = (user) => {
    setParticipant(user)
    setView('survey')
  }

  const handleEndEarly = () => {
    setView('end')
  }

  const handleSubmitSurvey = async (data) => {
    console.log('Enviando datos al servidor en la nube...', data)
    
    const API_URL = 'https://false-media.onrender.com/api/guardar-encuesta';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log("✅ Datos guardados con éxito en la nube");
        setView('thanks'); 
      } else {
        throw new Error('Error al guardar en el servidor');
      }
      
    } catch (error) {
       console.error("Error al conectar con la nube:", error);
       setView('thanks');
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans antialiased text-slate-800">
      
      {/* Vista del Landing Page Principal (El diseño de Figma) */}
      {view === 'home' && (
        <Frame 
          onNavigateToLogin={() => setView('login')} 
          onNavigateToSurvey={() => setView('survey')} 
        />
      )}

      {/* Contenedor para el resto de las vistas de la app */}
      {view !== 'home' && (
        <div className="w-full max-w-5xl p-4 md:p-8">
          
          {view === 'login' && (
            <Login onLogin={handleLogin} />
          )}

          {view === 'survey' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto">
              <Survey
                participant={participant}
                onSubmit={handleSubmitSurvey}
                onEarlyEnd={handleEndEarly} 
              />
            </div>
          )}

          {view === 'end' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 text-center py-12 px-6 max-w-md mx-auto">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <span className="text-2xl">📍</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Gracias por tu interés</h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Este estudio estadístico está enfocado exclusivamente en evaluar la interacción con contenidos digitales en residentes actuales de la <span className="font-semibold text-slate-800">ciudad de Durango</span>.
              </p>
              <button
                onClick={() => {setView('home'); setParticipant(null);}}
                className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-full shadow-md transition-all active:scale-[0.98] text-sm cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          )}

          {view === 'thanks' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto">
              <Success onRestart={() => { setView('home'); setParticipant(null); }} />
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default App