import axios from 'axios';

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  courseEnrollments: number;
  courseCompletions: number;
  resourceDownloads: number;
  completionRate: number;
  avgProgress: number;
  topCourses: Array<{
    id: number;
    title: string;
    enrollments: number;
    completions: number;
    completionRate: number;
  }>;
}

export const analyticsAPI = {
  getDashboardData: async (): Promise<AnalyticsData> => {
    const response = await axios.get('/analytics/dashboard');
    return response.data.data;
  },

  getUserAnalytics: async (userId: number): Promise<any> => {
    const response = await axios.get(`/analytics/users/${userId}`);
    return response.data.data;
  },

  getCourseAnalytics: async (courseId: number): Promise<any> => {
    const response = await axios.get(`/analytics/courses/${courseId}`);
    return response.data.data;
  },

  exportReport: async (format: 'pdf' | 'excel'): Promise<Blob> => {
    const response = await axios.get(`/analytics/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};