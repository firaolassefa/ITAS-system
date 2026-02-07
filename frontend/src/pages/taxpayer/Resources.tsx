import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Chip,
  Paper,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  PlayCircle as PlayIcon,
} from '@mui/icons-material';
import { resourcesAPI } from '../../api/resources';
import { COURSE_CATEGORIES, RESOURCE_TYPES } from '../../utils/constants';
import ResourceCard from '../../components/taxpayer/ResourceCard';
import VideoPlayer from '../../components/taxpayer/VideoPlayer';

interface ResourcesProps {
  user: any;
}

const Resources: React.FC<ResourcesProps> = ({ user }) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const response = await resourcesAPI.getAllResources();
      setResources(response.data || []);
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resourceId: number) => {
    try {
      const response = await resourcesAPI.downloadResource(resourceId);
      alert(`Download started: ${response.message}`);
      await loadResources(); // Refresh to update download count
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handlePlayVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setVideoModalOpen(true);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || resource.category === categoryFilter;
    const matchesType = !typeFilter || resource.resourceType === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const stats = {
    total: resources.length,
    pdfs: resources.filter(r => r.resourceType === 'PDF').length,
    videos: resources.filter(r => r.resourceType === 'VIDEO').length,
    articles: resources.filter(r => r.resourceType === 'ARTICLE').length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Loading resources...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resource Library
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Access educational materials, guides, and tutorials
        </Typography>
        
        {/* Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={`${stats.total} Resources`} color="primary" variant="outlined" />
          <Chip label={`${stats.pdfs} PDFs`} color="error" variant="outlined" />
          <Chip label={`${stats.videos} Videos`} color="primary" variant="outlined" />
          <Chip label={`${stats.articles} Articles`} color="success" variant="outlined" />
          <Chip 
            label={`${stats.totalDownloads.toLocaleString()} Total Downloads`} 
            color="info" 
            variant="outlined" 
          />
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search resources"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e: SelectChangeEvent) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {COURSE_CATEGORIES.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Resource Type</InputLabel>
              <Select
                value={typeFilter}
                label="Resource Type"
                onChange={(e: SelectChangeEvent) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                {RESOURCE_TYPES.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, value) => value && setViewMode(value)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridIcon />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setTypeFilter('');
                }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      {filteredResources.length === 0 ? (
        <Alert severity="info">
          No resources found matching your criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              {filteredResources.length} resources found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click on videos to play, PDFs/Articles to download
            </Typography>
          </Box>

          {viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredResources.map((resource) => (
                <Grid item xs={12} md={6} lg={4} key={resource.id}>
                  {resource.resourceType === 'VIDEO' ? (
                    <Paper sx={{ p: 2, cursor: 'pointer' }} onClick={() => handlePlayVideo(resource.fileUrl)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PlayIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">{resource.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {resource.description}
                      </Typography>
                      <Chip label="Click to play" size="small" color="primary" />
                    </Paper>
                  ) : (
                    <ResourceCard
                      resource={resource}
                      onDownload={() => handleDownload(resource.id)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              {filteredResources.map((resource) => (
                <Paper key={resource.id} sx={{ p: 2, mb: 2 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="h6">{resource.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={resource.resourceType} size="small" />
                        <Chip label={resource.category} size="small" variant="outlined" />
                      </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                      {resource.resourceType === 'VIDEO' ? (
                        <Button
                          startIcon={<PlayIcon />}
                          onClick={() => handlePlayVideo(resource.fileUrl)}
                        >
                          Play Video
                        </Button>
                      ) : (
                        <Button
                          startIcon={<ClearIcon />}
                          onClick={() => handleDownload(resource.id)}
                        >
                          Download
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}
        </>
      )}

      {/* Video Modal */}
      <Modal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ width: '80%', maxWidth: 800, p: 2 }}>
          {selectedVideo && (
            <VideoPlayer
              src={selectedVideo}
              title="Educational Video"
            />
          )}
          <Button
            fullWidth
            onClick={() => setVideoModalOpen(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </Container>
  );
};

export default Resources;
