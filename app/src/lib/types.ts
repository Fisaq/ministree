// User roles
export type UserRole = 'temporary' | 'admin' | 'minister' | 'volunteer';

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  churchId?: string;
  ministryId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Church types
export interface Church {
  id: string;
  name: string;
  address: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

// Ministry types
export interface Ministry {
  id: string;
  name: string;
  description: string;
  churchId: string;
  createdAt: string;
  updatedAt: string;
}

// Minister types
export interface Minister {
  id: string;
  userId: string;
  name: string;
  email: string;
  ministryId: string;
  churchId: string;
  createdAt: string;
  updatedAt: string;
}

// Volunteer types
export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  ministryId: string;
  churchId: string;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  ministryId: string;
  churchId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Schedule types
export interface Schedule {
  id: string;
  eventId: string;
  volunteerId: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined' | 'change_requested';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleWithDetails extends Schedule {
  event: Event;
  volunteer: Volunteer;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
