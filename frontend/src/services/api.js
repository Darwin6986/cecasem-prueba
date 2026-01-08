import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const focosService = {
 
  getAll: () => api.get('/focos'),
  
  getByDepartamento: (departamento) => 
    api.get(`/focos/departamento/${departamento}`),
  
  
  getByRiesgo: (riesgo) => api.get(`/focos/riesgo/${riesgo}`),
  
  getEstadisticas: () => api.get('/focos/estadisticas'),
  
  getHealth: () => api.get('/focos/health')
};

export default api;