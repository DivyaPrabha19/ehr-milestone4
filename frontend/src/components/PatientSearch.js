import React, { useState } from 'react';
import { 
  Paper, TextField, List, ListItem, ListItemText, 
  Typography, Box, Chip, InputAdornment, Avatar,
  Skeleton, Fade, Card, CardContent, IconButton,
  Tooltip, Divider
} from '@mui/material';
import { 
  Search as SearchIcon, Person, LocalHospital,
  Psychology, TrendingUp, Refresh
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PatientSearch = ({ onPatientSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState([
    { id: 'P001', name: 'John Smith', diagnosis: 'Glioma' },
    { id: 'P002', name: 'Sarah Johnson', diagnosis: 'Meningioma' },
    { id: 'P003', name: 'Mike Wilson', diagnosis: 'Pituitary' },
  ]);

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

  const getDiagnosisColor = (diagnosis) => {
    switch (diagnosis?.toLowerCase()) {
      case 'glioma': return '#ef4444';
      case 'meningioma': return '#f59e0b';
      case 'pituitary': return '#10b981';
      case 'no tumor': return '#6b7280';
      default: return '#2563eb';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search Header */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ mr: 2, fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              AI Patient Search
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Search and analyze patient records with AI-powered insights
          </Typography>
        </CardContent>
      </Card>

      {/* Search Input */}
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by Patient ID, Name, or Diagnosis..."
          value={searchQuery}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.paper',
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      </Paper>

      {/* Search Results */}
      <Paper elevation={0} sx={{ flex: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {searchQuery ? 'Search Results' : 'Recent Searches'}
            </Typography>
            <Tooltip title="Refresh">
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
          {loading ? (
            <Box>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ mb: 2 }}>
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                </Box>
              ))}
            </Box>
          ) : (
            <AnimatePresence>
              {(searchResults.length > 0 ? searchResults : recentSearches).map((patient, index) => (
                <motion.div
                  key={patient.patient_id || patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                        borderColor: 'primary.main',
                      },
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                    onClick={() => handlePatientClick(patient.patient_id || patient.id)}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: getDiagnosisColor(patient.diagnosis),
                            width: 48,
                            height: 48,
                          }}
                        >
                          <Person />
                        </Avatar>
                        
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {patient.name}
                            </Typography>
                            <Chip
                              label={patient.patient_id || patient.id}
                              size="small"
                              sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            {patient.age && (
                              <Typography variant="body2" color="text.secondary">
                                Age: {patient.age}
                              </Typography>
                            )}
                            {patient.gender && (
                              <Typography variant="body2" color="text.secondary">
                                Gender: {patient.gender}
                              </Typography>
                            )}
                          </Box>
                          
                          <Chip
                            label={patient.diagnosis}
                            size="small"
                            sx={{
                              bgcolor: `${getDiagnosisColor(patient.diagnosis)}20`,
                              color: getDiagnosisColor(patient.diagnosis),
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <LocalHospital sx={{ color: 'primary.main', mb: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            View Details
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {searchQuery && searchResults.length === 0 && !loading && (
            <Fade in>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No patients found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try searching with different keywords
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientSearch;