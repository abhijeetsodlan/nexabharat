import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 pb-12 px-4 sm:px-6 sm:pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-300 via-dark-200 to-dark-100 opacity-70"></div>
      
      {/* Animated gradient orb */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl animate-gradient-xy"></div>
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary-500/20 to-primary-500/20 blur-3xl animate-gradient-xy"></div>
      
      <div className="container relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item} className="flex justify-center mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20">
              <Code size={14} className="mr-1" /> Innovative Software Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight"
          >
            Transforming Ideas Into <span className="gradient-text">Digital Reality</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto"
          >
            We craft exceptional digital experiences with cutting-edge technology and innovative design solutions tailored to your business needs.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="#contact" className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto text-base">
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="btn-secondary w-full sm:w-auto text-base">Explore Services</a>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="mt-12 sm:mt-20 grid grid-cols-2 gap-3 sm:gap-8"
          >
            {[
              { number: '50+', text: 'Projects Completed' },
              { number: '30+', text: 'Happy Clients' },
              { number: '5+', text: 'Years Experience' },
              { number: '100%', text: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="p-3 sm:p-6 rounded-lg bg-dark-200/30 backdrop-blur-sm border border-white/5">
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.number}</h3>
                <p className="text-xs sm:text-base text-gray-400">{stat.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-primary-500 to-transparent relative">
            <motion.div 
              animate={{ 
                y: [0, 20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5 
              }}
              className="absolute w-1.5 h-1.5 bg-primary-400 rounded-full -left-[2px]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;