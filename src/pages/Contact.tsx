// src/pages/Contact.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with your backend or email service
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      description: 'Send us an email anytime',
      contact: 'support@mindbridge.com',
      action: 'mailto:support@mindbridge.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'fas fa-comments',
      title: 'Live Chat',
      description: 'Instant messaging support',
      contact: 'Start Chat',
      action: '#chat',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      description: 'Our main office location',
      contact: '123 Wellness St, City, State 12345',
      action: '#map',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I get a response?',
      answer: 'We typically respond within 2 hours during business hours and within 24 hours maximum.'
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'For immediate crisis support, please call our 24/7 crisis line at +1 (555) 987-6543.'
    },
    {
      question: 'Can I schedule an appointment through contact form?',
      answer: 'Yes! Mention your preferred dates and we\'ll help schedule your first session.'
    },
    {
      question: 'Is my information kept confidential?',
      answer: 'Absolutely. All communications are HIPAA compliant and 100% confidential.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-semibold">
              <i className="fas fa-headset mr-2 text-primary"></i>
              24/7 Support Available
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Get In <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help you on your mental health journey. Reach out to us anytime - 
              our compassionate team is ready to listen and support you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${method.icon} text-white text-2xl`}></i>
                  </div>
                  <CardTitle className="text-lg mb-2">{method.title}</CardTitle>
                  <CardDescription className="mb-4">{method.description}</CardDescription>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center text-foreground hover:text-primary"
                    asChild
                  >
                    <a href={method.action}>
                      {method.contact}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Send us a Message</h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  All information is kept strictly confidential.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg text-white font-semibold py-3"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-clock text-primary"></i>
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
                    { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
                    { day: '24/7 Crisis Line', hours: 'Always Available' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="font-medium">{schedule.day}</span>
                      <span className={`font-semibold ${index === 3 ? 'text-red-500' : 'text-foreground'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Card */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-red-900 mb-2">Emergency Support</h3>
                      <p className="text-red-700 mb-3">
                        If you're experiencing a mental health emergency, please call immediately:
                      </p>
                      <Button variant="destructive" className="w-full" asChild>
                        <a href="tel:+15559876543">
                          <i className="fas fa-phone mr-2"></i>
                          +1 (555) 987-6543
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <i className="fas fa-question-circle text-primary"></i>
                    Quick Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-sm">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#faq">
                      View All FAQs
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our main office is located in a peaceful, accessible location designed for your comfort and privacy.
            </p>
          </div>
          
          <Card className="overflow-hidden border-0 shadow-2xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-map-marked-alt text-6xl text-primary mb-4"></i>
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                  </div>
                </div>
                <div className="p-8 bg-card">
                  <h3 className="text-2xl font-bold mb-4">MindBridge Headquarters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-muted-foreground">123 Wellness Street<br />Mental Health District<br />City, State 12345</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="fas fa-clock text-primary mt-1"></i>
                      <div>
                        <p className="font-semibold">Parking</p>
                        <p className="text-muted-foreground">Free parking available in our secure underground garage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="fas fa-wheelchair text-primary mt-1"></i>
                      <div>
                        <p className="font-semibold">Accessibility</p>
                        <p className="text-muted-foreground">Fully wheelchair accessible with ramps and elevators</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Don't wait to get the support you deserve. Contact us today and start your journey to better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
              <a href="tel:+15551234567">
                <i className="fas fa-phone mr-2"></i>
                Call Now
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <a href="#form">
                <i className="fas fa-envelope mr-2"></i>
                Send Message
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;