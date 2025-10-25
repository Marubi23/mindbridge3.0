import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Chatbot } from './components/Chatbot';
import { Layout } from './components/Layout'; // Import Layout
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { ClientDashboard } from './pages/ClientDashboard';
import { PsychiatristDashboard } from './pages/PsychiatristDashboard';
import { Booking } from './pages/Booking';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { ProtectedRoute } from './components/auth/ProtectedRoutes';
import Hero from './components/Hero';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <Layout> {/* Wrap everything with Layout */}
      <Routes>
        <Route path="/landing" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Hero />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/services" element={user ? <Navigate to="/services" /> : <Services />} />
         <Route path="/about" element={user ? <Navigate to="/about" /> : <About />} />
        <Route path="/register" element={user ? <Navigate to="/register" /> : <Register />} />
        <Route path="/contacts" element={user ? <Navigate to="/contacts" /> : <Contact />} />
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {profile?.role === 'client' ? <ClientDashboard /> : <PsychiatristDashboard />}
            </ProtectedRoute>
          }
        />
        
        {/* Add a catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Global Components */}
      <AccessibilityPanel />
      <Chatbot />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;