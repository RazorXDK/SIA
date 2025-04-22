const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login');
const registro = require('./routes/registro');
const establecimientoRoutes = require('./routes/establecimiento');  // Nueva línea para establecimientos
const paisesRoutes = require('./routes/paises'); // ⬅️ Agrega esto
const tiposEstablecimientoRoutes = require('./routes/tiposEstablecimiento'); // ⬅️ Nueva línea


const app = express();
const PORT = 3000;

// Configuración CORS avanzada
app.use(cors({
  origin: '*', // Cambia en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Monta las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/registro', registro);
app.use('/api/establecimientos', establecimientoRoutes);  // Nueva línea para montar las rutas de establecimiento
app.use('/api/paises', paisesRoutes); // ⬅️ Agrega esta línea
app.use('/api/tipos-establecimiento', tiposEstablecimientoRoutes); // ⬅️ Nueva línea


// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 API corriendo correctamente.');
});

// Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:', err.stack || err.message);
  res.status(500).json({
    error: 'Error del servidor',
    message: err.message || 'Hubo un problema interno en el servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
