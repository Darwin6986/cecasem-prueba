 Sistema de Focos de Calor - Cecasem
 Prueba Técnica Full Stack - Nivel Middle
Sistema de Prevención y Alerta Temprana de Incendios que visualiza información geográfica de focos de calor detectados en los 9 departamentos de Bolivia.

 Cómo Ejecutar el Proyecto
Prerrequisitos
Node.js 16 o superior

npm 8 o superior

Git (opcional)

🔧 Paso 1: Clonar el Repositorio
bash
# Clonar el repositorio (si lo tienes en GitHub)
git clone https://github.com/tuusuario/cecasem-prueba.git
cd cecasem-prueba

# O si ya tienes el proyecto localmente
cd C:\Users\adminlocal\cecasem-prueba
 Paso 2: Ejecutar el Backend
Abrir Terminal 1 - Backend
bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Inicializar la base de datos (crea focos.db con datos de prueba)
npm run init-db

# Iniciar el servidor backend
npm start
Verificar que el Backend esté funcionando
El servidor iniciará en: http://localhost:3000

API disponible en: http://localhost:3000/api/focos

Deberías ver en la consola:

text
 Servidor backend corriendo en: http://localhost:3000
 API disponible en: http://localhost:3000/api/focos
 Conectado a la base de datos SQLite
Probar la API manualmente
Abre tu navegador y visita:

http://localhost:3000/api/focos - Ver todos los focos

http://localhost:3000/api/focos/departamento/La%20Paz - Filtrar por departamento

http://localhost:3000/api/focos/riesgo/Alto - Filtrar por riesgo

 Paso 3: Ejecutar el Frontend
Abrir Terminal 2 - Frontend
bash
# Navegar a la carpeta frontend (en una NUEVA terminal)
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
Acceder a la aplicación
El frontend iniciará en: http://localhost:5173

Abre tu navegador y visita: http://localhost:5173

Deberías ver la interfaz del Sistema de Focos de Calor

 Resumen de Puertos
Servicio	URL	Puerto	Descripción
Frontend	http://localhost:5173	5173	Interfaz de usuario React
Backend API	http://localhost:3000	3000	API REST Node.js
Base de datos	backend/data/focos.db	-	SQLite con datos de prueba
 Solución de Problemas Comunes
Problema: Puerto 3000 ya en uso
bash
# En Windows PowerShell
netstat -ano | findstr :3000
# Encuentra el PID y:
taskkill /PID [NUMERO_PID] /F

# Luego reinicia el backend
npm start
Problema: Error "Cannot find module"
bash
# Asegúrate de haber instalado dependencias
cd backend
npm install

cd ../frontend
npm install
Problema: Base de datos no se crea
bash
# Ejecutar manualmente el script de inicialización
cd backend
node src/database/init-db.js
Problema: Frontend no muestra datos
Verifica que el backend esté corriendo: http://localhost:3000/api/focos

Revisa la consola del navegador (F12 → Console)

Asegúrate de que ambos servidores estén corriendo

📁 Estructura del Proyecto
text
cecasem-prueba/
├── backend/                 # API REST
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── routes/         # Endpoints API
│   │   ├── database/       # Conexión SQLite
│   │   └── server.js       # Servidor principal
│   ├── data/
│   │   └── focos.db        # Base de datos (se crea automáticamente)
│   └── package.json
├── frontend/               # Interfaz React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── services/       # Conexión a API
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Punto de entrada
│   └── package.json
└── README.md               # Este archivo
🔌 Endpoints de la API
GET /api/focos
Obtiene todos los focos de calor

json
{
  "success": true,
  "count": 18,
  "data": [...]
}
GET /api/focos/departamento/:nombre
Filtra focos por departamento

bash
# Ejemplo: http://localhost:3000/api/focos/departamento/La%20Paz
GET /api/focos/riesgo/:nivel
Filtra focos por nivel de riesgo (Alto, Medio, Bajo)

bash
# Ejemplo: http://localhost:3000/api/focos/riesgo/Alto
GET /api/focos/estadisticas
Obtiene estadísticas generales

json
{
  "total": 18,
  "altos": 5,
  "departamentos": 9,
  "niveles_riesgo": 3
}
 Características del Frontend
Vistas disponibles:
 Tabla - Vista tabular con todos los datos

 Tarjetas - Vista visual con cards

 Mapa - Vista geográfica (requiere Leaflet)

Filtros:
 Por departamento (9 departamentos de Bolivia)

 Por nivel de riesgo (Alto, Medio, Bajo)

 Por fecha

 Botón para limpiar filtros

Estadísticas:
Total de focos detectados

Cantidad por nivel de riesgo

Distribución por departamento

 Decisiones Técnicas
Backend: Node.js + Express + SQLite
Decisión	Justificación
Node.js/Express	Rápido desarrollo, amplia comunidad, ideal para APIs REST
SQLite	Base de datos ligera, sin configuración compleja, perfecta para demostraciones
Arquitectura modular	Separación clara entre rutas, controladores y base de datos
CORS habilitado	Permite comunicación entre frontend (5173) y backend (3000)
Manejo de errores	Respuestas HTTP claras (200, 400, 404, 500) con mensajes útiles
Frontend: React + Vite + Material-UI
Decisión	Justificación
React	Componentización reutilizable, estado manejable, popularidad en el mercado
Vite	Desarrollo ultrarrápido, mejor experiencia que Create React App
Material-UI	Diseño profesional preconstruido, responsive, accesible
Axios	Cliente HTTP robusto con manejo de errores integrado
Vistas múltiples	Tabla, tarjetas y mapa para diferentes casos de uso
Base de Datos
Decisión	Justificación
SQLite en archivo	No requiere servidor DB separado, portable, fácil de compartir
Datos de prueba incluidos	18 focos distribuidos en 9 departamentos bolivianos
Validaciones en DB	CHECK constraints para valores válidos de riesgo
Índices implícitos	SQLite optimiza automáticamente por PRIMARY KEY
Funcionalidades implementadas:
Backend obligatorio - API REST con 3 endpoints funcionales

 Frontend obligatorio - Interfaz React con filtros

 Filtros completos - Por departamento y nivel de riesgo

 Vistas múltiples - Tabla, tarjetas y mapa (opcional)

 Manejo de errores - En frontend y backend

 README completo - Con instrucciones claras

Características destacadas:
Datos realistas: 18 focos en los 9 departamentos de Bolivia

Interfaz profesional: Diseño con Material-UI y efectos visuales

Responsive: Funciona en desktop y móvil

Fácil instalación: Solo requiere Node.js y npm

Documentación clara: Instrucciones paso a paso

Datos de Prueba Incluidos
La base de datos se inicializa automáticamente con:

18 focos de calor distribuidos en 9 departamentos

Niveles de riesgo: Alto (5), Medio (6), Bajo (7)

Departamentos: La Paz, Cochabamba, Santa Cruz, Oruro, Potosí, Tarija, Chuquisaca, Beni, Pando

Fechas realistas: Distribuidas en enero 2024

Testing
Para verificar que todo funciona correctamente:

Backend funcionando: http://localhost:3000/api/focos

Frontend funcionando: http://localhost:5173

Filtros activos: Probar filtros por departamento y riesgo

Vistas: Cambiar entre tabla, tarjetas y mapa


 Scripts Útiles
Backend:
npm start              # Iniciar servidor
npm run dev           # Desarrollo con reinicio automático
npm run init-db       # Crear/recrear base de datos
Frontend:

npm run dev           # Iniciar servidor de desarrollo
npm run build         # Build para producción


Soporte Técnico
Si la aplicación no carga datos:
Verifica que el backend esté corriendo

Revisa la consola del navegador (F12)

Prueba acceder directamente a la API: http://localhost:3000/api/focos

Si ves errores de CORS:
Asegúrate que en backend/src/server.js tengas:

javascript
app.use(cors()); // Debe estar habilitado
Si necesitas reiniciar la base de datos:
bash
cd backend
npm run init-db
