const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');  // Requerir jsonwebtoken
const db = require('../db'); // Ajusta la ruta si es necesario

// Clave secreta para firmar el token (guarda esto en un entorno seguro)
const JWT_SECRET = 'tu_clave_secreta'; // Debes cambiarla por una clave más segura

// POST /api/login
router.post('/', (req, res) => {
  const { USUARIO, CONTRASENA } = req.body;

  if (!USUARIO || !CONTRASENA) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  const query = 'SELECT * FROM usuario WHERE USUARIO = ? AND CONTRASENA = ?';
  db.query(query, [USUARIO, CONTRASENA], (err, results) => {
    if (err) {
      console.error('❌ Error al autenticar:', err.message);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, genera un token JWT
    const usuario = results[0];

    // Crear el payload del token (datos que deseas incluir en el token)
    const payload = {
      ID_USUARIO: usuario.ID_USUARIO,
      NOMBRE: usuario.NOMBRE,
      USUARIO: usuario.USUARIO
    };

    // Generar el token JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });  // Expira en 1 hora

    // Devolver el token y los datos del usuario
    res.json({
      message: 'Login exitoso',
      token,  // El token JWT generado
      usuario: {
        ID_USUARIO: usuario.ID_USUARIO,
        NOMBRE: usuario.NOMBRE,
        APELLIDO: usuario.APELLIDO,
        USUARIO: usuario.USUARIO,
        CORREO_USUARIO: usuario.CORREO_USUARIO,
        ESTADO: usuario.ESTADO
        // Puedes incluir más datos si lo deseas
      }
    });
  });
});

module.exports = router;
