import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

const Filters = ({ onFilter, onReset, departamentos, riesgos }) => {
  const [filters, setFilters] = useState({
    departamento: '',
    riesgo: '',
    fecha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      departamento: '',
      riesgo: '',
      fecha: ''
    });
    onReset();
  };

  const activeFilters = Object.values(filters).filter(v => v !== '').length;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Departamento</InputLabel>
            <Select
              name="departamento"
              value={filters.departamento}
              onChange={handleChange}
              label="Departamento"
            >
              <MenuItem value="">Todos</MenuItem>
              {departamentos.map((depto, index) => (
                <MenuItem key={index} value={depto}>
                  {depto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Nivel de Riesgo</InputLabel>
            <Select
              name="riesgo"
              value={filters.riesgo}
              onChange={handleChange}
              label="Nivel de Riesgo"
            >
              <MenuItem value="">Todos</MenuItem>
              {riesgos.map((riesgo, index) => (
                <MenuItem key={index} value={riesgo}>
                  {riesgo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="date"
            name="fecha"
            label="Fecha"
            value={filters.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              fullWidth
            >
              Filtrar
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<ClearIcon />}
              fullWidth
            >
              Limpiar
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {activeFilters > 0 && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterAltIcon color="action" />
            <Chip 
              label={`${activeFilters} filtro(s) activo(s)`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
            {filters.departamento && (
              <Chip 
                label={`Departamento: ${filters.departamento}`} 
                size="small" 
                onDelete={() => setFilters(prev => ({...prev, departamento: ''}))}
              />
            )}
            {filters.riesgo && (
              <Chip 
                label={`Riesgo: ${filters.riesgo}`} 
                size="small" 
                onDelete={() => setFilters(prev => ({...prev, riesgo: ''}))}
              />
            )}
            {filters.fecha && (
              <Chip 
                label={`Fecha: ${filters.fecha}`} 
                size="small" 
                onDelete={() => setFilters(prev => ({...prev, fecha: ''}))}
              />
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Filters;