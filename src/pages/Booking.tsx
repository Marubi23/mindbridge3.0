import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, User, Star, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock psychiatrists data - replace with actual API call
const mockPsychiatrists = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    experience: '8 years',
    rating: 4.9,
    reviews: 127,
    price: 120,
    image: '/api/placeholder/100/100',
    availableSlots: ['09:00', '11:00', '14:00', '16:00']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Trauma & PTSD',
    experience: '12 years',
    rating: 4.8,
    reviews: 89,
    price: 150,
    image: '/api/placeholder/100/100',
    availableSlots: ['10:00', '13:00', '15:00', '17:00']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Relationship Counseling',
    experience: '6 years',
    rating: 4.7,
    reviews: 64,
    price: 110,
    image: '/api/placeholder/100/100',
    availableSlots: ['08:00', '12:00', '14:00', '16:00']
  }
];

export function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('individual');
  const [concerns, setConcerns] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Select professional, 2: Schedule, 3: Confirm

  const selectedPsychiatristData = mockPsychiatrists.find(p => p.id === selectedPsychiatrist);

  const handleBooking = async () => {
    if (!selectedPsychiatrist || !selectedDate || !selectedTime) {
      alert('Please complete all booking details');
      return;
    }

    setIsProcessing(true);

    try {
      // Store booking data for payment success page
      localStorage.setItem('lastBookingSessionId', `session_${Date.now()}`);
      localStorage.setItem('lastBookingPsychiatrist', selectedPsychiatristData?.name || '');
      localStorage.setItem('lastBookingDate', selectedDate.toLocaleDateString());
      localStorage.setItem('lastBookingTime', selectedTime);
      localStorage.setItem('lastBookingAmount', selectedPsychiatristData?.price.toString() || '0');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to payment success
      navigate('/payment/success');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const availableTimeSlots = selectedPsychiatristData?.availableSlots || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Session</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right mental health professional and schedule your session
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full font-semibold",
                  step >= stepNumber 
                    ? "bg-teal-600 text-white" 
                    : "bg-gray-300 text-gray-600"
                )}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={cn(
                    "w-16 h-1",
                    step > stepNumber ? "bg-teal-600" : "bg-gray-300"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Select a Professional
                  </CardTitle>
                  <CardDescription>
                    Choose from our qualified mental health professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPsychiatrists.map((psychiatrist) => (
                    <div
                      key={psychiatrist.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                        selectedPsychiatrist === psychiatrist.id 
                          ? "border-teal-500 bg-teal-50" 
                          : "border-gray-200"
                      )}
                      onClick={() => setSelectedPsychiatrist(psychiatrist.id)}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={psychiatrist.image}
                          alt={psychiatrist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{psychiatrist.name}</h3>
                              <p className="text-gray-600">{psychiatrist.specialty}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-teal-600">${psychiatrist.price}</p>
                              <p className="text-sm text-gray-500">per session</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{psychiatrist.rating}</span>
                              <span>({psychiatrist.reviews} reviews)</span>
                            </div>
                            <div>•</div>
                            <div>{psychiatrist.experience} experience</div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>Remote Sessions Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!selectedPsychiatrist}
                    className="w-full mt-6"
                  >
                    Continue to Scheduling
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Schedule Your Session
                  </CardTitle>
                  <CardDescription>
                    Choose a date and time for your session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-3">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-3">
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {availableTimeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="flex items-center gap-2"
                        >
                          <Clock className="h-4 w-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Session Type */}
                  <div className="space-y-3">
                    <Label>Session Type</Label>
                    <Select value={sessionType} onValueChange={setSessionType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Session (50 min)</SelectItem>
                        <SelectItem value="couples">Couples Therapy (75 min)</SelectItem>
                        <SelectItem value="family">Family Therapy (90 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Concerns */}
                  <div className="space-y-3">
                    <Label>What would you like to discuss? (Optional)</Label>
                    <Textarea
                      placeholder="Briefly describe what you'd like to focus on in your session..."
                      value={concerns}
                      onChange={(e) => setConcerns(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1"
                    >
                      Continue to Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                  <CardDescription>
                    Please review your session details before confirming
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Session Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-lg">Session Summary</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Professional:</span>
                        <p className="font-medium">{selectedPsychiatristData?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium">
                          {selectedDate ? format(selectedDate, "PPP") : 'Not selected'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <p className="font-medium">{selectedTime || 'Not selected'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Session Type:</span>
                        <p className="font-medium capitalize">{sessionType}</p>
                      </div>
                    </div>

                    {concerns && (
                      <div>
                        <span className="text-gray-600">Discussion Points:</span>
                        <p className="font-medium mt-1">{concerns}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3">Payment Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Session Fee</span>
                        <span>${selectedPsychiatristData?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Platform Fee</span>
                        <span>$0</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${selectedPsychiatristData?.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleBooking}
                      disabled={isProcessing}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                    >
                      {isProcessing ? 'Processing...' : 'Confirm & Pay'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="space-y-6">
            {selectedPsychiatristData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Professional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPsychiatristData.image}
                      alt={selectedPsychiatristData.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{selectedPsychiatristData.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPsychiatristData.specialty}</p>
                    </div>
                  </div>
                  
                  {selectedDate && selectedTime && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {format(selectedDate, "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">50 minutes</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Support Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Our support team is here to help you find the right professional.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}