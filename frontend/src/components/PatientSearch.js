import React, { useState } from 'react';
import { 
  Paper, TextField, List, ListItem, ListItemText, 
  Typography, Box, Chip, InputAdornment 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';

const PatientSearch = ({ onPatientSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/patients/search?query=${query}`);
      setSearchResults(response.data.patients);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handlePatientClick = async (patientId) => {
    try {
      const response = await axios.get(`/patient/${patientId}`);
      onPatientSelect(response.data);
    } catch (error) {
      console.error('Failed to fetch patient details:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Patient Search
      </Typography>
      
      <TextField
        fullWidth
        placeholder="Search by Patient ID, Name, or Diagnosis"
        value={searchQuery}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {loading && <Typography>Searching...</Typography>}

      <List>
        {searchResults.map((patient) => (
          <ListItem 
            key={patient.patient_id}
            button
            onClick={() => handlePatientClick(patient.patient_id)}
            sx={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: 1, 
              mb: 1,
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">{patient.name}</Typography>
                  <Chip label={patient.patient_id} size="small" />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2">
                    Age: {patient.age} | Gender: {patient.gender}
                  </Typography>
                  <Chip 
                    label={patient.diagnosis} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PatientSearch;