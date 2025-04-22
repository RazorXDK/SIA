const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que tengas conexión a MySQL

// Obtener todos los países
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM pais WHERE ESTADO = "ACTIVO"';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener países:', err);
      return res.status(500).json({ message: 'Error al obtener países' });
    }
    res.json(results);
  });
});

module.exports = router;
