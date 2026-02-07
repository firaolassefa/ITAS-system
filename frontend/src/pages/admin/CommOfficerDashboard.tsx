import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Card, CardContent, Button } from '@mui/material';
import { Notifications, Send, Schedule, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CommOfficerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalNotifications: 0,
    sentToday: 0,
    scheduled: 0,
    activeUsers: 0
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📢 Communication Officer Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Send notifications, manage campaigns, and communicate with taxpayers
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Total Notifications</Typography>
              <Typography variant="h4">{stats.totalNotifications}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Sent Today</Typography>
              <Typography variant="h4">{stats.sentToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Scheduled</Typography>
              <Typography variant="h4">{stats.scheduled}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Active Users</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Send />}
              onClick={() => navigate('/admin/notification-center')}
              sx={{ py: 2 }}
            >
              Send New Notification
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Schedule />}
              onClick={() => navigate('/admin/notification-center')}
              sx={{ py: 2 }}
            >
              Schedule Notification
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Group />}
              sx={{ py: 2 }}
            >
              View Target Groups
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Notifications />}
              sx={{ py: 2 }}
            >
              Notification History
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CommOfficerDashboard;
