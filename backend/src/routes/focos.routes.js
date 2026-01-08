const express = require('express');
const router = express.Router();
const {
  getAllFocos,
  getFocosByDepartamento,
  getFocosByRiesgo,
  getEstadisticas
} = require('../controllers/focos.controller');

router.get('/', getAllFocos);
router.get('/departamento/:departamento', getFocosByDepartamento);
router.get('/riesgo/:riesgo', getFocosByRiesgo);
router.get('/estadisticas', getEstadisticas);


router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de Focos de Calor funcionando',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;