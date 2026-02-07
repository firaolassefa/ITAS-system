import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School, MenuBook, VideoLibrary, EmojiEvents, PersonAdd } from '@mui/icons-material';

const PublicHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleBrowseCoursesClick = () => {
    navigate('/public/courses');
  };

  const handleBrowseResourcesClick = () => {
    navigate('/public/resources');
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ITAS Tax Education Portal
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/public/courses')}
            sx={{ mr: 2 }}
          >
            Browse Courses
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/public/resources')}
            sx={{ mr: 2 }}
          >
            Browse Resources
          </Button>
          <Button 
            color="primary" 
            variant="outlined"
            startIcon={<Login />}
            onClick={() => navigate('/login')}
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button 
            color="primary" 
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            ITAS Tax Education Portal
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4 }}>
            Learn about tax compliance, regulations, and best practices
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/public/courses')}
              sx={{ mr: 2, px: 4, py: 1.5 }}
            >
              Browse Courses
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Sign Up Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
          What We Offer
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Everything you need to master tax compliance and regulations
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <School sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Online Courses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive tax education courses for all levels - from beginner to advanced
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <MenuBook sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Resources
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Guides, handbooks, and reference materials to support your learning
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <VideoLibrary sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Video Tutorials
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Step-by-step video guides and live webinars with tax experts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <EmojiEvents sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Certificates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earn official certificates upon successful course completion
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                50+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Tax Courses
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                10,000+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Active Learners
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                95%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Satisfaction Rate
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join thousands of taxpayers improving their tax knowledge. Sign up now - it's free!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<PersonAdd />}
            onClick={() => navigate('/register')}
            sx={{ px: 5, py: 1.5, fontSize: '1.1rem' }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                ITAS Tax Education Portal
              </Typography>
              <Typography variant="body2" color="grey.400">
                Empowering taxpayers with knowledge and skills for better tax compliance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign={{ xs: 'left', md: 'right' }}>
              <Typography variant="body2" color="grey.400">
                © 2024 ITAS. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicHome;
