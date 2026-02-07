import axios from 'axios';

export interface Webinar {
  id: number;
  title: string;
  description: string;
  scheduleTime: string;
  durationMinutes: number;
  presenters: string[];
  maxAttendees: number;
  targetAudience: string;
  meetingLink?: string;
  recordingLink?: string;
  registrationOpen: boolean;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  registeredCount: number;
  createdBy: {
    id: number;
    fullName: string;
  };
}

export interface WebinarRegistration {
  id: number;
  webinarId: number;
  userId: number;
  registeredAt: string;
  attended: boolean;
  attendedAt?: string;
}

export interface CreateWebinarRequest {
  title: string;
  description: string;
  scheduleTime: string;
  durationMinutes: number;
  presenters: string[];
  maxAttendees: number;
  targetAudience: string;
  meetingLink?: string;
}

export const webinarsAPI = {
  // UC-ADM-001: Schedule Live Webinar
  scheduleWebinar: async (data: CreateWebinarRequest): Promise<Webinar> => {
    const response = await axios.post('/webinars', data);
    return response.data.data;
  },

  // Get all webinars
  getAllWebinars: async (params?: {
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    size?: number;
  }): Promise<{ data: Webinar[]; total: number }> => {
    const response = await axios.get('/webinars', { params });
    return {
      data: response.data.data.content || response.data.data,
      total: response.data.data.totalElements || response.data.data.length,
    };
  },

  // Get upcoming webinars
  getUpcomingWebinars: async (limit: number = 10): Promise<Webinar[]> => {
    const response = await axios.get(`/webinars/upcoming?limit=${limit}`);
    return response.data.data;
  },

  // Get webinar by ID
  getWebinarById: async (id: number): Promise<Webinar> => {
    const response = await axios.get(`/webinars/${id}`);
    return response.data.data;
  },

  // UC-ADM-001: Register for webinar
  registerForWebinar: async (webinarId: number): Promise<void> => {
    await axios.post(`/webinars/${webinarId}/register`);
  },

  // Get webinar registrations
  getRegistrations: async (webinarId: number, params?: {
    page?: number;
    size?: number;
  }): Promise<{ data: any[]; total: number }> => {
    const response = await axios.get(`/webinars/${webinarId}/registrations`, { params });
    return {
      data: response.data.data.content || response.data.data,
      total: response.data.data.totalElements || response.data.data.length,
    };
  },

  // Start webinar
  startWebinar: async (webinarId: number): Promise<void> => {
    await axios.post(`/webinars/${webinarId}/start`);
  },

  // Complete webinar
  completeWebinar: async (webinarId: number): Promise<void> => {
    await axios.post(`/webinars/${webinarId}/complete`);
  },

  // Get attendance report
  getAttendanceReport: async (webinarId: number): Promise<any> => {
    const response = await axios.get(`/webinars/${webinarId}/attendance`);
    return response.data.data;
  },

  // Update webinar
  updateWebinar: async (id: number, data: Partial<CreateWebinarRequest>): Promise<Webinar> => {
    const response = await axios.put(`/webinars/${id}`, data);
    return response.data.data;
  },

  // Cancel webinar
  cancelWebinar: async (id: number, reason: string): Promise<void> => {
    await axios.delete(`/webinars/${id}`, { data: { reason } });
  },
};