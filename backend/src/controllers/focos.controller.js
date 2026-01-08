const db = require('../database/database');


const getAllFocos = (req, res) => {
  const sql = 'SELECT * FROM focos ORDER BY fecha DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  });
};

const getFocosByDepartamento = (req, res) => {
  const { departamento } = req.params;
  const sql = 'SELECT * FROM focos WHERE departamento = ? ORDER BY fecha DESC';
  
  db.all(sql, [departamento], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  });
};

const getFocosByRiesgo = (req, res) => {
  const { riesgo } = req.params;
  const sql = 'SELECT * FROM focos WHERE riesgo = ? ORDER BY fecha DESC';
  
  db.all(sql, [riesgo], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  });
};

const getEstadisticas = (req, res) => {
  const sql = `
    SELECT 
      departamento,
      riesgo,
      COUNT(*) as cantidad,
      MIN(fecha) as primera_fecha,
      MAX(fecha) as ultima_fecha
    FROM focos 
    GROUP BY departamento, riesgo
    ORDER BY departamento, riesgo
  `;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      success: true,
      data: rows
    });
  });
};

module.exports = {
  getAllFocos,
  getFocosByDepartamento,
  getFocosByRiesgo,
  getEstadisticas
};