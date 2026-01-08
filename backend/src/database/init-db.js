const db = require('./database');


db.serialize(() => {
 
  db.run(`DROP TABLE IF EXISTS focos`);
  
  db.run(`
    CREATE TABLE focos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      departamento TEXT NOT NULL,
      latitud REAL NOT NULL,
      longitud REAL NOT NULL,
      riesgo TEXT CHECK(riesgo IN ('Bajo', 'Medio', 'Alto')) NOT NULL,
      fecha TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla:', err.message);
    } else {
      console.log('✅ Tabla "focos" creada');
      
     const focos = [
  ['La Paz', -16.5000, -68.1500, 'Alto', '2024-01-08'],
  ['Cochabamba', -17.3895, -66.1568, 'Medio', '2024-01-07'],
  ['Santa Cruz', -17.7833, -63.1821, 'Alto', '2024-01-08'],
  ['Oruro', -17.9833, -67.1500, 'Bajo', '2024-01-06'],
  ['Potosí', -19.5833, -65.7500, 'Alto', '2024-01-08'],
  ['Tarija', -21.5333, -64.7333, 'Medio', '2024-01-07'],
  ['Chuquisaca', -19.0333, -65.2500, 'Medio', '2024-01-08'],
  ['Beni', -14.8333, -64.9000, 'Alto', '2024-01-08'],
  ['Pando', -11.0333, -68.7500, 'Bajo', '2024-01-07'],
  
  // Datos adicionales para más variedad
  ['La Paz', -16.2833, -68.1333, 'Medio', '2024-01-07'],
  ['Santa Cruz', -18.3333, -63.2500, 'Bajo', '2024-01-06'],
  ['Cochabamba', -17.6500, -65.8333, 'Alto', '2024-01-05'],
  ['Potosí', -20.6667, -66.6667, 'Bajo', '2024-01-07'],
  ['Beni', -15.0000, -65.5000, 'Medio', '2024-01-06']
];
      
      const stmt = db.prepare(`
        INSERT INTO focos (departamento, latitud, longitud, riesgo, fecha) 
        VALUES (?, ?, ?, ?, ?)
      `);
      
      focos.forEach(foco => {
        stmt.run(foco, (err) => {
          if (err) console.error('Error insertando:', err);
        });
      });
      
      stmt.finalize();
      console.log('✅ Datos de ejemplo insertados');
      
      db.get('SELECT COUNT(*) as total FROM focos', (err, row) => {
        if (err) {
          console.error('Error contando:', err);
        } else {
          console.log(`📊 Total de registros: ${row.total}`);
        }
        db.close();
      });
    }
  });
});