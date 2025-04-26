import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    position: 'CEO, TechStartup India',
    content: 'NexaBharat delivered a website that exceeded our expectations. Their attention to detail and understanding of our business needs was exceptional. The site has significantly improved our online presence and customer engagement.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Priya Sharma',
    position: 'Marketing Director, E-commerce Solutions',
    content: 'Working with NexaBharat on our mobile app was a game-changer for our business. Their team is professional, responsive, and truly cares about delivering quality. The app has streamlined our operations and delighted our customers.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Vikram Singh',
    position: 'Founder, HealthTech Innovations',
    content: 'The e-commerce platform built by NexaBharat transformed our business. Their expertise in UX design and development resulted in a seamless shopping experience for our customers, leading to a 40% increase in online sales within just three months.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Meera Patel',
    position: 'Creative Director, Design Studio',
    content: 'As a design-focused business, we had high expectations for our website redesign. NexaBharat not only met these expectations but exceeded them with their creative approach and technical expertise. The result is a beautiful, functional site that perfectly represents our brand.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    let interval;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  return (
    <section id="testimonials" className="section relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary-500/5 blur-3xl -z-10"></div>
      
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="card bg-dark-200/70 p-8"
          >
            <div className="flex items-center justify-center mb-8">
              <Quote className="w-12 h-12 text-primary-400/30" />
            </div>
            
            <blockquote className="text-xl md:text-2xl text-center mb-8 font-medium text-gray-200">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img 
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-400">{testimonials[currentIndex].position}</p>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-primary-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-dark-200/50 border border-white/5 hover:bg-dark-100/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-dark-200/50 border border-white/5 hover:bg-dark-100/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;