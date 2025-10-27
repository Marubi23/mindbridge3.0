import React from 'react';
import { ProgressMetrics } from '../types';

interface ProgressChartProps {
  progress: ProgressMetrics;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'declining': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '↗';
      case 'declining': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(progress.trend)}`}>
          {getTrendIcon(progress.trend)} {progress.trend}
        </span>
      </div>

      {/* Wellness Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">Wellness Score</h3>
          <span className="text-2xl font-bold text-teal-600">{progress.current_score}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-teal-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(progress.current_score / 10) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Previous: {progress.previous_score}/10</span>
          <span>Change: {(progress.current_score - progress.previous_score).toFixed(1)}</span>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Insights</h3>
        <div className="space-y-2">
          {progress.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-800">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Assessments Completed</p>
          <p className="text-2xl font-bold text-gray-900">{progress.assessment_count}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Sessions Attended</p>
          <p className="text-2xl font-bold text-gray-900">{progress.session_count}</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500 mt-2">Progress chart visualization</p>
        <p className="text-sm text-gray-400">Detailed charts coming soon</p>
      </div>
    </div>
  );
};