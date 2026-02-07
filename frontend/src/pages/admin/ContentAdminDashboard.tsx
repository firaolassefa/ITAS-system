import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Card, CardContent, Button, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Upload, Edit, Archive, Folder, Description, VideoLibrary, PictureAsPdf } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContentAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResources: 156,
    recentUploads: 12,
    pendingUpdates: 5,
    archivedResources: 23,
    pdfDocuments: 89,
    videos: 45,
    otherFiles: 22,
  });

  const recentActivity = [
    { action: 'Uploaded', resource: 'VAT Compliance Handbook 2024', time: '2 hours ago' },
    { action: 'Updated', resource: 'Income Tax Filing Guide', time: '5 hours ago' },
    { action: 'Archived', resource: 'Old Tax Forms 2023', time: '1 day ago' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          📚 Content Administrator Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage educational resources, upload content, and maintain the resource library
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalResources}</Typography>
                  <Typography>Total Resources</Typography>
                </Box>
                <Folder sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.recentUploads}</Typography>
                  <Typography>Recent Uploads</Typography>
                </Box>
                <Upload sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.pendingUpdates}</Typography>
                  <Typography>Pending Updates</Typography>
                </Box>
                <Edit sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.archivedResources}</Typography>
                  <Typography>Archived</Typography>
                </Box>
                <Archive sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resource Type Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" color="primary">{stats.pdfDocuments}</Typography>
                  <Typography color="text.secondary">PDF Documents</Typography>
                </Box>
                <PictureAsPdf sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" color="primary">{stats.videos}</Typography>
                  <Typography color="text.secondary">Video Tutorials</Typography>
                </Box>
                <VideoLibrary sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" color="primary">{stats.otherFiles}</Typography>
                  <Typography color="text.secondary">Other Files</Typography>
                </Box>
                <Description sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Permissions & Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content Administrator Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="UPLOAD_RESOURCES" color="primary" />
              <Chip label="UPDATE_RESOURCES" color="primary" />
              <Chip label="ARCHIVE_RESOURCES" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              As Content Administrator, you can upload educational resources (PDFs, videos, guides), 
              update existing resources, archive old or outdated content, manage resource categories and tags, 
              and track resource usage (views, downloads).
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Example Tasks:
            </Typography>
            <ul>
              <li>Upload VAT compliance handbook</li>
              <li>Update tax filing video tutorial</li>
              <li>Archive outdated 2023 tax guides</li>
              <li>Manage resource categories and tags</li>
            </ul>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`${activity.action}: ${activity.resource}`}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Upload />}
                  onClick={() => navigate('/admin/upload-resource')}
                  sx={{ py: 2 }}
                >
                  Upload New Resource
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => navigate('/admin/resource-version')}
                  sx={{ py: 2 }}
                >
                  Manage Versions
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Folder />}
                  sx={{ py: 2 }}
                >
                  Browse All Resources
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Archive />}
                  sx={{ py: 2 }}
                >
                  View Archived Content
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentAdminDashboard;
