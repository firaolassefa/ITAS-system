import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  School as CourseIcon,
  Assignment as CertificateIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import { certificatesAPI } from '../api/certificates';
import CertificateViewer from '../components/CertificateViewer';

interface ProfileProps {
  user: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const [enrollmentsRes, certificatesRes] = await Promise.all([
        coursesAPI.getUserEnrollments(user.id),
        certificatesAPI.getUserCertificates(user.id),
      ]);
      setEnrollments(enrollmentsRes.data || []);
      setCertificates(certificatesRes.data || []);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownloadCertificate = (certificate: any) => {
    alert(`Downloading certificate: ${certificate.certificateId}`);
    // In real app, this would trigger PDF download
  };

  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
  };

  const stats = {
    enrolledCourses: enrollments.length,
    completedCourses: enrollments.filter(e => e.status === 'COMPLETED').length,
    certificates: certificates.length,
    averageProgress: enrollments.length > 0
      ? enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length
      : 0,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getUserTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'TAXPAYER': 'Taxpayer',
      'CONTENT_ADMIN': 'Content Administrator',
      'SYSTEM_ADMIN': 'System Administrator',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - User Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            {/* User Avatar & Basic Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  mb: 2,
                  fontSize: '3rem',
                }}
              >
                {user.fullName.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.fullName}
              </Typography>
              <Chip
                label={getUserTypeLabel(user.userType)}
                color="primary"
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
              >
                Edit Profile
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* User Details */}
            <List>
              <ListItem>
                <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <ListItemText primary="Username" secondary={user.username} />
              </ListItem>
              <ListItem>
                <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              {user.taxNumber && (
                <ListItem>
                  <BadgeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary="Tax Number" secondary={user.taxNumber} />
                </ListItem>
              )}
              {user.companyName && (
                <ListItem>
                  <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary="Company" secondary={user.companyName} />
                </ListItem>
              )}
              {user.phoneNumber && (
                <ListItem>
                  <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary="Phone" secondary={user.phoneNumber} />
                </ListItem>
              )}
              <ListItem>
                <CalendarIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <ListItemText primary="Member Since" secondary={formatDate(user.createdAt)} />
              </ListItem>
            </List>
          </Paper>

          {/* Quick Stats */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Learning Statistics
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Overall Progress</Typography>
                <Typography variant="body2">{Math.round(stats.averageProgress)}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={stats.averageProgress} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{stats.enrolledCourses}</Typography>
                  <Typography variant="body2" color="text.secondary">Enrolled</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{stats.completedCourses}</Typography>
                  <Typography variant="body2" color="text.secondary">Completed</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{stats.certificates}</Typography>
                  <Typography variant="body2" color="text.secondary">Certificates</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4">{Math.round(stats.averageProgress)}%</Typography>
                  <Typography variant="body2" color="text.secondary">Avg Progress</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Tabs Content */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab icon={<CourseIcon />} label="My Courses" />
              <Tab icon={<CertificateIcon />} label="Certificates" />
              <Tab icon={<CalendarIcon />} label="Activity" />
            </Tabs>

            {/* Courses Tab */}
            <TabPanel value={tabValue} index={0}>
              {enrollments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CourseIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    You haven't enrolled in any courses yet
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(user.userType === 'TAXPAYER' ? '/taxpayer/courses' : '/admin/courses')}
                  >
                    Browse Courses
                  </Button>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Progress</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell>
                            <Typography variant="body2">{enrollment.course?.title}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={enrollment.course?.category} size="small" />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              <Typography variant="body2" sx={{ mr: 1 }}>
                                {Math.round(enrollment.progress)}%
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={enrollment.progress}
                                sx={{ width: 60 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={enrollment.status}
                              size="small"
                              color={
                                enrollment.status === 'COMPLETED' ? 'success' :
                                enrollment.status === 'IN_PROGRESS' ? 'primary' : 'default'
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              onClick={() => navigate(`/taxpayer/course/${enrollment.courseId}`)}
                            >
                              {enrollment.progress === 100 ? 'Review' : 'Continue'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>

            {/* Certificates Tab */}
            <TabPanel value={tabValue} index={1}>
              {certificates.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CertificateIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    No certificates earned yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete courses to earn certificates
                  </Typography>
                </Box>
              ) : selectedCertificate ? (
                <Box>
                  <Button onClick={() => setSelectedCertificate(null)} sx={{ mb: 2 }}>
                    Back to Certificates
                  </Button>
                  <CertificateViewer
                    certificate={selectedCertificate}
                    onDownload={() => handleDownloadCertificate(selectedCertificate)}
                  />
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {certificates.map((certificate) => (
                    <Grid item xs={12} key={certificate.id}>
                      <Card>
                        <CardContent>
                          <Grid container alignItems="center">
                            <Grid item xs={8}>
                              <Typography variant="h6" gutterBottom>
                                {certificate.certificateId}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Issued: {formatDate(certificate.issuedAt)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Valid Until: {formatDate(certificate.validUntil)}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'right' }}>
                              <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={() => handleDownloadCertificate(certificate)}
                                sx={{ mr: 1 }}
                              >
                                Download
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleViewCertificate(certificate)}
                              >
                                View
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>

            {/* Activity Tab */}
            <TabPanel value={tabValue} index={2}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Enrolled in VAT Fundamentals Course"
                    secondary="January 15, 2024 • 10:30 AM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Completed Module 1: Introduction to VAT"
                    secondary="January 18, 2024 • 2:15 PM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Downloaded VAT Compliance Handbook"
                    secondary="January 20, 2024 • 11:00 AM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Earned Certificate: VAT Fundamentals"
                    secondary="January 25, 2024 • 3:45 PM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Enrolled in Income Tax Basics"
                    secondary="February 1, 2024 • 9:30 AM"
                  />
                </ListItem>
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
