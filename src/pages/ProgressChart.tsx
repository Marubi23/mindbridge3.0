import React from 'react';
import { ProgressMetrics } from '../types';

interface ProgressChartProps {
  progress: ProgressMetrics;
  isLoading?: boolean;
  error?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ 
  progress, 
  isLoading = false, 
  error 
}) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100 border border-green-200';
      case 'declining': return 'text-red-600 bg-red-100 border border-red-200';
      default: return 'text-yellow-600 bg-yellow-100 border border-yellow-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '↗';
      case 'declining': return '↘';
      default: return '→';
    }
  };

  const getTrendAnalysis = (current: number, previous: number) => {
    const difference = current - previous;
    const percentage = previous > 0 ? (difference / previous) * 100 : 0;
    
    return {
      difference,
      percentage: Math.abs(percentage).toFixed(1),
      isImproving: difference > 0,
      isSignificant: Math.abs(percentage) > 10
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <div className="text-red-600 mb-4">⚠️ Unable to load progress data</div>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  const trendAnalysis = getTrendAnalysis(progress.current_score, progress.previous_score);

  return (
    <div 
      className="bg-white shadow rounded-lg p-6"
      role="region" 
      aria-labelledby="progress-heading"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 id="progress-heading" className="text-2xl font-bold text-gray-900">
          Your Progress
        </h2>
        <span 
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTrendColor(progress.trend)}`}
          aria-label={`Trend: ${progress.trend}`}
        >
          {getTrendIcon(progress.trend)} {progress.trend}
        </span>
      </div>

      {/* Wellness Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">Wellness Score</h3>
          <span 
            className="text-2xl font-bold text-teal-600"
            aria-live="polite"
          >
            {progress.current_score}/10
          </span>
        </div>
        <div 
          className="w-full bg-gray-200 rounded-full h-4"
          role="progressbar"
          aria-valuenow={progress.current_score}
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuetext={`${progress.current_score} out of 10`}
        >
          <div 
            className="bg-teal-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(progress.current_score / 10) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Previous: {progress.previous_score}/10</span>
          <span className={trendAnalysis.isImproving ? 'text-green-600' : 'text-red-600'}>
            Change: {trendAnalysis.difference > 0 ? '+' : ''}{trendAnalysis.difference.toFixed(1)}
            {trendAnalysis.isSignificant && (
              <span className="ml-1 text-xs">
                ({trendAnalysis.percentage}%)
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Insights</h3>
        <div className="space-y-2">
          {progress.insights.map((insight, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
            >
              <svg 
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p className="text-sm text-blue-800">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Assessments Completed</p>
          <p className="text-2xl font-bold text-gray-900">{progress.assessment_count || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Sessions Attended</p>
          <p className="text-2xl font-bold text-gray-900">{progress.session_count || 0}</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
        <svg 
          className="w-12 h-12 mx-auto text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        <p className="text-gray-500 mt-2">Progress chart visualization</p>
        <p className="text-sm text-gray-400">Detailed charts coming soon</p>
      </div>
    </div>
  );
};

export default ProgressChart;