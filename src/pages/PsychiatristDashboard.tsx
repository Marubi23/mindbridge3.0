// src/pages/ClientDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentService, assessmentService, progressService } from '../services/supabase';
import { Appointment, Assessment, ProgressMetrics } from '../types';
import { BookSessionModal } from '../components/BookSessionModal';
import { AssessmentHistory } from '../components/AssessmentHistory';
import { ProgressChart } from '../components/progressChart'; 

export const ClientDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [progress, setProgress] = useState<ProgressMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'progress' | 'assessments'>('appointments');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsData, assessmentsData, progressData] = await Promise.all([
        appointmentService.getClientAppointments(user!.id),
        assessmentService.getClientAssessments(user!.id),
        progressService.getClientProgress(user!.id)
      ]);
      
      setAppointments(appointmentsData);
      setAssessments(assessmentsData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = (appointment: Appointment) => {
    // Implementation for joining video session
    window.open(`/session/${appointment.id}`, '_blank');
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await appointmentService.cancelAppointment(appointmentId);
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('Failed to cancel appointment');
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.scheduled_for) > new Date() && 
    ['scheduled', 'confirmed'].includes(apt.status)
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.scheduled_for) <= new Date() || 
    ['completed', 'cancelled'].includes(apt.status)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {profile?.first_name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's your mental wellness overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Next session</p>
                <p className="font-medium">
                  {upcomingAppointments.length > 0 
                    ? new Date(upcomingAppointments[0].scheduled_for).toLocaleDateString()
                    : 'No upcoming sessions'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold text-lg">
                  {profile?.first_name?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pastAppointments.filter(apt => apt.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progress?.current_score || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'appointments', name: 'Appointments', count: appointments.length },
              { id: 'progress', name: 'Progress', count: assessments.length },
              { id: 'assessments', name: 'Assessments', count: assessments.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Appointments</h2>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Book New Session
                  </button>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white shadow rounded-lg mb-8">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
                  </div>
                  {upcomingAppointments.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-4">No upcoming appointments</p>
                      <button 
                        onClick={() => setShowBookingModal(true)}
                        className="mt-2 text-teal-600 hover:text-teal-700"
                      >
                        Book your first session
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                  <span className="text-teal-600 font-bold">
                                    Dr. {appointment.psychiatrists.last_name?.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">
                                    Session with Dr. {appointment.psychiatrists.last_name}
                                  </h3>
                                  <p className="text-gray-500">
                                    {new Date(appointment.scheduled_for).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center space-x-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  appointment.status === 'scheduled' 
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : appointment.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {appointment.status}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Duration: {appointment.duration} minutes
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleJoinSession(appointment)}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm"
                              >
                                Join Session
                              </button>
                              <button 
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Past Appointments */}
                {pastAppointments.length > 0 && (
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Session History</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {pastAppointments.slice(0, 5).map((appointment) => (
                        <div key={appointment.id} className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-md font-medium text-gray-900">
                                Session with Dr. {appointment.psychiatrists.last_name}
                              </h4>
                              <p className="text-gray-500 text-sm">
                                {new Date(appointment.scheduled_for).toLocaleString()}
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              appointment.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress' && progress && (
              <ProgressChart progress={progress} />
            )}

            {activeTab === 'assessments' && (
              <AssessmentHistory assessments={assessments} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Book New Session
                </button>
                <button 
                  onClick={() => setActiveTab('assessments')}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Take Assessment
                </button>
                <button 
                  onClick={() => setActiveTab('progress')}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Progress
                </button>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-red-700 text-sm mb-4">
                If you're experiencing a mental health emergency, please contact:
              </p>
              <div className="space-y-2">
                <a href="tel:988" className="block text-red-600 hover:text-red-700 text-sm">
                  🗣️ National Suicide Prevention Lifeline: 988
                </a>
                <a href="tel:741741" className="block text-red-600 hover:text-red-700 text-sm">
                  💬 Crisis Text Line: Text HOME to 741741
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      appointment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-gray-600">
                      Session with Dr. {appointment.psychiatrists.last_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showBookingModal && (
        <BookSessionModal 
          onClose={() => setShowBookingModal(false)}
          onBooked={loadDashboardData}
        />
      )}
    </div>
  );
};