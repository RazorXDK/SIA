const db = require('./db');

db.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('❌ Error en la consulta:', err.message);
    return;
  }
  console.log('Resultado:', results[0].resultado);
  db.end(); // Cerrá la conexión cuando termine
});
