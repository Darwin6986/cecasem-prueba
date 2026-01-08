const express = require('express');
const cors = require('cors');
require('dotenv').config();

const focosRoutes = require('./routes/focos.routes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/focos', focosRoutes);


app.get('/', (req, res) => {
  res.json({
    name: 'API Focos de Calor - Cecasem',
    version: '1.0.0',
    description: 'Sistema de gestión de focos de calor',
    endpoints: {
      focos: '/api/focos',
      por_departamento: '/api/focos/departamento/:nombre',
      por_riesgo: '/api/focos/riesgo/:nivel',
      estadisticas: '/api/focos/estadisticas',
      health: '/api/focos/health'
    }
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
  console.log(`📊 API disponible en: http://localhost:${PORT}/api/focos`);
});