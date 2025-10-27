// src/services/supabase.ts - TEMPORARY MOCK VERSION
import { User, UserRole, Appointment, Assessment, ProgressMetrics, BookingParams, Session, Psychiatrist, Client } from '../types';

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    client_id: 'mock-user-id',
    psychiatrist_id: 'psych-1',
    scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    status: 'confirmed',
    session_type: 'video',
    created_at: new Date().toISOString(),
    clients: {
      id: 'mock-user-id',
      email: 'client@example.com',
      first_name: 'John',
      last_name: 'Client',
      created_at: new Date().toISOString()
    },
    psychiatrists: {
      id: 'psych-1',
      email: 'dr.smith@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      specialization: 'Cognitive Behavioral Therapy',
      experience_years: 8,
      hourly_rate: 150,
      availability: {},
      is_verified: true,
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'appt-2',
    client_id: 'mock-user-id',
    psychiatrist_id: 'psych-2',
    scheduled_for: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    status: 'scheduled',
    session_type: 'audio',
    created_at: new Date().toISOString(),
    clients: {
      id: 'mock-user-id',
      email: 'client@example.com',
      first_name: 'John',
      last_name: 'Client',
      created_at: new Date().toISOString()
    },
    psychiatrists: {
      id: 'psych-2',
      email: 'dr.jones@example.com',
      first_name: 'Michael',
      last_name: 'Jones',
      specialization: 'Anxiety Disorders',
      experience_years: 12,
      hourly_rate: 180,
      availability: {},
      is_verified: true,
      created_at: new Date().toISOString()
    }
  }
];

const mockAssessments: Assessment[] = [
  {
    id: 'assess-1',
    psychiatrist_id: 'psych-1',
    client_id: 'mock-user-id',
    title: 'PHQ-9 Depression Screening',
    description: 'Patient Health Questionnaire for depression assessment',
    type: 'depression',
    questions: [
      {
        id: 'q1',
        question: 'Little interest or pleasure in doing things?',
        type: 'scale',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
      }
    ],
    score: 8,
    max_score: 27,
    results: { severity: 'mild' },
    status: 'completed',
    completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    psychiatrists: {
      first_name: 'Jane',
      last_name: 'Smith',
      specialization: 'Cognitive Behavioral Therapy'
    }
  },
  {
    id: 'assess-2',
    psychiatrist_id: 'psych-1',
    client_id: 'mock-user-id',
    title: 'GAD-7 Anxiety Assessment',
    description: 'Generalized Anxiety Disorder assessment',
    type: 'anxiety',
    questions: [
      {
        id: 'q1',
        question: 'Feeling nervous, anxious, or on edge?',
        type: 'scale',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
      }
    ],
    score: 5,
    max_score: 21,
    results: { severity: 'mild' },
    status: 'completed',
    completed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    psychiatrists: {
      first_name: 'Jane',
      last_name: 'Smith',
      specialization: 'Cognitive Behavioral Therapy'
    }
  }
];

const mockProgress: ProgressMetrics = {
  client_id: 'mock-user-id',
  current_score: 6.5,
  previous_score: 7.2,
  trend: 'improving',
  insights: [
    'Your anxiety scores have improved by 15% over the past month',
    'Consistent session attendance is showing positive results',
    'Consider practicing mindfulness exercises daily'
  ],
  last_updated: new Date().toISOString(),
  assessment_count: 2,
  session_count: 5
};

// Mock active sessions
const mockActiveSessions: Session[] = [];

// Mock Supabase client
export const supabase = {
  auth: {
    signUp: async (credentials: any) => ({ 
      data: { user: { id: 'mock-user-id', email: credentials.email } }, 
      error: null 
    }),
    signInWithPassword: async (credentials: any) => ({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: credentials.email,
          user_metadata: { name: 'Test User' }
        } 
      }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: 'client@example.com',
          user_metadata: { name: 'Test User' }
        } 
      }, 
      error: null 
    }),
    onAuthStateChange: (callback: any) => {
      setTimeout(() => callback('SIGNED_OUT', null), 100);
      setTimeout(() => callback('SIGNED_IN', { 
        user: { 
          id: 'mock-user-id', 
          email: 'client@example.com',
          user_metadata: { name: 'Test User' }
        } 
      }), 1000);
      return { 
        data: { subscription: { unsubscribe: () => {} } } 
      };
    },
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        order: (column: string, options: any) => ({
          then: async (resolve: any) => {
            if (table === 'appointments' && column === 'client_id' && value === 'mock-user-id') {
              resolve({ data: mockAppointments, error: null });
            } else if (table === 'assessments' && column === 'client_id' && value === 'mock-user-id') {
              resolve({ data: mockAssessments, error: null });
            } else {
              resolve({ data: [], error: null });
            }
          }
        })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({ data: { id: 'mock-new-id', ...data[0] }, error: null })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: async () => ({ data: { ...data, id: value }, error: null })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        then: async (resolve: any) => resolve({ error: null })
      })
    })
  }),
  rpc: async (fn: string, params: any) => {
    if (fn === 'calculate_wellness_score') {
      return { data: 6.5, error: null };
    }
    return { data: null, error: null };
  }
};

// Mock auth service
export const authService = {
  async signUp(email: string, password: string, userData: any) {
    console.log('Mock signUp called:', email, userData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      user: { 
        id: 'mock-user-id', 
        email: email,
        user_metadata: { name: `${userData.first_name} ${userData.last_name}` }
      } 
    };
  },
  
  async signIn(email: string, password: string) {
    console.log('Mock signIn called:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      user: { 
        id: 'mock-user-id', 
        email: email,
        user_metadata: { name: 'Test User' }
      } 
    };
  },
  
  async signOut() {
    console.log('Mock signOut called');
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  async getCurrentUser() {
    return { 
      id: 'mock-user-id', 
      email: 'client@example.com',
      user_metadata: { name: 'Test User' }
    };
  }
};

// Mock appointment service
export const appointmentService = {
  async getClientAppointments(clientId: string): Promise<Appointment[]> {
    console.log('Mock getClientAppointments called:', clientId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAppointments.filter(apt => apt.client_id === clientId);
  },

  async getPsychiatristAppointments(psychiatristId: string): Promise<Appointment[]> {
    console.log('Mock getPsychiatristAppointments called:', psychiatristId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAppointments.filter(apt => apt.psychiatrist_id === psychiatristId);
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    console.log('Mock cancelAppointment called:', appointmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = 'cancelled';
    }
  },

  async rescheduleAppointment(appointmentId: string, newDate: string): Promise<Appointment> {
    console.log('Mock rescheduleAppointment called:', appointmentId, newDate);
    await new Promise(resolve => setTimeout(resolve, 500));
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.scheduled_for = newDate;
      return appointment;
    }
    throw new Error('Appointment not found');
  },

  async createAppointment(bookingData: BookingParams): Promise<Appointment> {
    console.log('Mock createAppointment called:', bookingData);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      ...bookingData,
      status: 'scheduled',
      created_at: new Date().toISOString(),
      clients: {
        id: 'mock-user-id',
        email: 'client@example.com',
        first_name: 'John',
        last_name: 'Client',
        created_at: new Date().toISOString()
      },
      psychiatrists: {
        id: bookingData.psychiatrist_id,
        email: 'dr@example.com',
        first_name: 'Doctor',
        last_name: 'Mock',
        specialization: 'Psychiatry',
        experience_years: 5,
        hourly_rate: 100,
        availability: {},
        is_verified: true,
        created_at: new Date().toISOString()
      }
    };
    
    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  async confirmAppointment(appointmentId: string): Promise<Appointment> {
    console.log('Mock confirmAppointment called:', appointmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = 'confirmed';
      return appointment;
    }
    throw new Error('Appointment not found');
  },

  async completeAppointment(appointmentId: string, notes?: string): Promise<Appointment> {
    console.log('Mock completeAppointment called:', appointmentId, notes);
    await new Promise(resolve => setTimeout(resolve, 500));
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = 'completed';
      appointment.notes = notes;
      return appointment;
    }
    throw new Error('Appointment not found');
  }
};

// Mock assessment service
export const assessmentService = {
  async getClientAssessments(clientId: string): Promise<Assessment[]> {
    console.log('Mock getClientAssessments called:', clientId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAssessments.filter(assess => assess.client_id === clientId);
  },

  async getPsychiatristAssessments(psychiatristId: string): Promise<Assessment[]> {
    console.log('Mock getPsychiatristAssessments called:', psychiatristId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAssessments.filter(assess => assess.psychiatrist_id === psychiatristId);
  },

  async createAssessment(assessmentData: any) {
    console.log('Mock createAssessment called:', assessmentData);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAssessment: Assessment = {
      id: `assess-${Date.now()}`,
      ...assessmentData,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      psychiatrists: {
        first_name: 'Jane',
        last_name: 'Smith',
        specialization: 'Cognitive Behavioral Therapy'
      }
    };
    
    mockAssessments.push(newAssessment);
    return newAssessment;
  },

  async getAssessmentById(assessmentId: string): Promise<Assessment> {
    console.log('Mock getAssessmentById called:', assessmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    const assessment = mockAssessments.find(assess => assess.id === assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }
    return assessment;
  },

  async submitAssessmentResults(assessmentId: string, results: any) {
    console.log('Mock submitAssessmentResults called:', assessmentId, results);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const assessment = mockAssessments.find(assess => assess.id === assessmentId);
    if (assessment) {
      assessment.score = results.score;
      assessment.max_score = results.max_score;
      assessment.results = results.answers;
      assessment.status = 'completed';
      assessment.completed_at = new Date().toISOString();
      assessment.updated_at = new Date().toISOString();
      return assessment;
    }
    throw new Error('Assessment not found');
  },

  async getClientAssessmentStats(clientId: string) {
    console.log('Mock getClientAssessmentStats called:', clientId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAssessments
      .filter(assess => assess.status === 'completed')
      .map(assess => ({
        score: assess.score,
        max_score: assess.max_score,
        completed_at: assess.completed_at,
        type: assess.type
      }));
  },

  async updateAssessment(assessmentId: string, updates: any) {
    console.log('Mock updateAssessment called:', assessmentId, updates);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const assessment = mockAssessments.find(assess => assess.id === assessmentId);
    if (assessment) {
      Object.assign(assessment, updates);
      assessment.updated_at = new Date().toISOString();
      return assessment;
    }
    throw new Error('Assessment not found');
  },

  async deleteAssessment(assessmentId: string) {
    console.log('Mock deleteAssessment called:', assessmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockAssessments.findIndex(assess => assess.id === assessmentId);
    if (index !== -1) {
      mockAssessments.splice(index, 1);
    }
  }
};

// Mock progress service
export const progressService = {
  async getClientProgress(clientId: string): Promise<ProgressMetrics | null> {
    console.log('Mock getClientProgress called:', clientId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProgress;
  },

  async calculateWellnessScore(clientId: string): Promise<number> {
    console.log('Mock calculateWellnessScore called:', clientId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return 6.5;
  }
};

// Mock session service - FIXED VERSION
export const sessionService = {
  async getActiveSessions(psychiatristId: string): Promise<Session[]> {
    console.log('Mock getActiveSessions called:', psychiatristId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockActiveSessions.filter(session => {
      const appointment = mockAppointments.find(apt => apt.id === session.appointment_id);
      return appointment && appointment.psychiatrist_id === psychiatristId;
    });
  },

  subscribeToSessions(psychiatristId: string, callback: any) {
    console.log('Mock subscribeToSessions called:', psychiatristId);
    // Simulate real-time updates
    const interval = setInterval(() => {
      // This would normally receive real updates
    }, 5000);
    
    return { 
      unsubscribe: () => clearInterval(interval)
    };
  },

  async joinSession(appointmentId: string) {
    console.log('Mock joinSession called:', appointmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { room_url: `https://meet.jit.si/mock-room-${appointmentId}` };
  },

  async startSession(appointmentId: string): Promise<Session> {
    console.log('Mock startSession called:', appointmentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newSession: Session = {
      id: `session-${Date.now()}`,
      appointment_id: appointmentId,
      started_at: new Date().toISOString(),
      status: 'live',
      room_id: `room-${appointmentId}`
    };
    
    mockActiveSessions.push(newSession);
    return newSession;
  },

  async notifySessionStart(appointmentId: string): Promise<void> {
    console.log('Mock notifySessionStart called:', appointmentId);
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Notification sent for appointment ${appointmentId}`);
  },

  async endSession(sessionId: string): Promise<void> {
    console.log('Mock endSession called:', sessionId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const sessionIndex = mockActiveSessions.findIndex(session => session.id === sessionId);
    if (sessionIndex !== -1) {
      const session = mockActiveSessions[sessionIndex];
      session.status = 'ended';
      session.ended_at = new Date().toISOString();
    }
  }
};

export default {
  supabase,
  authService,
  appointmentService,
  assessmentService,
  progressService,
  sessionService
};