import React, { useState, useEffect } from 'react';
import { ProgressChart } from './ProgressChart';
import { useAuth } from '../contexts/AuthContext';
import { appointmentService, assessmentService, progressService } from '../services/supabase';
import { Appointment, Assessment, ProgressMetrics } from '../types';

export const ClientDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [progress, setProgress] = useState<ProgressMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'progress' | 'assessments'>('appointments');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        if (user?.id) {
          const [appointmentsData, assessmentsData, progressData] = await Promise.all([
            appointmentService.getClientAppointments(user.id),
            assessmentService.getClientAssessments(user.id),
            progressService.getClientProgress(user.id)
          ]);

          setAppointments(appointmentsData || []);
          setAssessments(assessmentsData || []);
          setProgress(progressData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setAppointments([]);
        setAssessments([]);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Safe date filtering with fallbacks
  const upcomingAppointments = appointments.filter(apt => {
    try {
      const aptDate = new Date(apt.scheduled_for);
      const now = new Date();
      return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed';
    } catch {
      return false;
    }
  });

  const pastAppointments = appointments.filter(apt => {
    try {
      const aptDate = new Date(apt.scheduled_for);
      const now = new Date();
      return aptDate < now || apt.status === 'completed';
    } catch {
      return false;
    }
  });

  // Safe display name function
  const getDisplayName = () => {
    if (user?.email) return user.email.split('@')[0];
    return 'there';
  };

  // Safe date formatting
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Invalid time';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {getDisplayName()}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your mental wellness overview
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress and Assessments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Chart */}
            {progress && (
              <ProgressChart progress={progress} />
            )}

            {/* Tab Navigation */}
            <div className="bg-white shadow rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'appointments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Appointments
                  </button>
                  <button
                    onClick={() => setActiveTab('assessments')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'assessments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Assessments
                  </button>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'progress'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Progress History
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'appointments' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Your Appointments</h3>
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Book New Session
                      </button>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="mb-8">
                      <h4 className="font-medium text-gray-900 mb-4">Upcoming Sessions</h4>
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-900 capitalize">
                                    {appointment.session_type || 'therapy'} Session
                                  </p>
                                  <p className="text-gray-600">
                                    with Dr. {appointment.psychiatrists?.last_name || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(appointment.scheduled_for)} at {formatTime(appointment.scheduled_for)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Duration: {appointment.duration || 60} minutes
                                  </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800'
                                    : appointment.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status || 'scheduled'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                      )}
                    </div>

                    {/* Past Appointments */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Past Sessions</h4>
                      {pastAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {pastAppointments.slice(0, 3).map((appointment) => (
                            <div
                              key={appointment.id}
                              className="border border-gray-200 rounded-lg p-4 opacity-75"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-900 capitalize">
                                    {appointment.session_type || 'therapy'} Session
                                  </p>
                                  <p className="text-gray-600">
                                    with Dr. {appointment.psychiatrists?.last_name || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(appointment.scheduled_for)}
                                  </p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Completed
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No past appointments</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'assessments' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Your Assessments</h3>
                    {assessments.length > 0 ? (
                      <div className="space-y-4">
                        {assessments.map((assessment) => (
                          <div
                            key={assessment.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-900">{assessment.title || 'Untitled Assessment'}</p>
                                <p className="text-sm text-gray-500">
                                  {assessment.completed_at 
                                    ? `Completed on ${formatDate(assessment.completed_at)}`
                                    : 'Not completed'
                                  }
                                </p>
                                {assessment.score !== undefined && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    Score: <span className="font-medium">{assessment.score}</span>/{assessment.max_score || 100}
                                    {assessment.results?.severity && (
                                      <span className="ml-2">- {assessment.results.severity}</span>
                                    )}
                                  </p>
                                )}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                assessment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : assessment.status === 'active'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {assessment.status || 'draft'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No assessments completed yet</p>
                    )}
                  </div>
                )}

                {activeTab === 'progress' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Progress History</h3>
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Detailed progress history coming soon</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Track your wellness journey over time with detailed charts and insights
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions and Resources */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book New Session
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Take Assessment
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Resources
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Emergency Contacts
                </button>
              </div>
            </div>

            {/* Today's Tip */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Today's Wellness Tip</h3>
              <p className="text-sm opacity-90">
                Practice 5 minutes of deep breathing exercises. Focus on slow, steady breaths to calm your nervous system.
              </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Completed PHQ-9 assessment</span>
                  <span className="text-gray-400 text-xs">2 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Therapy session with Dr. Smith</span>
                  <span className="text-gray-400 text-xs">1 week ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Started meditation practice</span>
                  <span className="text-gray-400 text-xs">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Placeholder */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Book New Session</h3>
            <p className="text-gray-600 mb-6">
              Booking functionality will be implemented here.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;