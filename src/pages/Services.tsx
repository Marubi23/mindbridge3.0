// src/pages/Services.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-video',
      title: 'Virtual Therapy Sessions',
      description: 'One-on-one video sessions with licensed psychiatrists from the comfort of your home.',
      features: ['50-minute sessions', 'Secure video platform', 'Flexible scheduling', 'HIPAA compliant'],
      price: '$120',
      popular: true,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'fas fa-users',
      title: 'Group Therapy',
      description: 'Join supportive group sessions with individuals facing similar challenges.',
      features: ['Weekly sessions', 'Small groups (6-8 people)', 'Professional facilitation', 'Peer support'],
      price: '$60',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Psychiatric Evaluation',
      description: 'Comprehensive assessment and diagnosis by board-certified psychiatrists.',
      features: ['90-minute evaluation', 'Detailed treatment plan', 'Medication management', 'Follow-up care'],
      price: '$250',
      popular: false,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: '24/7 Crisis Support',
      description: 'Immediate support for urgent mental health concerns anytime, anywhere.',
      features: ['24/7 availability', 'Crisis intervention', 'Emergency resources', 'Quick response'],
      price: '$180',
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: 'fas fa-heart',
      title: 'Couples Counseling',
      description: 'Strengthen your relationship with professional couples therapy sessions.',
      features: ['75-minute sessions', 'Both partners included', 'Communication skills', 'Conflict resolution'],
      price: '$150',
      popular: true,
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Corporate Wellness',
      description: 'Mental health programs designed for organizations and their employees.',
      features: ['Team workshops', 'Manager training', 'Employee assistance', 'Wellness programs'],
      price: 'Custom',
      popular: false,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '95%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
    { number: '50+', label: 'Licensed Experts' },
    { number: '10k+', label: 'Sessions Completed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-semibold">
              <i className="fas fa-star mr-2 text-yellow-500"></i>
              Trusted by Thousands
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Transform Your Mental
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Health Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our comprehensive range of mental health services designed to support you 
              at every step of your wellness journey. Professional care, personalized for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-all">
                <Link to="/booking">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Book Your Session
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  <i className="fas fa-phone-alt mr-2"></i>
                  Speak to Advisor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold bg-gradient-to-r ${index === 0 ? 'from-green-500 to-emerald-500' : index === 1 ? 'from-blue-500 to-cyan-500' : index === 2 ? 'from-purple-500 to-pink-500' : 'from-orange-500 to-red-500'} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully designed services to find the perfect support for your mental health needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  service.popular ? 'border-primary shadow-lg' : 'border-border'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-primary to-secondary">
                      <i className="fas fa-crown mr-1"></i>
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4`}>
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-lg">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <i className="fas fa-check-circle text-green-500 mr-3"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold text-foreground">
                      {service.price}
                      {service.price !== 'Custom' && <span className="text-sm text-muted-foreground font-normal">/session</span>}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      service.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                    asChild
                  >
                    <Link to="/booking">
                      {service.popular ? 'Get Started' : 'Learn More'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take the first step towards better mental health. Our team of experts is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/booking">
                <i className="fas fa-rocket mr-2"></i>
                Book Free Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                <i className="fas fa-question-circle mr-2"></i>
                Ask Questions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Confidential</h3>
              <p className="text-muted-foreground">Your privacy is our priority. All sessions are HIPAA compliant and completely confidential.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-3xl text-secondary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-muted-foreground">Book sessions that fit your schedule with our 24/7 availability and easy rescheduling.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-md text-3xl text-accent"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Care</h3>
              <p className="text-muted-foreground">All our psychiatrists are licensed, experienced, and dedicated to your mental wellness.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;