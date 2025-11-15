import React, { useState, useRef } from 'react';
import {
  Box, Button, Typography, Alert,
  Card, CardContent, IconButton
} from '@mui/material';
import { CloudUpload, Delete, Image } from '@mui/icons-material';
import axios from 'axios';

const ImageUpload = ({ onAnalysisComplete, onLoadingChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
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
      
      const response = await axios.post('/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      onLoadingChange(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {!preview ? (
        <Card 
          sx={{ 
            border: '2px dashed #e0e0e0',
            backgroundColor: '#fafafa',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: '#f5f5f5'
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Click to upload medical image
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Drag and drop or click to select MRI, CT, or X-Ray images
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ position: 'relative' }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
              <IconButton
                onClick={handleClear}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                  }
                }}
              >
                <Delete />
              </IconButton>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>File:</strong> {selectedFile?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Size:</strong> {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile}
          startIcon={<Image />}
          fullWidth
        >
          Analyze Image
        </Button>
        
        {selectedFile && (
          <Button
            variant="outlined"
            onClick={handleClear}
            startIcon={<Delete />}
          >
            Clear
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;