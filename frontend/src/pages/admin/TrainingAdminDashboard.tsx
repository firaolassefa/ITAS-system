import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Card, CardContent, Button, Chip } from '@mui/material';
import { VideoCall, Schedule, People, Assessment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TrainingAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [stats] = useState({
    totalWebinars: 45,
    upcomingWebinars: 8,
    totalAttendees: 1250,
    avgAttendance: 85
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          🎓 Training Administrator Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Schedule webinars, manage registrations, and track attendance
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalWebinars}</Typography>
                  <Typography color="text.secondary">Total Webinars</Typography>
                </Box>
                <VideoCall sx={{ fontSize: 50, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.upcomingWebinars}</Typography>
                  <Typography color="text.secondary">Upcoming</Typography>
                </Box>
                <Schedule sx={{ fontSize: 50, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalAttendees}</Typography>
                  <Typography color="text.secondary">Total Attendees</Typography>
                </Box>
                <People sx={{ fontSize: 50, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.avgAttendance}%</Typography>
                  <Typography color="text.secondary">Avg Attendance</Typography>
                </Box>
                <Assessment sx={{ fontSize: 50, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Training Administrator Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="SCHEDULE_WEBINARS" color="primary" />
              <Chip label="MANAGE_WEBINARS" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              As Training Administrator, you can schedule live webinars, manage registrations, 
              start and complete webinars, view attendance reports, set maximum attendees, and assign presenters.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Example Tasks:
            </Typography>
            <ul>
              <li>Schedule "VAT Filing Workshop" webinar</li>
              <li>Manage registrations for upcoming sessions</li>
              <li>Generate attendance reports</li>
              <li>Set webinar capacity and assign presenters</li>
            </ul>
          </Paper>
        </Grid>

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
                  startIcon={<Schedule />}
                  onClick={() => navigate('/admin/webinar-management')}
                  sx={{ py: 2 }}
                >
                  Schedule Webinar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VideoCall />}
                  onClick={() => navigate('/admin/webinar-management')}
                  sx={{ py: 2 }}
                >
                  Manage Webinars
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<People />}
                  sx={{ py: 2 }}
                >
                  View Registrations
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Assessment />}
                  sx={{ py: 2 }}
                >
                  Attendance Reports
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingAdminDashboard;
