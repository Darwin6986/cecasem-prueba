// frontend/src/components/FocosList.jsx - Versión mejorada
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Rating
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  ExpandMore as ExpandIcon,
  ZoomIn as ZoomIcon,
  Share as ShareIcon,
  NotificationsActive as AlertIcon
} from '@mui/icons-material';

const getRiesgoColor = (riesgo) => {
  switch (riesgo) {
    case 'Alto': return { bgcolor: '#ff4444', color: 'white', icon: '🔴' };
    case 'Medio': return { bgcolor: '#ffbb33', color: 'black', icon: '🟡' };
    case 'Bajo': return { bgcolor: '#00C851', color: 'white', icon: '🟢' };
    default: return { bgcolor: '#33b5e5', color: 'white', icon: '🔵' };
  }
};

const getRiesgoScore = (riesgo) => {
  switch (riesgo) {
    case 'Alto': return 3;
    case 'Medio': return 2;
    case 'Bajo': return 1;
    default: return 0;
  }
};

const FocosList = ({ focos, viewMode = 'table' }) => {
  if (focos.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 10,
        bgcolor: '#f8f9fa',
        borderRadius: 3
      }}>
        <WarningIcon sx={{ fontSize: 60, color: '#6c757d', mb: 2 }} />
        <Typography variant="h5" color="textSecondary" gutterBottom>
          No se encontraron focos de calor
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Intenta ajustar los filtros o verifica la conexión con el servidor
        </Typography>
      </Box>
    );
  }

  if (viewMode === 'cards') {
    return (
      <Grid container spacing={3}>
        {focos.map((foco) => {
          const riesgoColor = getRiesgoColor(foco.riesgo);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={foco.id}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent>
                  {/* Header con nivel de riesgo */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 3 
                  }}>
                    <Box>
                      <Typography variant="h6" component="div" fontWeight="bold">
                        {foco.departamento}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {foco.id}
                      </Typography>
                    </Box>
                    <Chip 
                      label={foco.riesgo}
                      sx={{ 
                        bgcolor: riesgoColor.bgcolor,
                        color: riesgoColor.color,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        height: 24
                      }}
                    />
                  </Box>
                  
                  {/* Puntuación de riesgo */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Nivel de riesgo:
                    </Typography>
                    <Rating 
                      value={getRiesgoScore(foco.riesgo)}
                      max={3}
                      readOnly
                      icon={<WarningIcon fontSize="small" />}
                      emptyIcon={<WarningIcon fontSize="small" />}
                      sx={{ '& .MuiRating-iconFilled': { color: riesgoColor.bgcolor } }}
                    />
                  </Box>
                  
                  {/* Información de ubicación */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 1.5,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}>
                    <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2, width: 40, height: 40 }}>
                      <LocationIcon color="primary" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Coordenadas
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Lat: {foco.latitud.toFixed(4)} | Lon: {foco.longitud.toFixed(4)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Información de fecha */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 1.5,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}>
                    <Avatar sx={{ bgcolor: '#fff3e0', mr: 2, width: 40, height: 40 }}>
                      <CalendarIcon color="warning" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Fecha de detección
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(foco.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Acciones */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Tooltip title="Ver detalles">
                      <IconButton size="small" color="primary">
                        <ZoomIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Crear alerta">
                      <IconButton size="small" color="error">
                        <AlertIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Compartir">
                      <IconButton size="small" color="info">
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  // Vista tabla mejorada
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ 
            bgcolor: 'primary.main',
            '& th': { 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }
          }}>
            <TableCell>ID</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Coordenadas</TableCell>
            <TableCell>Riesgo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {focos.map((foco) => {
            const riesgoColor = getRiesgoColor(foco.riesgo);
            const daysAgo = Math.floor((new Date() - new Date(foco.fecha)) / (1000 * 60 * 60 * 24));
            
            return (
              <TableRow 
                key={foco.id}
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    #{foco.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: '#e3f2fd', 
                      mr: 2, 
                      width: 32, 
                      height: 32 
                    }}>
                      <Typography variant="caption" fontWeight="bold">
                        {foco.departamento.charAt(0)}
                      </Typography>
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {foco.departamento}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="caption" display="block">
                        {foco.latitud.toFixed(4)}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {foco.longitud.toFixed(4)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Chip 
                      label={foco.riesgo}
                      size="small"
                      sx={{ 
                        bgcolor: riesgoColor.bgcolor,
                        color: riesgoColor.color,
                        fontWeight: 'bold',
                        mb: 0.5
                      }}
                    />
                    <LinearProgress 
                      variant="determinate" 
                      value={getRiesgoScore(foco.riesgo) * 33.33}
                      sx={{ 
                        height: 4,
                        borderRadius: 2,
                        bgcolor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: riesgoColor.bgcolor
                        }
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2">
                        {new Date(foco.fecha).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {daysAgo === 0 ? 'Hoy' : `Hace ${daysAgo} días`}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={daysAgo < 2 ? 'Activo' : 'Histórico'}
                    size="small"
                    color={daysAgo < 2 ? 'error' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Ver en mapa">
                      <IconButton size="small" color="primary">
                        <LocationIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Crear alerta">
                      <IconButton size="small" color="error">
                        <WarningIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Más opciones">
                      <IconButton size="small" color="default">
                        <ExpandIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FocosList;