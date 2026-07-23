import React, { useState } from 'react';
import { TESTIMONIALS } from '../utils/data';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      className="relative py-24 bg-luxury-dark noise-overlay overflow-hidden border-b border-luxury-gold/10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[300px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Words of Trust
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Client Testimonials
          </h2>
        </div>

        {/* Carousel Slider Card */}
        <div className="relative bg-luxury-black/60 backdrop-blur-md border border-luxury-gold/20 rounded-lg p-8 md:p-12 shadow-2xl min-h-[300px] flex flex-col justify-between">
          
          {/* Quote Icon overlay */}
          <Quote className="absolute top-6 left-6 text-luxury-gold/10 w-20 h-20 stroke-1 z-0 pointer-events-none" />

          {/* Testimonial slider body */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                
                {/* Rating Stars */}
                <div className="flex justify-center text-luxury-gold space-x-1">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-luxury-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 font-serif text-base md:text-lg italic text-center leading-relaxed">
                  “ {TESTIMONIALS[activeIndex].text} ”
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center justify-center pt-4">
                  <img 
                    src={TESTIMONIALS[activeIndex].image} 
                    alt={TESTIMONIALS[activeIndex].name} 
                    className="w-14 h-14 rounded-full object-cover border border-luxury-gold/30 mb-2 shadow"
                  />
                  <h4 className="text-white font-display-serif font-bold tracking-wide uppercase text-sm">
                    {TESTIMONIALS[activeIndex].name}
                  </h4>
                  <span className="text-[9px] text-luxury-gold tracking-widest uppercase font-sans font-semibold">
                    {TESTIMONIALS[activeIndex].role}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-luxury-gold/10 z-10">
            {/* Left arrow */}
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center text-gray-400"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-luxury-gold w-4' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right arrow */}
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-luxury-gold/30 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center text-gray-400"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
