const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ruta a la base de datos
const dataDir = path.join(__dirname, '..', '..', 'data');
const dbPath = path.join(dataDir, 'focos.db');

// Asegurar que la carpeta data existe
if (!fs.existsSync(dataDir)) {
  console.log(`📁 Creando carpeta data: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log(`📂 Ruta de base de datos: ${dbPath}`);

// Crear conexión
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Error conectando a SQLite:', err.message);
    console.error('📁 Verifica permisos en:', dbPath);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
    console.log(`📊 Archivo: ${dbPath}`);
    db.run('PRAGMA foreign_keys = ON');
  }
});

module.exports = db;