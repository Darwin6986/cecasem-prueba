import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Typography, Chip } from '@mui/material';

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMarkerColor = (riesgo) => {
  switch (riesgo) {
    case 'Alto': return '#ff4444';
    case 'Medio': return '#ffbb33';
    case 'Bajo': return '#00C851';
    default: return '#33b5e5';
  }
};

const MapView = ({ focos }) => {
  const center = focos.length > 0 
    ? [focos[0].latitud, focos[0].longitud]
    : [-16.5000, -68.1500]; // Centro en La Paz por defecto

  const createCustomIcon = (riesgo) => {
    return L.divIcon({
      html: `<div style="
        background-color: ${getMarkerColor(riesgo)};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
      "></div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <Box sx={{ height: '500px', width: '100%', mb: 3 }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {focos.map((foco) => (
          <Marker
            key={foco.id}
            position={[foco.latitud, foco.longitud]}
            icon={createCustomIcon(foco.riesgo)}
          >
            <Popup>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {foco.departamento}
                </Typography>
                <Chip 
                  label={foco.riesgo} 
                  size="small" 
                  sx={{ 
                    bgcolor: getMarkerColor(foco.riesgo),
                    color: 'white',
                    mb: 1
                  }}
                />
                <Typography variant="body2">
                  <strong>Coordenadas:</strong><br />
                  Lat: {foco.latitud.toFixed(4)}<br />
                  Lon: {foco.longitud.toFixed(4)}
                </Typography>
                <Typography variant="body2">
                  <strong>Fecha:</strong> {new Date(foco.fecha).toLocaleDateString()}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;