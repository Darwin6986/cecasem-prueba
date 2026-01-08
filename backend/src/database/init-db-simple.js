const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Configurar rutas
const dataDir = path.join(__dirname, '..', '..', 'data');
const dbPath = path.join(dataDir, 'focos.db');

// Crear carpeta si no existe
if (!fs.existsSync(dataDir)) {
  console.log(`📁 Creando carpeta: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log(`🚀 Inicializando base de datos en: ${dbPath}`);

// Crear base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al crear base de datos:', err.message);
    process.exit(1);
  }
  console.log('✅ Base de datos creada/abierta');
  crearTablas();
});

function crearTablas() {
  console.log('📝 Creando tablas...');
  
  // Crear tabla de focos
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS focos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      departamento TEXT NOT NULL,
      latitud REAL NOT NULL,
      longitud REAL NOT NULL,
      riesgo TEXT CHECK(riesgo IN ('Bajo', 'Medio', 'Alto')) NOT NULL,
      fecha TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('❌ Error creando tabla:', err.message);
      db.close();
      return;
    }
    console.log('✅ Tabla "focos" creada/verificada');
    insertarDatos();
  });
}

function insertarDatos() {
  console.log('📋 Insertando datos de prueba...');
  
  // Datos mínimos (1 por cada departamento)
  const focos = [
    ['La Paz', -16.5000, -68.1500, 'Alto', '2024-01-08'],
    ['Cochabamba', -17.3895, -66.1568, 'Medio', '2024-01-07'],
    ['Santa Cruz', -17.7833, -63.1821, 'Alto', '2024-01-08'],
    ['Oruro', -17.9833, -67.1500, 'Bajo', '2024-01-06'],
    ['Potosí', -19.5833, -65.7500, 'Alto', '2024-01-08'],
    ['Tarija', -21.5333, -64.7333, 'Medio', '2024-01-07'],
    ['Chuquisaca', -19.0333, -65.2500, 'Medio', '2024-01-08'],
    ['Beni', -14.8333, -64.9000, 'Alto', '2024-01-08'],
    ['Pando', -11.0333, -68.7500, 'Bajo', '2024-01-07']
  ];

  const insertSQL = `
    INSERT OR IGNORE INTO focos (departamento, latitud, longitud, riesgo, fecha) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.serialize(() => {
    const stmt = db.prepare(insertSQL);
    
    focos.forEach((foco, index) => {
      stmt.run(foco, (err) => {
        if (err) {
          console.error(`❌ Error insertando foco ${index + 1}:`, err.message);
        }
      });
    });
    
    stmt.finalize(() => {
      console.log('✅ Datos insertados');
      verificarDatos();
    });
  });
}

function verificarDatos() {
  console.log('🔍 Verificando datos...');
  
  db.all('SELECT COUNT(*) as total FROM focos', [], (err, row) => {
    if (err) {
      console.error('❌ Error contando registros:', err.message);
    } else {
      console.log(`📊 Total de registros: ${row[0].total}`);
    }
    
    db.all('SELECT departamento, COUNT(*) as cantidad FROM focos GROUP BY departamento', [], (err, rows) => {
      if (err) {
        console.error('❌ Error obteniendo estadísticas:', err.message);
      } else {
        console.log('\n📈 Focos por departamento:');
        rows.forEach(row => {
          console.log(`  ${row.departamento}: ${row.cantidad}`);
        });
      }
      
      db.close((err) => {
        if (err) {
          console.error('❌ Error cerrando base de datos:', err.message);
        } else {
          console.log('\n🎉 ¡Base de datos inicializada exitosamente!');
          console.log('📍 Ubicación:', dbPath);
        }
      });
    });
  });
}