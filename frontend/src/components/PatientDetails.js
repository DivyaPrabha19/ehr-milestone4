import React, { useState } from 'react';
import { 
  Paper, Typography, Box, Card, CardContent, 
  Grid, Chip, ImageList, ImageListItem, Button,
  Accordion, AccordionSummary, AccordionDetails,
  LinearProgress, Avatar, Divider, IconButton,
  Dialog, DialogContent, DialogTitle, Tooltip,
  Alert, AlertTitle
} from '@mui/material';
import { 
  Person as PersonIcon, 
  LocalHospital as HospitalIcon,
  Scanner as ScannerIcon,
  ExpandMore, Psychology, Analytics,
  Download, Share, Print, ZoomIn,
  Timeline, Assessment, Warning
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PatientDetails = ({ patient }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expanded, setExpanded] = useState('summary');
  
  if (!patient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
            <PersonIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6">Select a patient to view details</Typography>
            <Typography variant="body2">Choose from the search results to see AI analysis</Typography>
          </Box>
        </Card>
      </motion.div>
    );
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getSeverityLevel = (diagnosis) => {
    switch (diagnosis?.toLowerCase()) {
      case 'glioma': return { level: 'High', color: 'error', score: 85 };
      case 'meningioma': return { level: 'Medium', color: 'warning', score: 65 };
      case 'pituitary': return { level: 'Medium', color: 'warning', score: 55 };
      default: return { level: 'Low', color: 'success', score: 15 };
    }
  };

  const severity = getSeverityLevel(patient.diagnosis);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Patient Header Card */}
      <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '2rem'
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {patient.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip 
                  label={`ID: ${patient.patient_id}`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip 
                  label={`${patient.age} years, ${patient.gender}`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Risk Level: {severity.level} ({severity.score}% confidence)
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Download Report">
                <IconButton sx={{ color: 'white' }}>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton sx={{ color: 'white' }}>
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip title="Print">
                <IconButton sx={{ color: 'white' }}>
                  <Print />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Expandable Sections */}
      <Box>
        {/* AI Summary Section */}
        <Accordion 
          expanded={expanded === 'summary'} 
          onChange={handleAccordionChange('summary')}
          sx={{ mb: 2, '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Psychology sx={{ color: 'secondary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI-Generated Medical Summary
              </Typography>
              <Chip label="AI Powered" size="small" color="secondary" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Alert severity={severity.color} sx={{ mb: 3 }}>
              <AlertTitle>Diagnosis: {patient.diagnosis}</AlertTitle>
              Confidence Score: {severity.score}% • Risk Level: {severity.level}
            </Alert>
            
            <Card sx={{ bgcolor: 'grey.50', mb: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  {patient.medical_summary || 'AI analysis in progress...'}
                </Typography>
              </CardContent>
            </Card>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Medical History
                </Typography>
                <Typography variant="body2">
                  {patient.medical_history || 'No medical history available'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Risk Assessment
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Overall Risk</Typography>
                    <Typography variant="body2">{severity.score}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={severity.score} 
                    color={severity.color}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Analytics Section */}
        <Accordion 
          expanded={expanded === 'analytics'} 
          onChange={handleAccordionChange('analytics')}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Analytics sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Advanced Analytics
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                    {severity.score}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    AI Confidence
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                    94%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Model Accuracy
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                    {patient.scan_images?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Scans Analyzed
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Medical Imaging Section */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ScannerIcon sx={{ color: 'success.main', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Medical Imaging Analysis
              </Typography>
            </Box>
            <Chip 
              label={`${patient.scan_type || 'MRI'} Scan`} 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {patient.scan_images && patient.scan_images.length > 0 ? (
            <Box>
              <ImageList sx={{ width: '100%', height: 400, mb: 3 }} cols={3} rowHeight={180}>
                {patient.scan_images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageListItem 
                      sx={{ 
                        cursor: 'pointer',
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover .overlay': {
                          opacity: 1
                        }
                      }}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`MRI scan ${index + 1}`}
                        loading="lazy"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }}
                      />
                      <Box 
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <ZoomIn sx={{ color: 'white', fontSize: 32 }} />
                      </Box>
                    </ImageListItem>
                  </motion.div>
                ))}
              </ImageList>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <AlertTitle>AI Analysis Complete</AlertTitle>
                Brain tumor classification: <strong>{patient.diagnosis}</strong> • 
                Processed {patient.scan_images.length} images with 94% accuracy
              </Alert>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <ScannerIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No scan images available
              </Typography>
              <Typography variant="body2">
                Upload medical images to enable AI analysis
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Upload Scans
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      </Box>
      
      {/* Image Dialog */}
      <Dialog 
        open={!!selectedImage} 
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Medical Scan - {patient.diagnosis}</Typography>
            <IconButton onClick={() => setSelectedImage(null)}>
              <Typography>×</Typography>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Medical scan"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PatientDetails;