import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg // <-- Extraemos Pool de pg

const app = express() 
app.use(cors())
app.use(express.json())

// 1. CONEXIÓN A TU BASE DE DATOS PRINCIPAL (Bloques 1, 2 y 3)
const poolPrincipal = new Pool({
  connectionString: 'TU_URL_DE_NEON_PRINCIPAL_AQUI', // ej: termina en /neondb
  ssl: { rejectUnauthorized: false }
})

// 2. CONEXIÓN A TU NUEVA BASE DE DATOS (Bloque 4)
const poolMultimedia = new Pool({
  connectionString: 'TU_URL_DE_NEON_MULTIMEDIA_AQUI', // ej: termina en /bloque_multimedia
  ssl: { rejectUnauthorized: false }
})


app.post('/api/guardar-encuesta', async (req, res) => {
  const datos = req.body
  console.log("📦 ESTO MANDA REACT:", datos); 

  // Usamos el pool principal para arrancar
  const client = await poolPrincipal.connect()

  try {
    await client.query('BEGIN')

    // Mapa de edades (asumiendo que lo tienes definido arriba en tu archivo)
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

    // Confirmamos el guardado en la BD Principal ANTES del bloque multimedia
    await client.query('COMMIT')
    console.log(`✅ ¡Encuesta #${idEncuestaGenerado} guardada en BD Principal!`)

    // 👇 3. NUEVO: Guardar Bloque IV en la SEGUNDA BASE DE DATOS 👇
    if (reside) {
      const queryB4 = `
        INSERT INTO respuestas_bloque_4
        (id_encuesta, item16_imagenes, item17_imagenes, item18_imagenes, item19_noticias, item20_noticias, item21_videos, item22_videos, item23_videos, item24_audio, item25_audio, item26_audio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
      `
      // OJO AQUÍ: Usamos poolMultimedia en lugar del client principal
      await poolMultimedia.query(queryB4, [
        idEncuestaGenerado,
        datos.item16_imagenes, datos.item17_imagenes, datos.item18_imagenes,
        datos.item19_noticias, datos.item20_noticias,
        datos.item21_videos, datos.item22_videos, datos.item23_videos,
        datos.item24_audio, datos.item25_audio, datos.item26_audio
      ])
      console.log(`🎥 ¡Bloque 4 multimedia guardado con éxito!`)
    }
    // 👆 FIN DE LO NUEVO 👆
    
    res.status(200).json({ success: true, id_encuesta: idEncuestaGenerado })

  } catch (error) {
    // Si algo sale mal en los primeros bloques, revertimos
    await client.query('ROLLBACK')
    console.error('❌ Error al guardar en PostgreSQL:', error)
    res.status(500).json({ success: false, error: 'Error interno de base de datos' })
  } finally {
    client.release() // Soltamos la conexión principal
  }
})