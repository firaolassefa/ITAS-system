import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Grid,
  Card,
  CardContent,
  SelectChangeEvent,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as DocumentIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { resourcesAPI } from '../../api/resources';
import { COURSE_CATEGORIES, RESOURCE_TYPES } from '../../utils/constants';

const UploadResource: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceType: 'PDF',
    category: 'VAT',
    audience: 'ALL',
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.file) {
        throw new Error('Please select a file to upload');
      }

      // Prepare form data for API
      const resourceData = {
        title: formData.title,
        description: formData.description,
        resourceType: formData.resourceType,
        category: formData.category,
        audience: formData.audience,
        fileUrl: `/uploads/${formData.file.name}`,
        fileType: formData.file.type,
        fileSize: formData.file.size,
      };

      // Mock upload (in real app, this would upload to server)
      await resourcesAPI.uploadResource(resourceData);
      
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        resourceType: 'PDF',
        category: 'VAT',
        audience: 'ALL',
        file: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getResourceTypeIcon = () => {
    switch (formData.resourceType) {
      case 'PDF': return <DocumentIcon color="error" />;
      case 'VIDEO': return <VideoIcon color="primary" />;
      case 'ARTICLE': return <ArticleIcon color="success" />;
      default: return <DocumentIcon />;
    }
  };

  const getMaxFileSize = () => {
    switch (formData.resourceType) {
      case 'VIDEO': return '100MB';
      case 'PDF': return '50MB';
      default: return '10MB';
    }
  };

  const getAllowedExtensions = () => {
    switch (formData.resourceType) {
      case 'PDF': return '.pdf';
      case 'VIDEO': return '.mp4, .mov, .avi';
      case 'ARTICLE': return '.txt, .doc, .docx';
      default: return 'All files';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upload New Resource
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add educational materials to the resource library
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Resource uploaded successfully! It will appear in the library shortly.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column - Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Resource Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    disabled={uploading}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Resource Type</InputLabel>
                    <Select
                      name="resourceType"
                      value={formData.resourceType}
                      label="Resource Type"
                      onChange={handleSelectChange}
                      disabled={uploading}
                    >
                      {RESOURCE_TYPES.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleSelectChange}
                      disabled={uploading}
                    >
                      {COURSE_CATEGORIES.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Target Audience</InputLabel>
                    <Select
                      name="audience"
                      value={formData.audience}
                      label="Target Audience"
                      onChange={handleSelectChange}
                      disabled={uploading}
                    >
                      <MenuItem value="ALL">All Users</MenuItem>
                      <MenuItem value="TAXPAYER">Taxpayers</MenuItem>
                      <MenuItem value="STAFF">Staff</MenuItem>
                      <MenuItem value="SME">Small Businesses</MenuItem>
                      <MenuItem value="INDIVIDUAL">Individuals</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    disabled={uploading}
                    sx={{ height: '56px' }}
                  >
                    {formData.file ? formData.file.name : 'Choose File'}
                    <input
                      id="file-upload"
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept={formData.resourceType === 'PDF' ? '.pdf' : 
                              formData.resourceType === 'VIDEO' ? 'video/*' : 
                              '*/*'}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  {uploading && (
                    <Box sx={{ mb: 2 }}>
                      <LinearProgress />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Uploading file...
                      </Typography>
                    </Box>
                  )}
                  
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={uploading || !formData.file}
                  >
                    {uploading ? 'Uploading...' : 'Upload Resource'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Right Column - Guidelines */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getResourceTypeIcon()}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {formData.resourceType} Guidelines
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Max File Size:</strong> {getMaxFileSize()}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Allowed Extensions:</strong> {getAllowedExtensions()}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                <strong>Quality Requirements:</strong>
              </Typography>
              <ul style={{ margin: '8px 0', paddingLeft: '20px', color: 'text.secondary' }}>
                <li>Clear, readable content</li>
                <li>Proper formatting</li>
                <li>No copyrighted material</li>
                <li>Relevant to tax education</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Tips
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'text.secondary' }}>
                <li>Use descriptive titles</li>
                <li>Provide detailed descriptions</li>
                <li>Choose appropriate categories</li>
                <li>Verify file quality before upload</li>
                <li>Ensure content is up-to-date</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UploadResource;
