import React, { useState } from 'react';
import { appointmentService } from '../services/supabase';

interface BookSessionModalProps {
  onClose: () => void;
  onBooked: () => void;
}

export const BookSessionModal: React.FC<BookSessionModalProps> = ({ onClose, onBooked }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock booking data - in real app, this would come from form inputs
      await appointmentService.createAppointment({
        psychiatrist_id: 'psych-1',
        client_id: 'mock-user-id',
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        session_type: 'video',
        duration: 60,
        notes: 'Initial consultation booking'
      });
      
      onBooked();
      onClose();
    } catch (error) {
      console.error('Error booking session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Book New Session</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="video">Video Call</option>
              <option value="audio">Audio Call</option>
              <option value="chat">Chat Session</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date & Time
            </label>
            <input 
              type="datetime-local"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea 
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Any specific concerns or topics you'd like to discuss..."
            />
          </div>
        </form>
        
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 font-medium"
          >
            {loading ? 'Booking...' : 'Book Session'}
          </button>
        </div>
      </div>
    </div>
  );
};