import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import PatientSearch from './components/PatientSearch';
import PatientDetails from './components/PatientDetails';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI-Powered Enhanced EHR Imaging & Documentation System
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <PatientSearch onPatientSelect={setSelectedPatient} />
          </Box>
          <Box sx={{ flex: 2 }}>
            {selectedPatient && <PatientDetails patient={selectedPatient} />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;