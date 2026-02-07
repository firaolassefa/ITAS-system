import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Chip,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '../../api/courses';
import CourseCard from '../../components/taxpayer/CourseCard';
import { COURSE_CATEGORIES } from '../../utils/constants';

interface CoursesProps {
  user: any;
}

const Courses: React.FC<CoursesProps> = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        coursesAPI.getAllCourses(),
        coursesAPI.getUserEnrollments(user.id),
      ]);
      setCourses(coursesRes.data || []);
      setEnrollments(enrollmentsRes.data || []);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      await coursesAPI.enroll(user.id, courseId);
      await loadCourses(); // Reload data
      navigate(`/taxpayer/course/${courseId}`);
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  const isEnrolled = (courseId: number) => {
    return enrollments.some(e => e.courseId === courseId);
  };

  const getProgress = (courseId: number) => {
    const enrollment = enrollments.find(e => e.courseId === courseId);
    return enrollment ? enrollment.progress : 0;
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    const matchesDifficulty = !difficultyFilter || course.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const enrolledCount = enrollments.length;
  const completedCount = enrollments.filter(e => e.status === 'COMPLETED').length;

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Loading courses...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Course Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse and enroll in tax education courses
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip 
            label={`${enrolledCount} Enrolled`} 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={`${completedCount} Completed`} 
            color="success" 
            variant="outlined" 
          />
          <Chip 
            label={`${courses.length} Available`} 
            color="info" 
            variant="outlined" 
          />
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e: SelectChangeEvent) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {COURSE_CATEGORIES.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultyFilter}
                label="Difficulty"
                onChange={(e: SelectChangeEvent) => setDifficultyFilter(e.target.value)}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="BEGINNER">Beginner</MenuItem>
                <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                <MenuItem value="ADVANCED">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setDifficultyFilter('');
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      {filteredCourses.length === 0 ? (
        <Alert severity="info">
          No courses found matching your criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {filteredCourses.length} courses found
          </Typography>
          
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} md={6} lg={4} key={course.id}>
                <CourseCard
                  course={course}
                  onEnroll={() => handleEnroll(course.id)}
                  isEnrolled={isEnrolled(course.id)}
                  progress={getProgress(course.id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Courses;
