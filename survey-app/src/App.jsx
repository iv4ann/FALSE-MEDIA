import React, { useState } from 'react'
import { Frame } from "./components/Frame";
import Login from './components/Login'
import Survey from './components/Survey'
import Success from './components/Success'

function App() {
  const [view, setView] = useState('home') 
  const [participant, setParticipant] = useState(null)
  
  // 1. NUEVO: La caja fuerte global para la multimedia
  const [respuestasMultimedia, setRespuestasMultimedia] = useState({}) 

  const handleLogin = (user) => {
    setParticipant(user)
    setView('survey')
  }

  const handleEndEarly = () => {
    setView('end')
  }

  // 2. NUEVO: Esta función ahora recibe los datos de la encuesta y los une con la multimedia
  const handleSubmitSurvey = async (surveyData) => {
    // Unimos los dos paquetes de datos
    const paqueteFinal = {
      ...surveyData,
      ...respuestasMultimedia
    }

    console.log('Enviando paquete completo al servidor...', paqueteFinal)
    
    // OJO: Asegúrate de que no tenga la diagonal / al final
    const API_URL = 'https://false-media.onrender.com/api/guardar-encuesta';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paqueteFinal), // Mandamos el paquete fusionado
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
      
      {view === 'home' && (
        <Frame 
          // 3. NUEVO: Le pasamos la caja fuerte y la función real a tu Frame principal
          respuestasMultimedia={respuestasMultimedia}
          setRespuestasMultimedia={setRespuestasMultimedia}
          onSubmitReal={handleSubmitSurvey}
        />
      )}

      {/* Contenedor para el resto de las vistas (se mantiene igual) */}
      {view !== 'home' && (
        <div className="w-full max-w-5xl p-4 md:p-8">
          {view === 'login' && <Login onLogin={handleLogin} />}
          {view === 'survey' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto">
              <Survey participant={participant} onSubmit={handleSubmitSurvey} onEarlyEnd={handleEndEarly} />
            </div>
          )}
          {view === 'end' && (
             // ... Tu código de vista 'end' se queda igual
             <div className="bg-white rounded-3xl shadow-xl border border-slate-200 text-center py-12 px-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-slate-800">Gracias por tu interés</h2>
              <button onClick={() => {setView('home'); setParticipant(null);}} className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-full">Volver al inicio</button>
            </div>
          )}
          {view === 'thanks' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto">
              <Success onRestart={() => { setView('home'); setParticipant(null); setRespuestasMultimedia({}); }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App