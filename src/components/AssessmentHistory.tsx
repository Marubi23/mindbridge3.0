import React from 'react';
import { Assessment } from '../types';

interface AssessmentHistoryProps {
  assessments: Assessment[];
}

export const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ assessments }) => {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'text-green-600 bg-green-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Assessment History</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm">
          Take New Assessment
        </button>
      </div>

      {assessments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No assessments yet</h3>
          <p className="mt-2 text-gray-500">Complete your first assessment to track your progress.</p>
          <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
            Start Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{assessment.title}</h3>
                  <p className="text-sm text-gray-600">
                    With Dr. {assessment.psychiatrists?.first_name} {assessment.psychiatrists?.last_name}
                  </p>
                </div>
                {assessment.score !== undefined && assessment.max_score !== undefined && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(assessment.score, assessment.max_score)}`}>
                    {assessment.score}/{assessment.max_score}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Completed: {assessment.completed_at ? new Date(assessment.completed_at).toLocaleDateString() : 'Not completed'}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  assessment.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : assessment.status === 'active'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {assessment.status}
                </span>
              </div>

              {assessment.results && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Results Summary</h4>
                  <p className="text-sm text-gray-600">
                    {assessment.results.severity ? `Severity: ${assessment.results.severity}` : 'Review your results with your psychiatrist'}
                  </p>
                </div>
              )}

              <div className="mt-3 flex space-x-2">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};