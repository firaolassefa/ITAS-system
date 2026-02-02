import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/auth/Login';

// Taxpayer Pages
import TaxpayerDashboard from './pages/taxpayer/Dashboard';
import TaxpayerCourses from './pages/taxpayer/Courses';
import CourseDetail from './pages/taxpayer/CourseDetail';
import TaxpayerResources from './pages/taxpayer/Resources';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UploadResource from './pages/admin/UploadResource';
import Analytics from './pages/admin/Analytics';

// Shared Pages
import Profile from './pages/Profile';

// Layout Components
import TaxpayerLayout from './components/TaxpayerLayout';
import AdminLayout from './components/AdminLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('itas_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: any, token: string) => {
    localStorage.setItem('itas_user', JSON.stringify(userData));
    localStorage.setItem('itas_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('itas_user');
    localStorage.removeItem('itas_token');
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={
            user ? <Navigate to={user.userType === 'TAXPAYER' ? '/taxpayer/dashboard' : '/admin/dashboard'} /> :
            <Login onLogin={handleLogin} />
          } />

          {/* Taxpayer Routes */}
          <Route path="/taxpayer" element={
            user?.userType === 'TAXPAYER' ? 
            <TaxpayerLayout user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<TaxpayerDashboard user={user} />} />
            <Route path="courses" element={<TaxpayerCourses user={user} />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="resources" element={<TaxpayerResources user={user} />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            user?.userType !== 'TAXPAYER' ? 
            <AdminLayout user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="upload-resource" element={<UploadResource />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* Shared Routes */}
          <Route path="/profile" element={
            user ? <Profile user={user} /> : <Navigate to="/login" />
          } />

          {/* Default Route */}
          <Route path="/" element={
            user ? 
            <Navigate to={user.userType === 'TAXPAYER' ? '/taxpayer/dashboard' : '/admin/dashboard'} /> :
            <Navigate to="/login" />
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
