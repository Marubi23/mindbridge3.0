export type UserRole = 'client' | 'psychiatrist';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Profile extends User {
  role: UserRole;
}

export interface Psychiatrist extends User {
  specialization: string;
  experience_years: number;
  hourly_rate: number;
  availability: any;
  license_number?: string;
  is_verified: boolean;
}

export interface Client extends User {
  date_of_birth?: string;
  emergency_contact?: string;
  insurance_provider?: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  psychiatrist_id: string;
  scheduled_for: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  session_type: 'video' | 'audio' | 'chat';
  notes?: string;
  created_at: string;
  updated_at?: string;
  clients: User;
  psychiatrists: Psychiatrist;
}

export interface Session {
  id: string;
  appointment_id: string;
  started_at?: string;
  ended_at?: string;
  status: 'scheduled' | 'live' | 'ended';
  room_id?: string;
  recording_url?: string;
}

export interface Assessment {
  id: string;
  psychiatrist_id: string;
  client_id: string;
  title: string;
  description?: string;
  type: string;
  questions: Question[];
  responses?: AssessmentResponse[];
  score?: number;
  max_score?: number;
  results?: any;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  completed_at?: string;
  created_at: string;
  updated_at: string;
  psychiatrists?: {
    first_name: string;
    last_name: string;
    specialization: string;
  };
  clients?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface Question {
  id: string;
  question: string;
  type: 'text' | 'multiple_choice' | 'scale' | 'likert';
  options?: string[];
  required?: boolean;
  min_value?: number;
  max_value?: number;
}

export interface AssessmentResponse {
  id: string;
  assessment_id: string;
  client_id: string;
  answers: Answer[];
  score?: number;
  max_score?: number;
  submitted_at: string;
}

export interface Answer {
  question_id: string;
  answer: string | number | string[];
}

// ADD THIS MISSING TYPE:
export interface ProgressMetrics {
  client_id: string;
  current_score: number;
  previous_score: number;
  trend: 'improving' | 'declining' | 'stable';
  insights: string[];
  last_updated: string;
  assessment_count?: number;
  session_count?: number;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'assessment' | 'system' | 'reminder';
  is_read: boolean;
  created_at: string;
  metadata?: any;
}

export interface AvailabilitySlot {
  id: string;
  psychiatrist_id: string;
  start_time: string;
  end_time: string;
  day_of_week: number;
  is_recurring: boolean;
}

export interface BookingParams {
  psychiatrist_id: string;
  client_id: string;
  scheduled_for: string;
  session_type: 'video' | 'audio' | 'chat';
  duration: number;
  notes?: string;
}

// Response types for API calls
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Form types
export interface AssessmentFormData {
  title: string;
  description: string;
  questions: Question[];
  psychiatrist_id: string;
  client_id: string;
}

export interface AppointmentFormData {
  psychiatrist_id: string;
  scheduled_for: string;
  session_type: 'video' | 'audio' | 'chat';
  duration: number;
  notes?: string;
}