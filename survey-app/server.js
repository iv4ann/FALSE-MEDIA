import express from 'express';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pg;
const app = express();

// --- CONFIGURACIÓN ---
const JWT_SECRET = process.env.JWT_SECRET || 'super_secreto_false_media_123'; // En Render, agrega JWT_SECRET en tus Environment Variables

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === 'https://falsemedia.vercel.app' || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true 
}));

app.use(express.json());

// --- CONEXIONES A BASES DE DATOS ---
const poolPrincipal = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_mtFT5K2DVQvA@ep-shiny-boat-axjw0w6g-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

const poolMultimedia = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_mtFT5K2DVQvA@ep-shiny-boat-axjw0w6g-pooler.c-4.us-east-2.aws.neon.tech/multimedia?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

// --- MIDDLEWARE DE AUTENTICACIÓN ---
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token requerido. Inicia sesión.' });

  const token = authHeader.split(' ')[1]; // Formato: "Bearer <token>"
  
  try {
    const decodificado = jwt.verify(token, JWT_SECRET);
    req.usuario_id = decodificado.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// --- RUTAS DE USUARIOS (PÚBLICAS) ---

// 1. Registro (Sign Up)
app.post('/api/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO usuarios (nombre, email, password_hash)
      VALUES ($1, $2, $3) RETURNING id_usuario, nombre, email;
    `;
    const result = await poolPrincipal.query(query, [nombre, email, passwordHash]);
    const nuevoUsuario = result.rows[0];

    // Generar token
    const token = jwt.sign({ id: nuevoUsuario.id_usuario }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ success: true, token, usuario: { id: nuevoUsuario.id_usuario, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email } });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.code === '23505') { // Código de error de Postgres para violación de UNIQUE (correo ya existe)
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 2. Iniciar Sesión (Login)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await poolPrincipal.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const usuario = result.rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id_usuario }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ success: true, token, usuario: { id: usuario.id_usuario, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// --- RUTAS PROTEGIDAS (REQUIEREN TOKEN) ---

// 3. Actualizar Información del Usuario
app.put('/api/usuario', verificarToken, async (req, res) => {
  const { nombre } = req.body;
  const idUsuario = req.usuario_id;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio para actualizar' });
  }

  try {
    const query = 'UPDATE usuarios SET nombre = $1 WHERE id_usuario = $2 RETURNING id_usuario, nombre, email;';
    const result = await poolPrincipal.query(query, [nombre, idUsuario]);
    
    res.status(200).json({ success: true, mensaje: 'Perfil actualizado', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 4. Guardar Encuesta (Vinculada al Usuario)
app.post('/api/guardar-encuesta', verificarToken, async (req, res) => {
  const datos = req.body;
  const idUsuario = req.usuario_id; // Viene seguro desde el middleware
  
  console.log(`📦 Guardando encuesta para el usuario ID: ${idUsuario}`);

  const client = await poolPrincipal.connect();

  try {
    await client.query('BEGIN');

    const mapaEdades = { "18-24": 1, "25-34": 2, "35-44": 3, "45-54": 4, "55+": 5 };
    const reside = datos.resideEnDurango === 'si';
    const idEdad = mapaEdades[datos.item2_edad] || 2;

    // Guardar encuesta principal con la llave foránea id_usuario
    const queryEncuesta = `
      INSERT INTO encuestas (id_usuario, reside_durango, id_rango_edad, dispositivo)
      VALUES ($1, $2, $3, $4)
      RETURNING id_encuesta;
    `;
    const valoresEncuesta = [idUsuario, reside, idEdad, datos.item3_dispositivo || 'Smartphone'];

    const resEncuesta = await client.query(queryEncuesta, valoresEncuesta);
    const idEncuestaGenerado = resEncuesta.rows[0].id_encuesta;

    // Bloque 2
    if (reside && datos.item4_frecuencia_tec !== undefined) {
      const queryB2 = `
        INSERT INTO respuestas_bloque_2 
        (id_encuesta, item4_frecuencia_tec, item5_familiaridad_ia, item6_confianza_id, item7_frec_noticias, item8_verif_fuentes, item9_impacto_falsos)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      await client.query(queryB2, [
        idEncuestaGenerado, datos.item4_frecuencia_tec, datos.item5_familiaridad_ia, datos.item6_confianza_identificar, datos.item7_frecuencia_noticias, datos.item8_verificacion_fuentes, datos.item9_impacto_falsos,
      ]);
    }

    // Bloque 3
    if (reside && datos.item10_algoritmos_redes !== undefined) {
      const queryB3 = `
        INSERT INTO respuestas_bloque_3 
        (id_encuesta, item10_algoritmos_redes, item11_uso_ia_prod, item12_dependencia, item13_regulacion_ia, item14_privacidad, item15_reemplazo_lab)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      await client.query(queryB3, [
        idEncuestaGenerado, datos.item10_algoritmos_redes, datos.item11_uso_ia_productividad, datos.item12_dependencia_ansiedad, datos.item13_regulacion_leyes, datos.item14_privacidad_datos, datos.item15_reemplazo_laboral,
      ]);
    }

    // Bloque 4 en BD Multimedia
    if (reside && datos.item16_imagenes !== undefined) {
      const queryB4 = `
        INSERT INTO respuestas_multimedia
        (id_encuesta, respuestas_imagenes, respuestas_videos, respuestas_audios)
        VALUES ($1, $2, $3, $4);
      `;
      const jsonImagenes = JSON.stringify({ item16: datos.item16_imagenes, item17: datos.item17_imagenes, item18: datos.item18_imagenes });
      const jsonVideos = JSON.stringify({ item21: datos.item21_videos, item22: datos.item22_videos, item23: datos.item23_videos });
      const jsonAudios = JSON.stringify({ item24: datos.item24_audio, item25: datos.item25_audio, item26: datos.item26_audio });
      
      await poolMultimedia.query(queryB4, [idEncuestaGenerado, jsonImagenes, jsonVideos, jsonAudios]);
    }

    await client.query('COMMIT');
    res.status(200).json({ success: true, message: 'Encuesta guardada con éxito' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al procesar la encuesta:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  } finally {
    client.release();
  }
});

// 5. Borrar Cuenta de Usuario
app.delete('/api/usuario', verificarToken, async (req, res) => {
  const idUsuario = req.usuario_id;

  try {
    // Opcional: Si quieres borrar también sus encuestas o dejar el registro huérfano (depende de tus FK)
    // Por seguridad, borramos primero las referencias en encuestas o aseguramos CASCADE en la BD.
    await poolPrincipal.query('DELETE FROM encuestas WHERE id_usuario = $1', [idUsuario]);
    const result = await poolPrincipal.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario;', [idUsuario]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, mensaje: 'Cuenta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Jarvis en línea: Servidor corriendo al cien en el puerto ${PORT}`);
});