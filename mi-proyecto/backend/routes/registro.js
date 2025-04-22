const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate que esta ruta sea correcta

// ✅ Crear un nuevo registro de inicio de sesión - POST /api/registro
router.post('/', (req, res) => {
  const { ID_USUARIO, DIRECCION_IP, CLIENTE_HTTP, ESTADO } = req.body;

  console.log('📥 Datos recibidos para crear registro:', req.body);

  // Validación básica de campos obligatorios
  if (!ID_USUARIO || !DIRECCION_IP || !CLIENTE_HTTP) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios',
      camposFaltantes: ['ID_USUARIO', 'DIRECCION_IP', 'CLIENTE_HTTP']
    });
  }

  // Valores por defecto
  const fecha = new Date().toISOString().split('T')[0]; // Obtener la fecha actual
  const fechaActualizacion = new Date().toISOString().split('T')[0]; // Fecha de actualización

  const query = `
    INSERT INTO registro 
    (ID_USUARIO, FECHA, DIRECCION_IP, CLIENTE_HTTP, ESTADO, FECHA_ACTUALIZACION)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    ID_USUARIO,
    fecha,
    DIRECCION_IP,
    CLIENTE_HTTP,
    ESTADO || 'Activo', // Por defecto 'Activo' si no se especifica
    fechaActualizacion
  ];

  console.log('📤 Ejecutando query con valores:', values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error SQL:', err.sqlMessage);
      console.error('🧠 SQL completo:', err.sql);
      return res.status(500).json({
        error: 'Error al ejecutar la consulta SQL',
        mensaje: err.message,
        sql: err.sql,
        sqlMessage: err.sqlMessage
      });
    }

    console.log('✅ Registro creado con ID:', result.insertId);
    res.status(201).json({ 
      message: 'Registro creado exitosamente', 
      ID_REGISTRO: result.insertId 
    });
  });
});

module.exports = router;
