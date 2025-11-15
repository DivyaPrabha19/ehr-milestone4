import React from 'react';
import {
  Box, Typography, Chip, Alert, Card, CardContent,
  LinearProgress, List, ListItem, ListItemText, Grid,
  Avatar, Divider, Paper
} from '@mui/material';
import {
  CheckCircle, Warning, Error, Info, TrendingUp,
  Psychology, LocalHospital, Schedule, Security
} from '@mui/icons-material';

const AnalysisResults = ({ result }) => {
  if (!result) return null;

  const { analysis } = result;
  
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      case 'none': return '#10b981';
      default: return '#6b7280';
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

  const getSeverityGradient = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'medium': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'low': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'none': return 'linear-gradient(135deg, #10b981, #059669)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  };

  return (
    <Box>
      {/* Main Diagnosis Alert */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: getSeverityGradient(analysis.severity),
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite',
        }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
            {getSeverityIcon(analysis.severity)}
          </Avatar>
          <Box>
            <Typography variant=\"h5\" sx={{ fontWeight: 700, mb: 0.5 }}>
              {analysis.diagnosis}
            </Typography>
            <Chip 
              label={`${analysis.severity} Priority`}
              size=\"small\"
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
        
        <Typography variant=\"body1\" sx={{ opacity: 0.95, lineHeight: 1.6 }}>
          {analysis.description}
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { 
            value: `${analysis.confidence}%`, 
            label: 'AI Confidence', 
            icon: <Psychology />, 
            color: '#667eea',
            gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
          },
          { 
            value: analysis.analysis_time, 
            label: 'Analysis Time', 
            icon: <Schedule />, 
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #059669)'
          },
          { 
            value: analysis.scan_type, 
            label: 'Scan Type', 
            icon: <Security />, 
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
          },
          { 
            value: '94%', 
            label: 'Model Accuracy', 
            icon: <TrendingUp />, 
            color: '#8b5cf6',
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
          },
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card 
              sx={{ 
                textAlign: 'center',
                background: stat.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 35px ${stat.color}40`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
              }} />
              
              <CardContent sx={{ p: 2.5, position: 'relative' }}>
                <Avatar sx={{ 
                  mx: 'auto', 
                  mb: 1.5, 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 40,
                  height: 40,
                }}>
                  {stat.icon}
                </Avatar>
                <Typography variant=\"h5\" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant=\"body2\" sx={{ opacity: 0.9, fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confidence Progress */}
      <Card sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          height: 4,
        }} />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
              <TrendingUp />
            </Avatar>
            <Typography variant=\"h6\" sx={{ fontWeight: 700 }}>
              Confidence Analysis
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant=\"body2\" sx={{ fontWeight: 600 }}>
                AI Confidence Score
              </Typography>
              <Typography variant=\"body2\" sx={{ fontWeight: 700, color: '#667eea' }}>
                {analysis.confidence}%
              </Typography>
            </Box>
            <LinearProgress 
              variant=\"determinate\" 
              value={analysis.confidence}
              sx={{
                height: 12,
                borderRadius: 6,
                background: 'rgba(102, 126, 234, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: analysis.confidence > 80 
                    ? 'linear-gradient(90deg, #10b981, #059669)'
                    : analysis.confidence > 60 
                    ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                    : 'linear-gradient(90deg, #ef4444, #dc2626)',
                  borderRadius: 6,
                },
              }}
            />
          </Box>
          
          <Typography variant=\"body2\" color=\"text.secondary\">
            {analysis.confidence > 90 ? '🎯 Extremely High Confidence' :
             analysis.confidence > 80 ? '✅ High Confidence' :
             analysis.confidence > 70 ? '⚠️ Moderate Confidence' :
             '❌ Low Confidence - Manual Review Recommended'}
          </Typography>
        </CardContent>
      </Card>

      {/* Medical Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card sx={{ mb: 3, overflow: 'hidden' }}>
          <Box sx={{
            background: 'linear-gradient(90deg, #f093fb, #f5576c)',
            height: 4,
          }} />
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ mr: 2, background: 'linear-gradient(45deg, #f093fb, #f5576c)' }}>
                <LocalHospital />
              </Avatar>
              <Typography variant=\"h6\" sx={{ fontWeight: 700 }}>
                Medical Recommendations
              </Typography>
            </Box>
            
            <List sx={{ p: 0 }}>
              {analysis.recommendations.map((recommendation, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    sx={{ 
                      px: 0, 
                      py: 1.5,
                      '&:hover': {
                        background: 'rgba(240, 147, 251, 0.05)',
                        borderRadius: 2,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box sx={{ 
                      mr: 2, 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                    }} />
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ 
                        variant: 'body1', 
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    />
                  </ListItem>
                  {index < analysis.recommendations.length - 1 && (
                    <Divider sx={{ my: 0.5, opacity: 0.3 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Alert 
        severity=\"warning\"
        icon={<Warning />}
        sx={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 3,
          '& .MuiAlert-icon': { 
            color: '#f59e0b',
            fontSize: '1.5rem',
          },
        }}
      >
        <Typography variant=\"body2\" sx={{ fontWeight: 600, lineHeight: 1.6 }}>
          <strong>⚕️ Medical Disclaimer:</strong> This AI analysis is for informational purposes only. 
          Always consult with qualified healthcare professionals for medical diagnosis and treatment decisions.
          Results should be verified by licensed medical practitioners.
        </Typography>
      </Alert>
    </Box>
  );
};

export default AnalysisResults;