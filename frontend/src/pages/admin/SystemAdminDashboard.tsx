import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Button, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Settings, People, Security, Storage, Speed, AdminPanelSettings, Upload, Notifications, VideoCall, Assessment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SystemAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = {
    totalUsers: 1245,
    totalRoles: 6,
    systemHealth: 99.8,
    storageUsed: 65,
    totalCourses: 42,
    totalResources: 156,
    activeWebinars: 5,
    pendingNotifications: 3,
  };

  const recentActivities = [
    { action: 'New user registered', user: 'john.doe', time: '5 minutes ago' },
    { action: 'Course published', user: 'contentadmin', time: '1 hour ago' },
    { action: 'Webinar scheduled', user: 'trainingadmin', time: '2 hours ago' },
    { action: 'Notification sent', user: 'commofficer', time: '3 hours ago' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <AdminPanelSettings sx={{ mr: 2, fontSize: 40 }} />
          System Administrator Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Full system access and control - Manage all users, roles, and system features
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                  <Typography>Total Users</Typography>
                </Box>
                <People sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalRoles}</Typography>
                  <Typography>User Roles</Typography>
                </Box>
                <Security sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.systemHealth}%</Typography>
                  <Typography>System Health</Typography>
                </Box>
                <Speed sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.storageUsed}%</Typography>
                  <Typography>Storage Used</Typography>
                </Box>
                <Storage sx={{ fontSize: 50, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Secondary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">{stats.totalCourses}</Typography>
              <Typography color="text.secondary">Total Courses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">{stats.totalResources}</Typography>
              <Typography color="text.secondary">Total Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">{stats.activeWebinars}</Typography>
              <Typography color="text.secondary">Active Webinars</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">{stats.pendingNotifications}</Typography>
              <Typography color="text.secondary">Pending Notifications</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Permissions & Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Administrator Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="MANAGE_USERS" color="primary" />
              <Chip label="MANAGE_ROLES" color="primary" />
              <Chip label="SYSTEM_CONFIG" color="primary" />
              <Chip label="VIEW_ANALYTICS" color="primary" />
              <Chip label="EXPORT_REPORTS" color="primary" />
              <Chip label="UPLOAD_RESOURCES" color="primary" />
              <Chip label="UPDATE_RESOURCES" color="primary" />
              <Chip label="ARCHIVE_RESOURCES" color="primary" />
              <Chip label="SCHEDULE_WEBINARS" color="primary" />
              <Chip label="MANAGE_WEBINARS" color="primary" />
              <Chip label="SEND_NOTIFICATIONS" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              As System Administrator, you have full access to all system features and can override any restrictions.
              You can manage all users and their roles, configure system settings, access all features, and monitor system health.
            </Typography>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent System Activity
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={activity.action}
                      secondary={`by ${activity.user} • ${activity.time}`}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
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
                  startIcon={<People />}
                  onClick={() => navigate('/admin/user-role-management')}
                  sx={{ py: 1.5 }}
                >
                  Manage Users & Roles
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Assessment />}
                  onClick={() => navigate('/admin/analytics')}
                  sx={{ py: 1.5 }}
                >
                  View Analytics
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Upload />}
                  onClick={() => navigate('/admin/upload-resource')}
                  sx={{ py: 1.5 }}
                >
                  Upload Resources
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VideoCall />}
                  onClick={() => navigate('/admin/webinar-management')}
                  sx={{ py: 1.5 }}
                >
                  Manage Webinars
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Notifications />}
                  onClick={() => navigate('/admin/notification-center')}
                  sx={{ py: 1.5 }}
                >
                  Send Notifications
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Settings />}
                  sx={{ py: 1.5 }}
                >
                  System Configuration
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemAdminDashboard;
