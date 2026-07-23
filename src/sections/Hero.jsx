import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, ChevronDown } from 'lucide-react';

export default function Hero() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-black noise-overlay"
    >
      
      {/* Background Cinematic Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/35 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_100%)] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80" 
          alt="Cinematic Gold Jewelry Background" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.4]"
        />
      </div>

      {/* Floating Gold Ornaments / Ambient Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Ornament 1 */}
        <motion.div 
          className="absolute top-[25%] left-[8%] w-16 h-16 opacity-30 ornament-float-1"
          style={{ rotate: 15 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-luxury-gold">
            <path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35Z" fill="url(#goldGradient)" />
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FAF6EE" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C620C" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Ornament 2 */}
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-24 h-24 opacity-25 ornament-float-2"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-luxury-gold">
            <circle cx="50" cy="50" r="40" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="5 5" />
            <polygon points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40" fill="url(#goldGradient)" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Ornament 3 */}
        <motion.div 
          className="absolute top-[15%] right-[20%] w-12 h-12 opacity-20 ornament-float-3"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-luxury-gold">
            <circle cx="50" cy="50" r="30" stroke="url(#goldGradient)" strokeWidth="1" />
            <circle cx="50" cy="50" r="15" stroke="url(#goldGradient)" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Small sparkling dots */}
        <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-luxury-gold/60 rounded-full animate-pulse" />
        <div className="absolute top-[65%] left-[15%] w-1 h-1 bg-luxury-gold/40 rounded-full animate-ping" />
        <div className="absolute top-[75%] left-[45%] w-2 h-2 bg-luxury-gold/50 rounded-full animate-pulse" />
        <div className="absolute top-[30%] right-[35%] w-1.5 h-1.5 bg-luxury-gold/60 rounded-full animate-ping" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full pt-16">
        <div className="max-w-3xl">
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-luxury-gold" />
            <span className="text-luxury-gold font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              Purity & Trust Since 2013
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display-serif font-bold text-white leading-tight uppercase"
          >
            Sri Venkata <br />
            <span className="gold-text-shimmer">Sapathigiri</span> <br />
            <span className="text-white">Jewellery</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 font-serif text-base sm:text-lg md:text-xl mt-6 leading-relaxed"
          >
            “Timeless Gold Elegance Crafted for Every Celebration.” Explore our legacy heritage artifacts, certified diamond jewelry, and majestic bridal treasures.
          </motion.p>

          {/* Call To Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 font-sans text-xs"
          >
            <a 
              href="#featured-products" 
              onClick={(e) => handleScroll(e, '#featured-products')}
              className="px-8 py-4 bg-gold-gradient text-luxury-black font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded-sm shadow-lg flex items-center justify-center space-x-2"
            >
              <Compass size={14} />
              <span>Explore Masterpieces</span>
            </a>
            
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, '#contact')}
              className="px-8 py-4 border border-luxury-gold text-luxury-gold font-bold tracking-widest uppercase hover:bg-luxury-gold/10 transition-colors rounded-sm shadow-md flex items-center justify-center space-x-2"
            >
              <MapPin size={14} />
              <span>Visit Our Store</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[9px] text-gray-500 font-sans tracking-[0.25em] uppercase mb-1">
          Scroll Down
        </span>
        <a 
          href="#featured-products" 
          onClick={(e) => handleScroll(e, '#featured-products')}
          className="text-luxury-gold animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={20} />
        </a>
      </div>

    </section>
  );
}
