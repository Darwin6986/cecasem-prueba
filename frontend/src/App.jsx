import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge
} from '@mui/material';
import {
  TableView as TableViewIcon,
  GridView as GridViewIcon,
  Map as MapIcon,
  FilterList as FilterIcon,
  Warning as WarningIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Map as MapIcon2,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';

import { focosService } from './services/api';
import FocosList from './components/FocosList';
import Filters from './components/Filters';
import MapView from './components/MapView';

const App = () => {
  const [focos, setFocos] = useState([]);
  const [filteredFocos, setFilteredFocos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [stats, setStats] = useState({ total: 0, altos: 0, medios: 0, bajos: 0 });
 
  const [selectedDepto, setSelectedDepto] = useState('Todos');

  
  const departamentos = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Tarija', 'Chuquisaca', 'Beni', 'Pando'];
  const riesgos = ['Alto', 'Medio', 'Bajo'];

  useEffect(() => {
    fetchFocos();
  }, []);

  const fetchFocos = async () => {
    try {
      setLoading(true);
      const response = await focosService.getAll();
      const data = response.data.data;
      setFocos(data);
      setFilteredFocos(data);
      
      const total = data.length;
      const altos = data.filter(f => f.riesgo === 'Alto').length;
      const medios = data.filter(f => f.riesgo === 'Medio').length;
      const bajos = data.filter(f => f.riesgo === 'Bajo').length;
      
      setStats({ total, altos, medios, bajos });
      setError(null);
    } catch (err) {
      setError('Error al cargar los focos de calor. Verifica que el backend esté corriendo.');
      console.error('Error detallado:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      
      let filteredData = [...focos];
      
      if (filters.departamento) {
        filteredData = filteredData.filter(f => 
          f.departamento === filters.departamento
        );
        setSelectedDepto(filters.departamento);
      } else {
        setSelectedDepto('Todos');
      }
      
      if (filters.riesgo) {
        filteredData = filteredData.filter(f => 
          f.riesgo === filters.riesgo
        );
      }
      
      if (filters.fecha) {
        filteredData = filteredData.filter(f => 
          f.fecha === filters.fecha
        );
      }
      
      setFilteredFocos(filteredData);
      setError(null);
    } catch (err) {
      setError('Error al aplicar filtros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilteredFocos(focos);
    setSelectedDepto('Todos');
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const getRiskPercentage = (riskType) => {
    if (stats.total === 0) return 0;
    return Math.round((stats[riskType] / stats.total) * 100);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Lista de Focos', icon: <ListIcon /> },
    { text: 'Mapa', icon: <MapIcon2 /> },
    { text: 'Estadísticas', icon: <BarChartIcon /> },
    { text: 'Alertas', icon: <NotificationsIcon /> },
    { text: 'Configuración', icon: <SettingsIcon /> },
  ];

  if (loading && focos.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
          <Typography variant="h5" color="white" fontWeight="bold">
            Cargando Sistema de Monitoreo...
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.8)" sx={{ mt: 1 }}>
            Cecasem - Prevención de Incendios
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
            bgcolor: '#1a237e',
            color: 'white',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <WarningIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
              CECASEM
            </Typography>
            <Typography variant="caption" sx={{ color: '#b0bec5' }}>
              Sistema de Alerta Temprana
            </Typography>
          </Box>
        </Toolbar>
        <Divider sx={{ bgcolor: '#3949ab' }} />
        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text}
              button 
              sx={{ 
                borderRadius: 2,
                mb: 1,
                '&:hover': { bgcolor: '#3949ab' }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 3, mt: 'auto' }}>
          <Paper sx={{ p: 2, bgcolor: '#3949ab', color: 'white' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Focos activos
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.total}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Última actualización: Hoy
            </Typography>
          </Paper>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" color="#1a237e">
                 Sistema de Focos de Calor
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Monitoreo en tiempo real • Prevención y Alerta Temprana
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                icon={<LocationIcon />} 
                label={`Departamento: ${selectedDepto}`}
                color="primary"
                variant="outlined"
              />
              <IconButton color="primary">
                <NotificationsIcon />
                <Badge badgeContent={stats.altos} color="error" sx={{ ml: 1 }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total de Focos
                    </Typography>
                  </Box>
                  <WarningIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 1 }}>
                  En todos los departamentos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              bgcolor: 'white'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="error.main">
                      {stats.altos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Alto Riesgo
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'error.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="body2" fontWeight="bold" color="error.main">
                      {getRiskPercentage('altos')}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={getRiskPercentage('altos')} 
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                  color="error"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              bgcolor: 'white'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="warning.main">
                      {stats.medios}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Riesgo Medio
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'warning.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="body2" fontWeight="bold" color="warning.main">
                      {getRiskPercentage('medios')}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={getRiskPercentage('medios')} 
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                  color="warning"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              bgcolor: 'white'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" color="success.main">
                      {stats.bajos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bajo Riesgo
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: 'success.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {getRiskPercentage('bajos')}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={getRiskPercentage('bajos')} 
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                  color="success"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="h6" fontWeight="bold">
              Filtros de Búsqueda
            </Typography>
          </Box>
          <Filters
            onFilter={handleFilter}
            onReset={handleResetFilters}
            departamentos={departamentos}
            riesgos={riesgos}
          />
        </Paper>

        {/* Vista Principal */}
        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {filteredFocos.length} foco(s) encontrado(s)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDepto !== 'Todos' ? `Mostrando focos en ${selectedDepto}` : 'Mostrando todos los focos'}
              </Typography>
            </Box>
            
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              sx={{ 
                bgcolor: '#f5f7fa',
                borderRadius: 2,
                p: 0.5
              }}
            >
              <ToggleButton value="table" sx={{ borderRadius: 1.5 }}>
                <TableViewIcon sx={{ mr: 1 }} /> Tabla
              </ToggleButton>
              <ToggleButton value="cards" sx={{ borderRadius: 1.5 }}>
                <GridViewIcon sx={{ mr: 1 }} /> Tarjetas
              </ToggleButton>
              <ToggleButton value="map" sx={{ borderRadius: 1.5 }}>
                <MapIcon sx={{ mr: 1 }} /> Mapa
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              action={
                <Button color="inherit" size="small" onClick={fetchFocos}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <Box textAlign="center">
                <CircularProgress size={60} />
                <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                  Cargando datos...
                </Typography>
              </Box>
            </Box>
          ) : viewMode === 'map' ? (
            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <MapView focos={filteredFocos} />
            </Box>
          ) : (
            <FocosList 
              focos={filteredFocos} 
              viewMode={viewMode}
            />
          )}
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Cecasem - Sistema de Prevención y Alerta Temprana
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Versión 1.0 • Última actualización: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const LinearProgress = ({ value, ...props }) => (
  <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
    <Box
      sx={{
        width: `${value}%`,
        height: '100%',
        bgcolor: props.color ? `${props.color}.main` : 'primary.main',
        transition: 'width 0.5s ease-in-out',
        ...props.sx
      }}
    />
  </Box>
);

export default App;