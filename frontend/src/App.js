import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, Container, AppBar, Toolbar, Typography, Box, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
  Avatar, Badge, Tooltip, Fab, Zoom
} from '@mui/material';
import { 
  Dashboard, Search, Analytics, Settings, Notifications,
  LocalHospital, Psychology, Add, Menu as MenuIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PatientSearch from './components/PatientSearch';
import PatientDetails from './components/PatientDetails';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const drawerWidth = 280;

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, color: '#2563eb' },
    { id: 'search', label: 'Patient Search', icon: <Search />, color: '#7c3aed' },
    { id: 'analytics', label: 'Analytics', icon: <Analytics />, color: '#10b981' },
    { id: 'ai-insights', label: 'AI Insights', icon: <Psychology />, color: '#f59e0b' },
    { id: 'settings', label: 'Settings', icon: <Settings />, color: '#6b7280' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onPatientSelect={setSelectedPatient} />;
      case 'search':
        return (
          <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <PatientSearch onPatientSelect={setSelectedPatient} />
            </Box>
            <Box sx={{ flex: 2 }}>
              <AnimatePresence mode="wait">
                {selectedPatient && (
                  <motion.div
                    key={selectedPatient.patient_id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PatientDetails patient={selectedPatient} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        );
      default:
        return <Dashboard onPatientSelect={setSelectedPatient} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Sidebar */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRight: 'none',
            },
          }}
        >
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ 
                width: 60, 
                height: 60, 
                mx: 'auto', 
                mb: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '1.5rem'
              }}
            >
              <LocalHospital />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              EHR System
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              AI-Powered Healthcare
            </Typography>
          </Box>
          
          <List sx={{ px: 2 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={() => setCurrentView(item.id)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: currentView === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontWeight: currentView === item.id ? 600 : 400
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`,
          }}
        >
          <Header 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen}
            currentView={currentView}
          />
          
          <Container maxWidth="xl" sx={{ mt: 3, mb: 4, px: 3 }}>
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </Container>
        </Box>

        {/* Floating Action Button */}
        <Zoom in={currentView === 'search'}>
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
            }}
            onClick={() => setCurrentView('search')}
          >
            <Add />
          </Fab>
        </Zoom>
      </Box>
    </ThemeProvider>
  );
}

export default App;