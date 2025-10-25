// src/services/assessmentService.ts
import { supabase } from './supabase';

export const assessmentServices = {
  // Create a new assessment
  async createAssessment(assessmentData: {
    title: string;
    description: string;
    questions: any[];
    psychiatrist_id: string;
    client_id: string;
  }) {
    const { data, error } = await supabase
      .from('assessments')
      .insert([assessmentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get assessments for a psychiatrist
  async getPsychiatristAssessments(psychiatristId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('psychiatrist_id', psychiatristId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get assessments for a client
  async getClientAssessments(clientId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update assessment
  async updateAssessment(assessmentId: string, updates: any) {
    const { data, error } = await supabase
      .from('assessments')
      .update(updates)
      .eq('id', assessmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete assessment
  async deleteAssessment(assessmentId: string) {
    const { error } = await supabase
      .from('assessments')
      .delete()
      .eq('id', assessmentId);

    if (error) throw error;
  }
};

// Alternative: If you prefer individual named exports instead of a service object
export const createAssessment = assessmentServices.createAssessment;
export const getPsychiatristAssessments = assessmentServices.getPsychiatristAssessments;
export const getClientAssessments = assessmentServices.getClientAssessments;
export const updateAssessment = assessmentServices.updateAssessment;
export const deleteAssessment = assessmentServices.deleteAssessment;

export default assessmentServices;