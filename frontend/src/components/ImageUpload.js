import React, { useState, useRef } from 'react';
import {
  Box, Button, Typography, Alert, Card, CardContent, 
  IconButton, LinearProgress, Chip, Avatar
} from '@mui/material';
import { CloudUpload, Delete, Image, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

const ImageUpload = ({ onAnalysisComplete, onLoadingChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      onLoadingChange(true);
      setError(null);
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);
      
      const response = await axios.post('/analyze-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onAnalysisComplete(response.data);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.response?.data?.detail || 'Analysis failed. Please try again.');
      setUploadProgress(0);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <input
        type=\"file\"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=\"image/*\"
        style={{ display: 'none' }}
      />
      
      {!preview ? (
        <Card 
          sx={{ 
            border: '2px dashed rgba(102, 126, 234, 0.3)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              borderColor: '#667eea',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Box sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite',
          }} />
          
          <CardContent sx={{ textAlign: 'center', py: 6, position: 'relative' }}>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 3,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            }}>
              <CloudUpload sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Typography variant=\"h5\" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Drop your medical image here
            </Typography>
            <Typography variant=\"body1\" color=\"text.secondary\" sx={{ mb: 3 }}>
              Or click to browse MRI, CT, or X-Ray images
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              {['MRI', 'CT', 'X-RAY'].map((type) => (
                <Chip 
                  key={type}
                  label={type} 
                  size=\"small\" 
                  sx={{ 
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
          }} />
          
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <img
                src={preview}
                alt=\"Preview\"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }}
              />
              <IconButton
                onClick={handleClear}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(239, 68, 68, 1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Delete />
              </IconButton>
            </Box>
            
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              mb: 3
            }}>
              <Typography variant=\"body2\" sx={{ fontWeight: 600, mb: 1 }}>
                📁 {selectedFile?.name}
              </Typography>
              <Typography variant=\"body2\" color=\"text.secondary\">
                📊 {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB • 🖼️ {selectedFile?.type}
              </Typography>
            </Box>

            {uploadProgress > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant=\"body2\" sx={{ fontWeight: 600 }}>
                    Uploading...
                  </Typography>
                  <Typography variant=\"body2\" sx={{ ml: 'auto', fontWeight: 600 }}>
                    {uploadProgress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant=\"determinate\" 
                  value={uploadProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(102, 126, 234, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      )}
      
      {error && (
        <Alert 
          severity=\"error\" 
          sx={{ 
            mt: 2,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 127, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            '& .MuiAlert-icon': { color: '#ef4444' },
          }}
        >
          {error}
        </Alert>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant=\"contained\"
          onClick={handleUpload}
          disabled={!selectedFile}
          startIcon={<PhotoCamera />}
          fullWidth
          sx={{
            py: 1.5,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            fontWeight: 700,
            fontSize: '1.1rem',
            '&:hover': {
              background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
            },
            '&:disabled': {
              background: 'rgba(0,0,0,0.12)',
              color: 'rgba(0,0,0,0.26)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Analyze with AI
        </Button>
        
        {selectedFile && (
          <Button
            variant=\"outlined\"
            onClick={handleClear}
            startIcon={<Delete />}
            sx={{
              borderColor: '#ef4444',
              color: '#ef4444',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#dc2626',
                background: 'rgba(239, 68, 68, 0.1)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Clear
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;