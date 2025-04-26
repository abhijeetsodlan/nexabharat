import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, Phone, MapPin, Send, Check
} from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
      // Clear form after successful submission
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@nexabharat.com',
      link: 'mailto:info@nexabharat.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 123 456 7890',
      link: 'tel:+911234567890'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Bangalore, India',
      link: 'https://maps.google.com'
    }
  ];
  
  const serviceOptions = [
    'Website Development',
    'Mobile App Development',
    'Logo & Branding Design',
    'UI/UX Design',
    'Landing Page',
    'E-commerce Solution',
    'Other',
  ];
  
  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-secondary-500/5 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's discuss how we can help bring your ideas to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card h-full"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Ready to start your next project? Contact us today to discuss your requirements and how we can help your business grow.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    className="flex items-start hover:text-primary-400 transition-colors"
                  >
                    <div className="p-3 rounded-lg bg-primary-500/10 mr-4">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.label}</h4>
                      <p className="text-gray-400">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-10">
                <h4 className="font-bold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="p-2.5 rounded-full bg-dark-100 hover:bg-primary-500/20 transition-colors"
                      aria-label={social}
                    >
                      <span className="w-5 h-5 block bg-white/70"></span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              {formStatus.submitted ? (
                <div className="py-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-primary-400" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-400 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                      className="btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-dark-100 border border-white/10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-dark-100 border border-white/10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-dark-100 border border-white/10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="+91 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-dark-100 border border-white/10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                      >
                        <option value="" disabled>Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-dark-100 border border-white/10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    {formStatus.submitting ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;