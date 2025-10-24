import { User, Church, Ministry, Minister, Volunteer, Event, Schedule, Notification } from './types';

// Configure your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse<{ user: User; token: string }>(response);
  }

  async register(email: string, password: string, name: string) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return this.handleResponse<{ user: User; token: string }>(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // Church endpoints
  async createChurch(data: Partial<Church>) {
    const currentUser = this.getCurrentUser();
    const response = await fetch(`${API_BASE_URL}/church/createChurch?token=${currentUser}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Church>(response);
  }

  async getChurches() {
    const response = await fetch(`${API_BASE_URL}/churches`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Church[]>(response);
  }

  async getChurch(id: string) {
    const response = await fetch(`${API_BASE_URL}/churches/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Church>(response);
  }

  async updateChurch(id: string, data: Partial<Church>) {
    const response = await fetch(`${API_BASE_URL}/churches/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Church>(response);
  }

  // Ministry endpoints
  async getMinistries(churchId: string) {
    const response = await fetch(`${API_BASE_URL}/churches/${churchId}/ministries`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Ministry[]>(response);
  }

  async createMinistry(data: Partial<Ministry>) {
    const response = await fetch(`${API_BASE_URL}/ministries`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Ministry>(response);
  }

  async updateMinistry(id: string, data: Partial<Ministry>) {
    const response = await fetch(`${API_BASE_URL}/ministries/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Ministry>(response);
  }

  async deleteMinistry(id: string) {
    const response = await fetch(`${API_BASE_URL}/ministries/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(response);
  }

  // Minister endpoints
  async getMinisters(churchId: string) {
    const response = await fetch(`${API_BASE_URL}/churches/${churchId}/ministers`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Minister[]>(response);
  }

  async inviteMinister(data: { email: string; name: string; ministryId: string; churchId: string }) {
    const response = await fetch(`${API_BASE_URL}/ministers/invite`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Minister>(response);
  }

  // Volunteer endpoints
  async getVolunteers(ministryId: string) {
    const response = await fetch(`${API_BASE_URL}/ministries/${ministryId}/volunteers`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Volunteer[]>(response);
  }

  async inviteVolunteer(data: { email: string; name: string; ministryId: string; churchId: string; phone?: string }) {
    const response = await fetch(`${API_BASE_URL}/volunteers/invite`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Volunteer>(response);
  }

  async updateVolunteer(id: string, data: Partial<Volunteer>) {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Volunteer>(response);
  }

  // Event endpoints
  async getEvents(ministryId: string) {
    const response = await fetch(`${API_BASE_URL}/ministries/${ministryId}/events`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Event[]>(response);
  }

  async createEvent(data: Partial<Event>) {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Event>(response);
  }

  async updateEvent(id: string, data: Partial<Event>) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Event>(response);
  }

  async deleteEvent(id: string) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(response);
  }

  // Schedule endpoints
  async getSchedules(eventId: string) {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/schedules`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Schedule[]>(response);
  }

  async getMySchedules() {
    const response = await fetch(`${API_BASE_URL}/schedules/my`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Schedule[]>(response);
  }

  async createSchedule(data: Partial<Schedule>) {
    const response = await fetch(`${API_BASE_URL}/schedules`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Schedule>(response);
  }

  async updateScheduleStatus(id: string, status: Schedule['status'], notes?: string) {
    const response = await fetch(`${API_BASE_URL}/schedules/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status, notes }),
    });
    return this.handleResponse<Schedule>(response);
  }

  // Notification endpoints
  async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<Notification[]>(response);
  }

  async markNotificationAsRead(id: string) {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Notification>(response);
  }

  async markAllNotificationsAsRead() {
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(response);
  }
}

export const api = new ApiService();
