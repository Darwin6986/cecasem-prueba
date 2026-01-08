Sistema de Focos de Calor - Cecasem
Ejecución Rápida
Prerrequisitos
Node.js 16 o superior

npm 8 o superior

Paso 1: Clonar el proyecto

# Si tienes el repositorio
git clone https://github.com/tuusuario/cecasem-prueba.git
cd cecasem-prueba

# O si ya tienes el proyecto local
cd C:\Users\adminlocal\cecasem-prueba
Paso 2: Configurar y ejecutar el Backend
En una terminal:

cd backend
npm install
npm run init-db     # Crea la base de datos con datos de prueba
npm start           # Inicia el servidor en http://localhost:3000
Verificación: Visita http://localhost:3000/api/focos

Paso 3: Configurar y ejecutar el Frontend
En otra terminal:

cd frontend
npm install
npm run dev        # Inicia la aplicación en http://localhost:5173
Acceder: Abre http://localhost:5173 en tu navegador

 Puertos utilizados
Frontend: http://localhost:5173

Backend API: http://localhost:3000

API Endpoint: http://localhost:3000/api/focos

 Comandos útiles
Backend

npm start          # Iniciar servidor
npm run dev        # Modo desarrollo (reinicio automático)
npm run init-db    # Reiniciar base de datos con datos de prueba
Frontend

npm run dev        # Iniciar servidor de desarrollo
npm run build      # Build para producción
🔧 Solución de problemas comunes
Puerto 3000 en uso:

# Windows
netstat -ano | findstr :3000
taskkill /PID [NUMERO] /F
Error "Cannot find module":

# En ambas carpetas (backend y frontend)
npm install
Base de datos no se crea:

cd backend
node src/database/init-db.js
Estructura del proyecto
text
cecasem-prueba/
├── backend/     # API Node.js + Express + SQLite
├── frontend/    # React + Material-UI
└── README.md    # Este archivo
Verificación
Backend corriendo: http://localhost:3000/api/focos

Frontend corriendo: http://localhost:5173

Datos cargando en la interfaz

Filtros funcionando

