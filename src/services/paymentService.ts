// src/services/paymentService.ts
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const paymentService = {
  async createCheckoutSession(priceId: string, userId: string, appointmentId: string) {
    try {
      // For now, use a mock implementation since we don't have backend setup
      console.log('Creating checkout session for:', { priceId, userId, appointmentId });
      
      // Mock session ID for development
      const mockSessionId = `cs_mock_${Date.now()}`;
      
      // Store booking data for success page
      localStorage.setItem('lastBookingSessionId', mockSessionId);
      localStorage.setItem('lastBookingAppointmentId', appointmentId);
      
      // Use the new Stripe redirect method
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // For development, just redirect to success page
      window.location.href = `/payment/success?session_id=${mockSessionId}`;
      
      return { sessionId: mockSessionId };

    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  async getPaymentStatus(sessionId: string) {
    try {
      // Mock payment status for development
      return {
        status: 'paid',
        amount: 12000,
        currency: 'usd',
        sessionId: sessionId
      };
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }
};