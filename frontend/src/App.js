import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Container, AppBar, Toolbar, Typography, Box,
  Card, CardContent, Alert, CircularProgress, Chip, Grid, Paper,
  Fab, Zoom, IconButton, Avatar, Badge, Tooltip
} from '@mui/material';
import { 
  CloudUpload, Analytics, LocalHospital, Psychology, 
  TrendingUp, Security, Speed, Notifications, Settings
} from '@mui/icons-material';
import ImageUpload from './components/ImageUpload';
import AnalysisResults from './components/AnalysisResults';

const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    success: { main: '#10b981' },
    error: { main: '#ef4444' },
    warning: { main: '#f59e0b' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Animated Background */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        zIndex: -1,
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }} />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'fixed',
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: -1,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />
      ))}

      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Toolbar>
          <Avatar sx={{ mr: 2, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
            <LocalHospital />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 700 }}>
            AI Medical Imaging Suite
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton sx={{ color: 'white' }}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton sx={{ color: 'white' }}>
                <Settings />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Hero Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 6, 
            mb: 4, 
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }} />
          
          <Analytics sx={{ fontSize: 80, color: 'white', mb: 3, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Revolutionary AI Medical Analysis
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)', maxWidth: 600, mx: 'auto' }}>
            Upload medical images and get instant AI-powered diagnosis with 95% accuracy
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {[
              { label: 'MRI Analysis', icon: <Psychology />, color: '#667eea' },
              { label: 'CT Detection', icon: <Security />, color: '#764ba2' },
              { label: 'X-Ray Diagnosis', icon: <TrendingUp />, color: '#f093fb' },
              { label: 'Instant Results', icon: <Speed />, color: '#10b981' },
            ].map((item, i) => (
              <Chip
                key={i}
                icon={item.icon}
                label={item.label}
                sx={{
                  background: `linear-gradient(45deg, ${item.color}, ${item.color}aa)`,
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  '& .MuiChip-icon': { color: 'white' },
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              />
            ))}
          </Box>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { value: '95%', label: 'Accuracy', color: '#10b981' },
              { value: '2.3s', label: 'Analysis Time', color: '#667eea' },
              { value: '24/7', label: 'Available', color: '#f59e0b' },
              { value: '10K+', label: 'Scans Analyzed', color: '#764ba2' },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Upload Section */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
              }} />
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 2, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
                    <CloudUpload />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Upload Medical Image
                  </Typography>
                </Box>
                
                <ImageUpload 
                  onAnalysisComplete={setAnalysisResult}
                  onLoadingChange={setLoading}
                />
                
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    '& .MuiAlert-icon': { color: '#667eea' },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    <strong>Supported:</strong> JPEG, PNG, DICOM, TIFF • <strong>Max:</strong> 10MB • <strong>Types:</strong> MRI, CT, X-Ray
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #f093fb, #f5576c, #667eea)',
              }} />
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 2, background: 'linear-gradient(45deg, #f093fb, #f5576c)' }}>
                    <Analytics />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #f093fb, #f5576c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI Analysis Results
                  </Typography>
                </Box>
                
                {loading ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                    <Box sx={{ position: 'relative', mb: 3 }}>
                      <CircularProgress size={60} thickness={4} sx={{ color: '#667eea' }} />
                      <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}>
                        <Psychology sx={{ color: '#764ba2', fontSize: 24 }} />
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      AI is analyzing...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Processing medical image with advanced algorithms
                    </Typography>
                  </Box>
                ) : analysisResult ? (
                  <AnalysisResults result={analysisResult} />
                ) : (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Box sx={{ 
                      mb: 3, 
                      p: 3, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                      display: 'inline-block'
                    }}>
                      <Analytics sx={{ fontSize: 48, color: '#667eea' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Ready for Analysis
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload a medical image to see instant AI-powered diagnosis
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Action Button */}
      <Zoom in={!loading}>
        <Fab
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          }}
        >
          <Psychology />
        </Fab>
      </Zoom>
    </ThemeProvider>
  );
}

export default App;