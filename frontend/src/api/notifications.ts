import axios from 'axios';

export interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: 'EMAIL' | 'SMS' | 'SYSTEM' | 'IN_APP';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  targetAudience: string;
  scheduledFor?: string;
  sentAt?: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'FAILED';
  sentCount: number;
  openedCount: number;
  read: boolean;
  readAt?: string;
  createdAt: string;
  sender?: {
    id: number;
    fullName: string;
  };
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  notificationType: 'EMAIL' | 'SMS' | 'SYSTEM' | 'IN_APP';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  targetAudience: string;
  scheduledFor?: string;
}

export const notificationsAPI = {
  // UC-ADM-002: Send Educational Notifications
  sendNotification: async (data: CreateNotificationRequest): Promise<Notification> => {
    const response = await axios.post('/notifications/send', data);
    return response.data.data;
  },

  // Get all notifications
  getAllNotifications: async (params?: {
    status?: string;
    type?: string;
    page?: number;
    size?: number;
  }): Promise<{ data: Notification[]; total: number }> => {
    const response = await axios.get('/notifications', { params });
    return {
      data: response.data.data.content || response.data.data,
      total: response.data.data.totalElements || response.data.data.length,
    };
  },

  // Get user notifications
  getUserNotifications: async (params?: {
    page?: number;
    size?: number;
    read?: boolean;
  }): Promise<{ data: Notification[]; total: number }> => {
    const response = await axios.get('/notifications/user', { params });
    return {
      data: response.data.data.content || response.data.data,
      total: response.data.data.totalElements || response.data.data.length,
    };
  },

  // Mark as read
  markAsRead: async (notificationId: number): Promise<void> => {
    await axios.patch(`/notifications/${notificationId}/read`);
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    await axios.patch('/notifications/read-all');
  },

  // Get notification statistics
  getStatistics: async (): Promise<{
    total: number;
    sent: number;
    opened: number;
    byType: Record<string, number>;
    byAudience: Record<string, number>;
  }> => {
    const response = await axios.get('/notifications/statistics');
    return response.data.data;
  },

  // Get campaign performance
  getCampaignPerformance: async (campaignId: number): Promise<any> => {
    const response = await axios.get(`/notifications/campaigns/${campaignId}/performance`);
    return response.data.data;
  },

  // Delete notification
  deleteNotification: async (id: number): Promise<void> => {
    await axios.delete(`/notifications/${id}`);
  },

  // Resend failed notification
  resendNotification: async (id: number): Promise<void> => {
    await axios.post(`/notifications/${id}/resend`);
  },
};