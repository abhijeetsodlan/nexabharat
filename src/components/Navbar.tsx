import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-300/90 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="container py-4 px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 z-50">
          <Code className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-display font-bold gradient-text">NexaBharat</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary ml-2 py-2">Get Started</a>
        </nav>
        
        <button 
          onClick={() => setIsOpen(true)} 
          className="md:hidden text-gray-300 hover:text-white z-50"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-300/95 z-40 md:hidden"
        >
          <div className="container h-full flex flex-col">
            <div className="flex justify-end py-4 px-4 sm:px-6">
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-300 hover:text-white"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 px-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="btn-primary mt-4 w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;