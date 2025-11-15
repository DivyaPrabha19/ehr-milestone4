import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Container, AppBar, Toolbar, Typography, Box,
  Card, CardContent, Alert, CircularProgress,
  Chip, Grid, Paper
} from '@mui/material';
import { CloudUpload, Analytics, LocalHospital } from '@mui/icons-material';
import ImageUpload from './components/ImageUpload';
import AnalysisResults from './components/AnalysisResults';

const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },
    secondary: { main: '#7c3aed' },
    success: { main: '#10b981' },
    error: { main: '#ef4444' },
  },
});

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <LocalHospital sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Medical Image Analysis System
          </Typography>
          <Chip label="AI Powered" color="secondary" />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            textAlign: 'center'
          }}
        >
          <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Upload Medical Images for Instant AI Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Support for MRI, CT Scan, and X-Ray images with advanced AI diagnostics
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="MRI Analysis" color="primary" variant="outlined" />
            <Chip label="CT Scan Detection" color="primary" variant="outlined" />
            <Chip label="X-Ray Diagnosis" color="primary" variant="outlined" />
            <Chip label="Instant Results" color="success" variant="outlined" />
          </Box>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CloudUpload sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Upload Medical Image
                  </Typography>
                </Box>
                
                <ImageUpload 
                  onAnalysisComplete={setAnalysisResult}
                  onLoadingChange={setLoading}
                />
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Supported formats:</strong> JPEG, PNG, DICOM, TIFF<br/>
                  <strong>Max size:</strong> 10MB
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Analysis Results
                </Typography>
                
                {loading ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                    <CircularProgress size={48} sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      AI is analyzing your medical image...
                    </Typography>
                  </Box>
                ) : analysisResult ? (
                  <AnalysisResults result={analysisResult} />
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Analytics sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body1">
                      Upload a medical image to see AI analysis results
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;