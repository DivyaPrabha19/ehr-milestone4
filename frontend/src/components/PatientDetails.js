import React from 'react';
import { 
  Paper, Typography, Box, Card, CardContent, 
  Grid, Chip, ImageList, ImageListItem 
} from '@mui/material';
import { 
  Person as PersonIcon, 
  LocalHospital as HospitalIcon,
  Scanner as ScannerIcon 
} from '@mui/icons-material';

const PatientDetails = ({ patient }) => {
  if (!patient) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Patient Info Card */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">Patient Information</Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Name</Typography>
            <Typography variant="h6">{patient.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Patient ID</Typography>
            <Typography variant="h6">{patient.patient_id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Age</Typography>
            <Typography variant="body1">{patient.age} years</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Gender</Typography>
            <Typography variant="body1">{patient.gender}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Medical Summary Card */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HospitalIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h5">AI-Generated Medical Summary</Typography>
        </Box>
        
        <Card sx={{ backgroundColor: '#f8f9fa', mb: 2 }}>
          <CardContent>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {patient.medical_summary}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Diagnosis
          </Typography>
          <Chip 
            label={patient.diagnosis} 
            color="error" 
            variant="outlined" 
            size="medium"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Medical History
          </Typography>
          <Typography variant="body2">
            {patient.medical_history || 'No medical history available'}
          </Typography>
        </Box>
      </Paper>

      {/* Scan Results Card */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ScannerIcon sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h5">MRI Scan Results</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip 
            label={`${patient.scan_type || 'MRI'} Scan`} 
            color="info" 
            variant="outlined" 
          />
        </Box>

        {patient.scan_images && patient.scan_images.length > 0 ? (
          <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={164}>
            {patient.scan_images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  alt={`MRI scan ${index + 1}`}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No scan images available for this patient
          </Typography>
        )}

        <Box sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Scan Analysis Result
          </Typography>
          <Typography variant="body2">
            Brain tumor classification: <strong>{patient.diagnosis}</strong>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Analysis performed using AI-powered medical imaging system
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientDetails;