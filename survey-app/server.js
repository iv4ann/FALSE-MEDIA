import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg

const app = express()
app.use(cors())
app.use(express.json())


const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_NGFPL0MQHI6B@ep-noisy-night-adw9z0s4-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones seguras en Neon
  }
})

// Mapeo para convertir el texto de React al ID numérico de tu tabla cat_rangos_edad
const mapaEdades = {
  '3 a 12 años (Niño - Con apoyo de tutor)': 1,
  '13 a 29 años (Jóvenes)': 2,
  '30 a 59 años (Adultos)': 3,
  '60 a 70 años (Adultos Mayores)': 4,
}

// ==========================================
// RUTA API: RECIBIR Y GUARDAR LA ENCUESTA
// ==========================================
app.post('/api/guardar-encuesta', async (req, res) => {
  const datos = req.body
  const client = await pool.connect()

  try {
    // Usamos una TRANSACCIÓN (BEGIN/COMMIT) para que si falla una tabla, se cancele todo y no queden datos corruptos
    await client.query('BEGIN')

    const reside = datos.resideEnDurango === 'si'
    const idEdad = mapaEdades[datos.item2_edad] || 2 // Por defecto 2 (Jóvenes) si no coincide

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



// POR ESTO:
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor en la nube escuchando en el puerto ${PORT}`);
});