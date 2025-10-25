// src/contexts/AuthContext.tsx - TEMPORARY SIMPLIFIED VERSION
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock auth functions
  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setUser({ id: 'mock-user-id' } as User);
    setProfile({
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role
    } as Profile);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setUser({ id: 'mock-user-id' } as User);
    setProfile({
      first_name: 'Mock',
      last_name: 'User',
      role: 'client'
    } as Profile);
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};