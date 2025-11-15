import React from 'react';
import {
  Box, Typography, Chip, Alert, Card, CardContent,
  LinearProgress, List, ListItem, ListItemText,
  Grid
} from '@mui/material';
import {
  CheckCircle, Warning, Error, Info
} from '@mui/icons-material';

const AnalysisResults = ({ result }) => {
  if (!result) return null;

  const { analysis } = result;
  
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      case 'none': return 'success';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return <Error />;
      case 'medium': return <Warning />;
      case 'low': return <Info />;
      case 'none': return <CheckCircle />;
      default: return <Info />;
    }
  };

  return (
    <Box>
      <Alert 
        severity={getSeverityColor(analysis.severity)} 
        icon={getSeverityIcon(analysis.severity)}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6" gutterBottom>
          {analysis.diagnosis}
        </Typography>
        <Typography variant="body2">
          {analysis.description}
        </Typography>
      </Alert>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                {analysis.confidence}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confidence
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {analysis.analysis_time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analysis Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Scan Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Scan Type</Typography>
              <Chip 
                label={analysis.scan_type} 
                color="primary" 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Severity Level</Typography>
              <Chip 
                label={analysis.severity} 
                color={getSeverityColor(analysis.severity)} 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            AI Confidence Score
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={analysis.confidence} 
              color={analysis.confidence > 80 ? 'success' : analysis.confidence > 60 ? 'warning' : 'error'}
              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {analysis.confidence}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Medical Recommendations
            </Typography>
            
            <List dense>
              {analysis.recommendations.map((recommendation, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText 
                    primary={recommendation}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only. 
          Always consult with qualified healthcare professionals for medical diagnosis and treatment decisions.
        </Typography>
      </Alert>
    </Box>
  );
};

export default AnalysisResults;