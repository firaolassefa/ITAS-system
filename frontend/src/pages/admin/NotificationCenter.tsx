import React, { useState } from 'react';
import {
  Container, Paper, Typography, Box, TextField, Button,
  Grid, FormControl, InputLabel, Select, MenuItem, Chip,
  ToggleButton, ToggleButtonGroup, RadioGroup, FormControlLabel, Radio,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { Send as SendIcon, Schedule as ScheduleIcon } from '@mui/icons-material';

const NotificationCenter: React.FC = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    audience: 'ALL_TAXPAYERS',
    channel: 'EMAIL',
    scheduleType: 'IMMEDIATE',
    scheduledTime: ''
  });

  const mockCampaigns = [
    {
      id: 1,
      title: 'VAT Deadline Reminder',
      audience: 'ALL_TAXPAYERS',
      sent: 1245,
      opened: 890,
      sentAt: '2024-01-15T10:00:00'
    }
  ];

  const handleSend = () => {
    // Implementation for UC-ADM-002
    console.log('Sending notification:', notification);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Notification Center</Typography>
      
      <Grid container spacing={3}>
        {/* Compose Notification - UC-ADM-002 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Compose Notification</Typography>
            
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              value={notification.title}
              onChange={(e) => setNotification({...notification, title: e.target.value})}
            />
            
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              margin="normal"
              value={notification.message}
              onChange={(e) => setNotification({...notification, message: e.target.value})}
            />
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Target Audience</InputLabel>
                  <Select
                    value={notification.audience}
                    label="Target Audience"
                    onChange={(e) => setNotification({...notification, audience: e.target.value})}
                  >
                    <MenuItem value="ALL_TAXPAYERS">All Taxpayers</MenuItem>
                    <MenuItem value="SME">Small Businesses</MenuItem>
                    <MenuItem value="INDIVIDUAL">Individual Taxpayers</MenuItem>
                    <MenuItem value="COURSE_COMPLETED">Completed Specific Course</MenuItem>
                    <MenuItem value="WEBINAR_REGISTERED">Webinar Registrants</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Channel</InputLabel>
                  <Select
                    value={notification.channel}
                    label="Channel"
                    onChange={(e) => setNotification({...notification, channel: e.target.value})}
                  >
                    <MenuItem value="EMAIL">Email</MenuItem>
                    <MenuItem value="SMS">SMS</MenuItem>
                    <MenuItem value="IN_APP">In-App Notification</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Schedule</Typography>
              <RadioGroup
                value={notification.scheduleType}
                onChange={(e) => setNotification({...notification, scheduleType: e.target.value})}
                row
              >
                <FormControlLabel value="IMMEDIATE" control={<Radio />} label="Send Immediately" />
                <FormControlLabel value="SCHEDULED" control={<Radio />} label="Schedule for Later" />
              </RadioGroup>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSend}
              sx={{ mt: 3 }}
              fullWidth
            >
              Send Notification
            </Button>
          </Paper>
        </Grid>
        
        {/* Campaign History */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Campaigns</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Campaign</TableCell>
                    <TableCell>Sent</TableCell>
                    <TableCell>Opened</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <Typography variant="body2">{campaign.title}</Typography>
                        <Chip label={campaign.audience} size="small" />
                      </TableCell>
                      <TableCell>{campaign.sent}</TableCell>
                      <TableCell>{campaign.opened} ({Math.round((campaign.opened/campaign.sent)*100)}%)</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotificationCenter;