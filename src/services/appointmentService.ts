// src/services/appointmentService.ts
import { supabase } from './supabase';
import { Appointment } from '../types';

export const appointmentService = {
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'clients' | 'psychiatrists'>) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select(`
        *,
        clients:client_id(*),
        psychiatrists:psychiatrist_id(*)
      `)
      .single();
    if (error) throw error;
    return data;
  },

  async getClientAppointments(clientId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        psychiatrists:psychiatrist_id(*)
      `)
      .eq('client_id', clientId)
      .order('scheduled_for', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getPsychiatristAppointments(psychiatristId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        clients:client_id(*)
      `)
      .eq('psychiatrist_id', psychiatristId)
      .order('scheduled_for', { ascending: true });
    if (error) throw error;
    return data;
  },

  async updateAppointmentStatus(appointmentId: string, status: string) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', appointmentId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async cancelAppointment(appointmentId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', appointmentId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async rescheduleAppointment(appointmentId: string, newDate: string) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ scheduled_for: newDate })
      .eq('id', appointmentId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};