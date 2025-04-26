import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, Smartphone, Palette, Figma, Layout, ShoppingCart
} from 'lucide-react';

const serviceItems = [
  {
    title: 'Website Development',
    description: 'Custom websites built with the latest technologies for optimal performance and user experience.',
    icon: Globe,
    delay: 0
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications designed for iOS and Android devices.',
    icon: Smartphone,
    delay: 0.1
  },
  {
    title: 'Logo & Branding Design',
    description: 'Create a distinctive brand identity with our professional logo and branding services.',
    icon: Palette,
    delay: 0.2
  },
  {
    title: 'Figma UI/UX Designs',
    description: 'User-centric interface designs that enhance user experience and drive engagement.',
    icon: Figma,
    delay: 0.3
  },
  {
    title: 'Landing Page Creation',
    description: 'High-converting landing pages designed to increase conversions and generate leads.',
    icon: Layout,
    delay: 0.4
  },
  {
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce websites and mobile apps with secure payment processing.',
    icon: ShoppingCart,
    delay: 0.5
  }
];

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <section id="services" className="section relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary-500/5 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            We offer a comprehensive range of digital solutions to help your business thrive in the digital landscape.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {serviceItems.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              Icon={service.icon}
              delay={service.delay}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, description, Icon, delay, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="card group hover:bg-gradient-to-b hover:from-dark-200 hover:to-dark-100 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-900/5"
    >
      <div className="p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg bg-primary-500/10 w-fit group-hover:bg-primary-500/20 transition-colors">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Services;