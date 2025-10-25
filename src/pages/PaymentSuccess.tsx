import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Calendar, User, Clock } from 'lucide-react';

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState({
    sessionId: '',
    psychiatristName: '',
    sessionDate: '',
    sessionTime: '',
    amount: ''
  });

  useEffect(() => {
    // Extract session details from URL parameters or localStorage
    const sessionId = searchParams.get('session_id') || localStorage.getItem('lastBookingSessionId');
    const psychiatristName = localStorage.getItem('lastBookingPsychiatrist') || 'Your Psychiatrist';
    const sessionDate = localStorage.getItem('lastBookingDate') || new Date().toLocaleDateString();
    const sessionTime = localStorage.getItem('lastBookingTime') || new Date().toLocaleTimeString();
    const amount = localStorage.getItem('lastBookingAmount') || '0';

    setSessionDetails({
      sessionId: sessionId || '',
      psychiatristName,
      sessionDate,
      sessionTime,
      amount
    });

    // Clear booking data from localStorage
    const clearStorage = setTimeout(() => {
      localStorage.removeItem('lastBookingSessionId');
      localStorage.removeItem('lastBookingPsychiatrist');
      localStorage.removeItem('lastBookingDate');
      localStorage.removeItem('lastBookingTime');
      localStorage.removeItem('lastBookingAmount');
    }, 5000);

    return () => clearTimeout(clearStorage);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Your session has been confirmed
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Session Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">Session Details</h3>
            
            <div className="flex items-center space-x-3 text-sm">
              <User className="h-4 w-4 text-teal-600" />
              <span className="text-gray-600">With:</span>
              <span className="font-medium">{sessionDetails.psychiatristName}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{sessionDetails.sessionDate}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <Clock className="h-4 w-4 text-teal-600" />
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{sessionDetails.sessionTime}</span>
            </div>
            
            {sessionDetails.amount !== '0' && (
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-green-600">${sessionDetails.amount}</span>
              </div>
            )}
          </div>

          {/* Confirmation Message */}
          <div className="text-center text-sm text-gray-600">
            <p>A confirmation email has been sent to your registered email address.</p>
            <p className="mt-2">You'll receive a reminder 24 hours before your session.</p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 text-sm mb-2">What's Next?</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Check your email for session details</li>
              <li>• Join the session via the link provided</li>
              <li>• Prepare any questions you'd like to discuss</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/booking">
                Book Another Session
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>Need help? Contact support at</p>
            <p className="font-medium">support@mindbridge.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}