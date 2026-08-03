app.post('/api/guardar-encuesta', async (req, res) => {
  const datos = req.body
  console.log("📦 ESTO MANDA REACT:", datos); 

  // Usamos el pool principal para arrancar la transacción
  const client = await poolPrincipal.connect()

  try {
    await client.query('BEGIN')

    // Mapa de edades
    const mapaEdades = { "18-24": 1, "25-34": 2, "35-44": 3, "45-54": 4, "55+": 5 }
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

    // 2. Si reside en Durango, guardamos los bloques 2 y 3 en la BD Principal
    if (reside) {
      const queryB2 = `
        INSERT INTO respuestas_bloque_2 
        (id_encuesta, item4_frecuencia_tec, item5_familiaridad_ia, item6_confianza_id, item7_frec_noticias, item8_verif_fuentes, item9_impacto_falsos)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `
      await client.query(queryB2, [
        idEncuestaGenerado, datos.item4_frecuencia_tec, datos.item5_familiaridad_ia, datos.item6_confianza_identificar, datos.item7_frecuencia_noticias, datos.item8_verificacion_fuentes, datos.item9_impacto_falsos,
      ])

      const queryB3 = `
        INSERT INTO respuestas_bloque_3 
        (id_encuesta, item10_algoritmos_redes, item11_uso_ia_prod, item12_dependencia, item13_regulacion_ia, item14_privacidad, item15_reemplazo_lab)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `
      await client.query(queryB3, [
        idEncuestaGenerado, datos.item10_algoritmos_redes, datos.item11_uso_ia_productividad, datos.item12_dependencia_ansiedad, datos.item13_regulacion_leyes, datos.item14_privacidad_datos, datos.item15_reemplazo_laboral,
      ])
    }

    // 👇 3. Guardar Bloque IV en la SEGUNDA BASE DE DATOS 👇
    if (reside) {
      const queryB4 = `
        INSERT INTO respuestas_multimedia
        (id_encuesta, respuestas_imagenes, respuestas_videos, respuestas_audios)
        VALUES ($1, $2, $3, $4);
      `
      
      const jsonImagenes = JSON.stringify({
        item16: datos.item16_imagenes,
        item17: datos.item17_imagenes,
        item18: datos.item18_imagenes
      });

      const jsonVideos = JSON.stringify({
        item21: datos.item21_videos,
        item22: datos.item22_videos,
        item23: datos.item23_videos
      });

      const jsonAudios = JSON.stringify({
        item24: datos.item24_audio,
        item25: datos.item25_audio,
        item26: datos.item26_audio
      });
      
      await poolMultimedia.query(queryB4, [
        idEncuestaGenerado,
        jsonImagenes, 
        jsonVideos, 
        jsonAudios
      ])
      console.log(`🎥 ¡Bloque 4 multimedia guardado con éxito en formato JSON!`)
    }

    // 👇 4. CONFIRMAR LA TRANSACCIÓN Y RESPONDER AL FRONTEND 👇
    await client.query('COMMIT')
    res.status(200).json({ success: true, message: 'Encuesta guardada correctamente en ambas bases de datos' })

  } catch (error) {
    // 👇 5. SI ALGO FALLA, DESHACER CAMBIOS Y AVISAR 👇
    await client.query('ROLLBACK')
    console.error('❌ Error al procesar la encuesta:', error)
    res.status(500).json({ success: false, error: 'Error interno del servidor al guardar la encuesta' })
  } finally {
    // 👇 6. LIBERAR LA CONEXIÓN SIEMPRE 👇
    client.release()
  }
})