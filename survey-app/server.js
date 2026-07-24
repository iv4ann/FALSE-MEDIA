import express from 'express'
import cors from 'cors'
import pg from 'pg'

const app = express() // 👈 Primero se declara la app siempre
app.use(cors())
app.use(express.json())

// Y después ya puedes usar app.post(...) o tus rutas
// ==========================================
// RUTA API: RECIBIR Y GUARDAR LA ENCUESTA
// ==========================================
app.post('/api/guardar-encuesta', async (req, res) => {
  const datos = req.body
  
  // 👇 Agrega esto para ver la radiografía de los datos
  console.log("📦 ESTO MANDA REACT:", datos); 

  const client = await pool.connect()
  // ... resto del código

  try {
    await client.query('BEGIN')

    const reside = datos.resideEnDurango === 'si'
    const idEdad = mapaEdades[datos.item2_edad] || 2 

    // 1. Insertar en la tabla principal: encuestas
    const queryEncuesta = `
      INSERT INTO encuestas (nombre, email, reside_durango, id_rango_edad, dispositivo)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_encuesta;
    `
    const valoresEncuesta = [
      datos.participante?.name || 'Anónimo',
      datos.participante?.email || 'Sin correo',
      reside,
      idEdad,
      datos.item3_dispositivo || 'Smartphone',
    ]

    const resEncuesta = await client.query(queryEncuesta, valoresEncuesta)
    const idEncuestaGenerado = resEncuesta.rows[0].id_encuesta

    // 2. Si reside en Durango, guardamos las calificaciones en las tablas de respuestas
    if (reside) {
      // Guardar Bloque II (Ítems 4 al 9)
      const queryB2 = `
        INSERT INTO respuestas_bloque_2 
        (id_encuesta, item4_frecuencia_tec, item5_familiaridad_ia, item6_confianza_id, item7_frec_noticias, item8_verif_fuentes, item9_impacto_falsos)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `
      await client.query(queryB2, [
        idEncuestaGenerado,
        datos.item4_frecuencia_tec,
        datos.item5_familiaridad_ia,
        datos.item6_confianza_identificar,
        datos.item7_frecuencia_noticias,
        datos.item8_verificacion_fuentes,
        datos.item9_impacto_falsos,
      ])

      // Guardar Bloque III (Ítems 10 al 15)
      const queryB3 = `
        INSERT INTO respuestas_bloque_3 
        (id_encuesta, item10_algoritmos_redes, item11_uso_ia_prod, item12_dependencia, item13_regulacion_ia, item14_privacidad, item15_reemplazo_lab)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `
      await client.query(queryB3, [
        idEncuestaGenerado,
        datos.item10_algoritmos_redes,
        datos.item11_uso_ia_productividad,
        datos.item12_dependencia_ansiedad,
        datos.item13_regulacion_leyes,
        datos.item14_privacidad_datos,
        datos.item15_reemplazo_laboral,
      ])

      // 👇 NUEVO: Guardar Bloque IV (Multimedia) 👇
      const queryB4 = `
        INSERT INTO respuestas_multimedia 
        (id_encuesta, item16_imagenes, item17_imagenes, item18_imagenes, item19_noticias, item20_noticias, item21_videos, item22_videos, item23_videos, item24_audio, item25_audio, item26_audio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
      `
      await client.query(queryB4, [
        idEncuestaGenerado,
        datos.item16_imagenes,
        datos.item17_imagenes,
        datos.item18_imagenes,
        datos.item19_noticias,
        datos.item20_noticias,
        datos.item21_videos,
        datos.item22_videos,
        datos.item23_videos,
        datos.item24_audio,
        datos.item25_audio,
        datos.item26_audio
      ])
      // 👆 FIN DE LO NUEVO 👆
    }

    // Confirmar y guardar permanentemente en la base de datos
    await client.query('COMMIT')
    console.log(`✅ ¡Encuesta #${idEncuestaGenerado} guardada con éxito en PostgreSQL!`)
    
    res.status(200).json({ success: true, id_encuesta: idEncuestaGenerado })

  } catch (error) {
    // Si algo sale mal, revertimos los cambios (ROLLBACK)
    await client.query('ROLLBACK')
    console.error('❌ Error al guardar en PostgreSQL:', error)
    res.status(500).json({ success: false, error: 'Error interno de base de datos' })
  } finally {
    client.release()
  }
})