import React from 'react';
import { COLLECTIONS } from '../utils/data';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Collections() {
  const { setCategoryFilter } = useApp();

  const handleExplore = (categoryId) => {
    // If it's bridal, scroll to the bridal section, otherwise filter and scroll to featured showcase
    if (categoryId === 'bridal') {
      const el = document.getElementById('bridal-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setCategoryFilter(categoryId);
      const el = document.getElementById('featured-products');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="collections" 
      className="relative py-24 bg-luxury-black noise-overlay"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Royal Categories
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Legacy Collections
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            Delve into our curated categories, each representing a distinct style, weight class, and ceremonial significance.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {COLLECTIONS.map((col) => (
            <motion.div
              key={col.id}
              variants={itemVariants}
              className="group relative h-[380px] overflow-hidden rounded border border-luxury-gold/15 bg-luxury-dark hover:border-luxury-gold/50 transition-all duration-500 shadow-lg gold-shadow-hover"
            >
              
              {/* Image Container */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20 z-10 group-hover:via-luxury-black/30 transition-all duration-500" />
                <img 
                  src={col.image} 
                  alt={col.name} 
                  className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 group-hover:brightness-[0.95] transition-all duration-700 ease-out"
                />
              </div>

              {/* Decorative Gold Filigree Corner Border on Hover */}
              <div className="absolute inset-4 border border-luxury-gold/0 group-hover:border-luxury-gold/25 transition-all duration-500 z-10 pointer-events-none rounded-sm" />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full">
                
                {/* Collection Name */}
                <h3 className="text-white font-display-serif text-xl tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                  {col.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 font-serif text-xs mt-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 leading-relaxed">
                  {col.description}
                </p>

                {/* Explore button CTA */}
                <div className="mt-4 pt-2 border-t border-luxury-gold/0 group-hover:border-luxury-gold/20 transition-all duration-500">
                  <button 
                    onClick={() => handleExplore(col.id)}
                    className="flex items-center space-x-1 text-luxury-gold font-sans text-[10px] tracking-widest uppercase font-semibold"
                  >
                    <span>Explore designs</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
