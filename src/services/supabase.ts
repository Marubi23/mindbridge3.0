// src/services/supabase.ts - TEMPORARY MOCK VERSION
import { User, UserRole } from '../types';

// Mock Supabase client that doesn't throw errors
export const supabase = {
  auth: {
    signUp: async () => ({ 
      data: { user: { id: 'mock-user-id' } }, 
      error: null 
    }),
    signInWithPassword: async () => ({ 
      data: { user: { id: 'mock-user-id' } }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Simulate being logged out initially
      setTimeout(() => callback('SIGNED_OUT', null), 100);
      return { 
        data: { subscription: { unsubscribe: () => {} } } 
      };
    },
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null })
      })
    })
  })
};

// Mock auth service
export const authService = {
  async signUp(email: string, password: string, userData: any) {
    console.log('Mock signUp called:', email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { id: 'mock-user-id' } };
  },
  
  async signIn(email: string, password: string) {
    console.log('Mock signIn called:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { id: 'mock-user-id' } };
  },
  
  async signOut() {
    console.log('Mock signOut called');
  },
  
  async getCurrentUser() {
    return null; // Start with no user logged in
  }
};

// Mock other services
export const appointmentService = {
  getPsychiatristAppointments: async () => [],
};

export const sessionServices = {
  getActiveSessions: async () => [],
  subscribeToSessions: () => ({ unsubscribe: () => {} })
};

export const assessmentService = {
  getPsychiatristAssessments: async () => [],
  createAssessment: async () => ({ id: 'mock-assessment' })
};