import React from 'react';
import { Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Services', href: '#services' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Website Development', href: '#' },
        { name: 'Mobile App Development', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'E-commerce Solutions', href: '#' },
        { name: 'Branding & Identity', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Portfolio', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Privacy Policy', href: '#' }
      ]
    }
  ];
  
  return (
    <footer className="bg-dark-200/60 border-t border-white/5 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-display font-bold gradient-text">NexaBharat</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              NexaBharat is a premier software development company specializing in creating cutting-edge digital solutions for businesses of all sizes.
            </p>
            
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
          
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} NexaBharat. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;