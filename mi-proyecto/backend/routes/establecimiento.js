const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que esta ruta sea correcta

// ✅ Obtener todos los establecimientos - GET /api/establecimientos
router.get('/', (req, res) => {
  db.query('SELECT * FROM establecimiento', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener establecimientos:', err.message);
      return res.status(500).json({ error: 'Error del servidor al obtener establecimientos' });
    }
    res.json(results);
  });
});

// ✅ Crear un nuevo establecimiento - POST /api/establecimientos
router.post('/', (req, res) => {
  const est = req.body;

  const camposObligatorios = ['ID_PAIS', 'ID_TIPO_ESTABLECIMIENTO', 'NOMBRE'];
  const faltantes = camposObligatorios.filter(campo => !est[campo]);

  if (faltantes.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios',
      camposFaltantes: faltantes
    });
  }

  const query = `
    INSERT INTO establecimiento 
    (ID_PAIS, ID_TIPO_ESTABLECIMIENTO, NOMBRE, DIRECCION, TELEFONO, CORREO_ELECTRONICO, FECHA_CREACION, ESTADO)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    est.ID_PAIS,
    est.ID_TIPO_ESTABLECIMIENTO,
    est.NOMBRE,
    est.DIRECCION || null,
    est.TELEFONO || null,
    est.CORREO_ELECTRONICO || null,
    est.FECHA_CREACION || new Date().toISOString().split('T')[0],
    est.ESTADO || 'Activo'
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error al crear establecimiento:', err.message);
      return res.status(500).json({ error: 'Error al crear establecimiento' });
    }
    res.status(201).json({
      message: 'Establecimiento creado exitosamente',
      ID_ESTABLECIMIENTO: result.insertId
    });
  });
});

// ✅ Actualizar un establecimiento - PUT /api/establecimientos/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const est = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de establecimiento inválido' });
  }

  const query = `
    UPDATE establecimiento SET
      ID_PAIS = ?, 
      ID_TIPO_ESTABLECIMIENTO = ?, 
      NOMBRE = ?, 
      DIRECCION = ?, 
      TELEFONO = ?, 
      CORREO_ELECTRONICO = ?, 
      FECHA_CREACION = ?, 
      ESTADO = ?
    WHERE ID_ESTABLECIMIENTO = ?
  `;

  const values = [
    est.ID_PAIS,
    est.ID_TIPO_ESTABLECIMIENTO,
    est.NOMBRE,
    est.DIRECCION,
    est.TELEFONO,
    est.CORREO_ELECTRONICO,
    est.FECHA_CREACION,
    est.ESTADO,
    id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar establecimiento:', err.message);
      return res.status(500).json({ error: 'Error al actualizar establecimiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Establecimiento no encontrado' });
    }
    res.json({ message: 'Establecimiento actualizado correctamente' });
  });
});

// ✅ Eliminar un establecimiento - DELETE /api/establecimientos/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de establecimiento inválido' });
  }

  db.query('DELETE FROM establecimiento WHERE ID_ESTABLECIMIENTO = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar establecimiento:', err.message);
      return res.status(500).json({ error: 'Error al eliminar establecimiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Establecimiento no encontrado' });
    }
    res.json({ message: 'Establecimiento eliminado correctamente' });
  });
});

module.exports = router;
