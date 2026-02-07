import React, { useState } from 'react';
import {
  Container, Paper, Typography, Box, TextField, Button,
  Grid, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const WebinarManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [webinarData, setWebinarData] = useState({
    title: '',
    description: '',
    scheduleDate: new Date(),
    scheduleTime: new Date(),
    durationMinutes: 60,
    maxAttendees: 100,
    presenters: [''],
    targetAudience: 'ALL_TAXPAYERS'
  });

  const mockWebinars = [
    {
      id: 1,
      title: 'VAT Filing Workshop',
      description: 'Learn how to file VAT returns correctly',
      scheduleTime: '2024-02-15T14:00:00',
      durationMinutes: 90,
      presenters: ['John Expert', 'Sarah Advisor'],
      maxAttendees: 150,
      registered: 120,
      status: 'UPCOMING'
    }
  ];

  const handleSchedule = () => {
    // Implementation for UC-ADM-001
    console.log('Scheduling webinar:', webinarData);
    setOpenDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Webinar Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            Schedule New Webinar
          </Button>
        </Box>

        {/* Webinar List */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Presenters</TableCell>
                <TableCell>Attendees</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockWebinars.map((webinar) => (
                <TableRow key={webinar.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{webinar.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {webinar.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(webinar.scheduleTime).toLocaleString()}
                    <Typography variant="body2">{webinar.durationMinutes} minutes</Typography>
                  </TableCell>
                  <TableCell>
                    {webinar.presenters.map((p, i) => (
                      <Chip key={i} label={p} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {webinar.registered}/{webinar.maxAttendees}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={webinar.status}
                      color={webinar.status === 'UPCOMING' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Schedule Dialog - UC-ADM-001 */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Schedule New Webinar</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Webinar Title" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" multiline rows={3} />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Date" sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Time" sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Duration (minutes)" type="number" defaultValue={60} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Max Attendees" type="number" defaultValue={100} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Target Audience</InputLabel>
                  <Select label="Target Audience" defaultValue="ALL_TAXPAYERS">
                    <MenuItem value="ALL_TAXPAYERS">All Taxpayers</MenuItem>
                    <MenuItem value="SME">Small & Medium Enterprises</MenuItem>
                    <MenuItem value="INDIVIDUAL">Individual Taxpayers</MenuItem>
                    <MenuItem value="NEW_TAXPAYERS">New Taxpayers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSchedule}>
              Schedule Webinar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default WebinarManagement;