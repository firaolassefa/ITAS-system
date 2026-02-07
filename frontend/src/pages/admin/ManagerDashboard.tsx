import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Button, Chip } from '@mui/material';
import { Assessment, TrendingUp, BarChart, PieChart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = {
    totalEnrollments: 3450,
    completionRate: 78,
    activeUsers: 892,
    avgCourseRating: 4.6,
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Assessment sx={{ mr: 2, fontSize: 40 }} />
          Manager Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View analytics and monitor system performance
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.totalEnrollments}</Typography>
                  <Typography color="text.secondary">Total Enrollments</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 50, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.completionRate}%</Typography>
                  <Typography color="text.secondary">Completion Rate</Typography>
                </Box>
                <PieChart sx={{ fontSize: 50, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.activeUsers}</Typography>
                  <Typography color="text.secondary">Active Users</Typography>
                </Box>
                <BarChart sx={{ fontSize: 50, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4">{stats.avgCourseRating}</Typography>
                  <Typography color="text.secondary">Avg Course Rating</Typography>
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
              Manager Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="VIEW_ANALYTICS" color="primary" />
              <Chip label="EXPORT_REPORTS" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              As Manager, you can view analytics dashboards, monitor system performance, track user engagement, 
              view course completion rates, and export reports for data-driven decision making.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Example Tasks:
            </Typography>
            <ul>
              <li>Check monthly enrollment statistics</li>
              <li>View top performing courses</li>
              <li>Export quarterly reports</li>
              <li>Monitor taxpayer engagement</li>
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
                  startIcon={<Assessment />}
                  onClick={() => navigate('/admin/analytics')}
                >
                  View Analytics
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<BarChart />}
                  onClick={() => navigate('/admin/analytics')}
                >
                  Export Reports
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerDashboard;
