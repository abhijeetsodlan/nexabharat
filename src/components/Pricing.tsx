import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ChevronRight, AlertCircle } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹25,000',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Responsive Website (5 pages)',
      'Basic SEO Setup',
      'Contact Form Integration',
      'Mobile-Friendly Design',
      '2 Rounds of Revisions',
      '1 Month Support'
    ],
    mostPopular: false,
    delay: 0
  },
  {
    name: 'Professional',
    price: '₹65,000',
    description: 'Ideal for growing businesses with specific needs',
    features: [
      'Custom Website (10 pages)',
      'Advanced SEO Optimization',
      'Content Management System',
      'Custom Animations',
      'Logo & Brand Identity',
      'E-commerce Integration',
      '3 Rounds of Revisions',
      '3 Months Support'
    ],
    mostPopular: true,
    delay: 0.1
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'Custom Web Application',
      'Mobile App Development',
      'Advanced Features & Integrations',
      'Comprehensive SEO Strategy',
      'Premium UI/UX Design',
      'Unlimited Revisions',
      'Priority Support',
      '12 Months Maintenance'
    ],
    mostPopular: false,
    delay: 0.2
  }
];

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  return (
    <section id="pricing" className="section relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="section-subtitle">
            Choose the perfect plan for your business needs with our straightforward pricing options.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              mostPopular={plan.mostPopular}
              delay={plan.delay}
              inView={inView}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center bg-dark-200/50 border border-white/5 rounded-xl p-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary-400" />
            <h3 className="text-xl font-bold">Need a custom solution?</h3>
          </div>
          <p className="text-gray-400 mb-6">
            We specialize in building custom digital solutions tailored to your specific business requirements. Contact us for a personalized quote.
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center">
            Get Custom Quote
            <ChevronRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const PricingCard = ({ name, price, description, features, mostPopular, delay, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className={`card relative ${
        mostPopular 
          ? 'border-primary-500/20 bg-gradient-to-b from-dark-200 to-dark-100 shadow-lg shadow-primary-900/10' 
          : ''
      }`}
    >
      {mostPopular && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-medium py-1 px-3 rounded-full">
          Most Popular
        </span>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="flex items-end gap-1 mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-400 pb-1">one-time</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <a href="#contact" className={`btn ${mostPopular ? 'btn-primary' : 'btn-secondary'} w-full justify-center`}>
        Get Started
      </a>
    </motion.div>
  );
};

export default Pricing;