const express = require('express');
const router = express.Router();
const db = require('./db'); // <- Aún se puede dejar si planeas usarlo después

// Ruta de ejemplo sin consulta
router.get('/alumnos', (req, res) => {
  res.json({ mensaje: 'Ruta /alumnos activa ✅' });
});

module.exports = router;
