const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que tu archivo de conexión exista

// Obtener todos los tipos de establecimiento activos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tipo_establecimiento WHERE ESTADO = "ACTIVO"';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener tipos de establecimiento:', err);
      return res.status(500).json({ message: 'Error al obtener tipos de establecimiento' });
    }
    res.json(results);
  });
});

module.exports = router;
