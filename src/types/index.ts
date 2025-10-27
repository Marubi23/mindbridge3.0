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
  updated_at?: string;
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
  education?: string[];
  languages?: string[];
}

export interface Client extends User {
  date_of_birth?: string;
  emergency_contact?: string;
  insurance_provider?: string;
  primary_concern?: string;
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
  clients: Client;
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
  created_at?: string;
  updated_at?: string;
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
    id?: string;
    first_name: string;
    last_name: string;
    specialization: string;
    email?: string;
  };
  clients?: {
    id?: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface Answer {
  question_id: string;
  answer: string | number | string[];
}

export interface ProgressMetrics {
  client_id: string;
  current_score: number;
  previous_score: number;
  trend: 'improving' | 'declining' | 'stable';
  insights: string[];
  last_updated: string;
  assessment_count?: number;
  session_count?: number;
  goals?: string[];
  recommendations?: string[];
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
  created_at?: string;
  updated_at?: string;
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
  type?: string;
}

export interface AppointmentFormData {
  psychiatrist_id: string;
  scheduled_for: string;
  session_type: 'video' | 'audio' | 'chat';
  duration: number;
  notes?: string;
}

// Auth types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone?: string;
  specialization?: string; // For psychiatrists
  experience_years?: number; // For psychiatrists
  date_of_birth?: string; // For clients
}

// Context types
export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

// Dashboard stats types
export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedSessions: number;
  pendingAssessments: number;
  totalPatients?: number; // For psychiatrists
  wellnessScore?: number; // For clients
}

// Chat/Messaging types
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  is_read: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  last_message?: Message;
  created_at: string;
  updated_at: string;
}

// Payment types
export interface Payment {
  id: string;
  appointment_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  updated_at?: string;
}

// File upload types
export interface UploadedFile {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
  uploaded_by: string;
  created_at: string;
}

// Settings types
export interface UserSettings {
  id: string;
  user_id: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profile_visibility: 'public' | 'private' | 'contacts_only';
    show_online_status: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  created_at: string;
  updated_at: string;
}

// Emergency contact types
export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  is_primary: boolean;
  created_at: string;
  updated_at?: string;
}

// Medication types (for future use)
export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribed_by: string;
  start_date: string;
  end_date?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

// Treatment plan types (for future use)
export interface TreatmentPlan {
  id: string;
  client_id: string;
  psychiatrist_id: string;
  title: string;
  description: string;
  goals: string[];
  duration_weeks: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}