const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate que esta ruta sea correcta

// ✅ Obtener todos los usuarios - GET /api/usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener usuarios:', err.message);
      return res.status(500).json({ error: 'Error del servidor al obtener usuarios' });
    }
    res.json(results);
  });
});

// ✅ Crear un nuevo usuario - POST /api/usuarios
router.post('/', (req, res) => {
  const usuario = req.body;

  console.log('📥 Datos recibidos para crear usuario:', usuario);

  // Validación básica de campos obligatorios
  const camposObligatorios = ['NOMBRE', 'APELLIDO', 'CORREO_USUARIO', 'USUARIO', 'CONTRASENA'];
  const faltantes = camposObligatorios.filter(campo => !usuario[campo]);

  if (faltantes.length > 0) {
    console.warn('⚠️ Faltan campos obligatorios:', faltantes);
    return res.status(400).json({
      error: 'Faltan campos obligatorios',
      camposFaltantes: faltantes
    });
  }

  // Valores por defecto
  const fechaRegistro = usuario.FECHA_REGISTRO || new Date().toISOString().split('T')[0];

  const query = `
    INSERT INTO usuario 
    (NOMBRE, APELLIDO, CORREO_USUARIO, USUARIO, CONTRASENA, ESTADO, FECHA_REGISTRO, FECHA_NACIMIENTO, INTENTOS_FALLIDOS)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    usuario.NOMBRE,
    usuario.APELLIDO,
    usuario.CORREO_USUARIO,
    usuario.USUARIO,
    usuario.CONTRASENA,
    usuario.ESTADO || 'Activo',
    fechaRegistro,
    usuario.FECHA_NACIMIENTO || null,
    usuario.INTENTOS_FALLIDOS || 0
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

    console.log('✅ Usuario creado con ID:', result.insertId);
    res.status(201).json({ 
      message: 'Usuario creado exitosamente', 
      ID_USUARIO: result.insertId 
    });
  });
});

// ✅ Actualizar un usuario - PUT /api/usuarios/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'El ID del usuario debe ser un número válido' });
  }

  // Verificamos si los campos obligatorios están presentes
  if (!usuario.NOMBRE || !usuario.APELLIDO || !usuario.CORREO_USUARIO || !usuario.USUARIO || !usuario.CONTRASENA) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar el usuario' });
  }

  const query = `
    UPDATE usuario SET 
      NOMBRE = ?, 
      APELLIDO = ?, 
      CORREO_USUARIO = ?, 
      USUARIO = ?, 
      CONTRASENA = ?, 
      ESTADO = ?, 
      FECHA_REGISTRO = ?, 
      FECHA_NACIMIENTO = ?, 
      INTENTOS_FALLIDOS = ?
    WHERE ID_USUARIO = ?
  `;

  const values = [
    usuario.NOMBRE,
    usuario.APELLIDO,
    usuario.CORREO_USUARIO,
    usuario.USUARIO,
    usuario.CONTRASENA,
    usuario.ESTADO,
    usuario.FECHA_REGISTRO,
    usuario.FECHA_NACIMIENTO,
    usuario.INTENTOS_FALLIDOS,
    id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar usuario:', err.message);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado' });
  });
});

// ✅ Eliminar un usuario - DELETE /api/usuarios/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'El ID del usuario debe ser un número válido' });
  }

  db.query('DELETE FROM usuario WHERE ID_USUARIO = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar usuario:', err.message);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
