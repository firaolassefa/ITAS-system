import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent,
  LinearProgress,
  Chip,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendIcon,
  People as UsersIcon,
  School as CourseIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [startDate, setStartDate] = useState<Date | null>(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const overviewStats = {
    totalUsers: 1245,
    activeUsers: 892,
    newUsers: 145,
    courseEnrollments: 987,
    courseCompletions: 654,
    resourceDownloads: 4567,
    completionRate: 68,
    avgProgress: 72,
  };

  const topCourses = [
    { id: 1, title: 'VAT Fundamentals', enrollments: 342, completions: 267, completionRate: 78 },
    { id: 2, title: 'Income Tax Basics', enrollments: 289, completions: 188, completionRate: 65 },
    { id: 3, title: 'Corporate Tax', enrollments: 156, completions: 128, completionRate: 82 },
    { id: 4, title: 'TCC Procedures', enrollments: 134, completions: 102, completionRate: 76 },
    { id: 5, title: 'Tax Compliance', enrollments: 98, completions: 65, completionRate: 66 },
  ];

  const userEngagement = [
    { category: 'VAT', activeUsers: 456, avgTime: '45 min', completionRate: 72 },
    { category: 'Income Tax', activeUsers: 389, avgTime: '38 min', completionRate: 65 },
    { category: 'Corporate Tax', activeUsers: 234, avgTime: '52 min', completionRate: 82 },
    { category: 'TCC', activeUsers: 187, avgTime: '41 min', completionRate: 76 },
  ];

  const resourceStats = [
    { type: 'PDF', count: 28, downloads: 2345, avgRating: 4.5 },
    { type: 'Video', count: 12, downloads: 1567, avgRating: 4.7 },
    { type: 'Article', count: 8, downloads: 876, avgRating: 4.3 },
  ];

  const StatCard = ({ title, value, change, icon, color }: any) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4">{value}</Typography>
            <Typography color="text.secondary">{title}</Typography>
            {change && (
              <Chip
                label={change}
                size="small"
                color={change.includes('+') ? 'success' : 'error'}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Box sx={{ color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">Analytics Dashboard</Typography>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Export Report
            </Button>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e: SelectChangeEvent) => setDateRange(e.target.value as any)}
                  >
                    <MenuItem value="week">Last 7 Days</MenuItem>
                    <MenuItem value="month">Last 30 Days</MenuItem>
                    <MenuItem value="quarter">Last Quarter</MenuItem>
                    <MenuItem value="year">Last Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button variant="contained" fullWidth>
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={overviewStats.totalUsers.toLocaleString()}
              change="+12% this month"
              icon={<UsersIcon fontSize="large" />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Users"
              value={overviewStats.activeUsers.toLocaleString()}
              change="72% active rate"
              icon={<UsersIcon fontSize="large" />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Course Enrollments"
              value={overviewStats.courseEnrollments.toLocaleString()}
              change="+8% this month"
              icon={<CourseIcon fontSize="large" />}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completion Rate"
              value={`${overviewStats.completionRate}%`}
              change="+5% this month"
              icon={<TrendIcon fontSize="large" />}
              color="info.main"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Left Column - Course Performance */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ChartIcon sx={{ mr: 1 }} /> Top Performing Courses
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">Enrollments</TableCell>
                      <TableCell align="right">Completions</TableCell>
                      <TableCell align="right">Completion Rate</TableCell>
                      <TableCell align="right">Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <Typography variant="body2">{course.title}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{course.enrollments}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{course.completions}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {course.completionRate}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={course.completionRate}
                              sx={{ width: 60 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={course.completionRate >= 70 ? 'High' : 'Medium'}
                            size="small"
                            color={course.completionRate >= 70 ? 'success' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* User Engagement by Category */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Engagement by Tax Category
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Active Users</TableCell>
                      <TableCell align="right">Avg. Time Spent</TableCell>
                      <TableCell align="right">Completion Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userEngagement.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip label={item.category} size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{item.activeUsers}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{item.avgTime}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {item.completionRate}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={item.completionRate}
                              sx={{ width: 60 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Right Column - Resource & System Stats one*/}
          <Grid item xs={12} lg={4}>
            {/* Resource Statistics */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resource Statistics
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell align="right">Downloads</TableCell>
                      <TableCell align="right">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resourceStats.map((resource, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip label={resource.type} size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{resource.count}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{resource.downloads.toLocaleString()}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 0.5 }}>
                              {resource.avgRating}
                            </Typography>
                            <Typography variant="body2" color="warning.main">
                              ?
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* System Metrics */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                System Performance
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Server Uptime</Typography>
                  <Typography variant="body2">99.8%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={99.8} color="success" />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Response Time</Typography>
                  <Typography variant="body2">120ms</Typography>
                </Box>
                <LinearProgress variant="determinate" value={95} color="info" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Error Rate</Typography>
                  <Typography variant="body2">0.2%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={0.2} color="warning" />
              </Box>
            </Paper>

            {/* Insights */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Key Insights
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="success.main" gutterBottom>
                  <strong>? High Performance:</strong> VAT courses show 78% completion rate
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="info.main" gutterBottom>
                  <strong>? Growth Trend:</strong> 12% user growth this month
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="warning.main" gutterBottom>
                  <strong>?? Attention Needed:</strong> Income Tax courses have lowest completion
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="primary.main" gutterBottom>
                  <strong>?? Recommendation:</strong> Add more video resources for complex topics
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default Analytics;
