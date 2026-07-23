import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Gem } from 'lucide-react';

const BRIDAL_SLIDES = [
  {
    id: 1,
    title: 'The Royal Madurai Heritage Set (Heavy)',
    description: 'A majestic 22K antique gold set featuring an ultra-heavy Nakshi choker, a long Kasu Haram (coin necklace), a solid gold Heritage Vanki (armlet), and an elaborate Nakshi waist belt (Oddiyanam) depicting heritage deities. Hand-sculpted by heritage artisans.',
    gems: 'Kundan, Burmese Rubies, Basra Pearls',
    weight: 'Approx. 320g',
    image: '/heavy_heritage_set.png',
  },
  {
    id: 2,
    title: 'The Nizam Queen Kundan Collection',
    description: 'Inspired by royal Deccan courts, this bridal set carries an expansive flat-cut Kundan choker, layered emerald bead harams, and matching Chandbali earrings, radiating absolute sovereignty.',
    gems: 'Uncut Diamonds (Polki), Emerald Beads, Pearls',
    weight: 'Approx. 210g',
    image: '/nizam_kundan_set.png',
  },
  {
    id: 3,
    title: 'The Divine Lakshmi Nakshi Haram (Heavy)',
    description: 'A signature heavy heritage masterpiece. Handcrafted long heritage necklace featuring 3D gold relief sculptures of Goddess Lakshmi seated on a golden throne, surrounded by peacocks and floral creepers.',
    gems: 'Cabochon Rubies, Zambian Emeralds',
    weight: 'Approx. 195g',
    image: '/lakshmi_nakshi_set.png',
  },
  {
    id: 4,
    title: 'The Swarna Maharaja Grand Bridal Trousseau (Ultra-Heavy)',
    description: 'The ultimate heavy South Indian wedding masterpiece. Features a 7-layered Royal Haram, Nakshi waist belt (Oddiyanam), heavy peacock-motif Vanki (armlet), double-layer chandelier Jhumkas, and matching gold braid-decorations (Jada Billalu) in pure 22K gold.',
    gems: 'Uncut Burmese Rubies, Emerald Cabochons, Basra Pearls',
    weight: 'Approx. 480g',
    image: '/maharaja_heavy_set.png',
  }
];

export default function BridalCollection() {
  const getWhatsAppBridalLink = () => {
    const text = encodeURIComponent(
      `Namaste, I am interested in checking bridal designs for "${BRIDAL_SLIDES[currentSlide].title}". Please connect me to a bridal designer.

నమస్తే, నేను మీ బ్రైడల్ డిజైన్ "${BRIDAL_SLIDES[currentSlide].title}" చూడాలని అనుకుంటున్నాను. దయచేసి నన్ను బ్రైడల్ డిజైనర్‌తో కనెక్ట్ చేయండి.`
    );
    return `https://wa.me/919246668319?text=${text}`;
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideNext = () => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % BRIDAL_SLIDES.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentSlide(prev => (prev === 0 ? BRIDAL_SLIDES.length - 1 : prev - 1));
  };

  // Framer Motion Slide transition configurations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      id="bridal-collection" 
      className="relative py-24 bg-luxury-black overflow-hidden noise-overlay border-t border-luxury-gold/10"
    >
      
      {/* Royal Background Grid and Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Ceremonial Splendor
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Bridal Gold Collections
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            “Celebrate Weddings with Timeless Elegance.” Unveil the finest bridal adornments, custom-designed to make your auspicious day truly unforgettable.
          </p>
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative bg-luxury-dark border border-luxury-gold/20 rounded-lg overflow-hidden shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10 min-h-[500px]">
          
          {/* Gold Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-luxury-gold pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-luxury-gold pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-luxury-gold pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-luxury-gold pointer-events-none" />

          {/* Left Panel: Animated Image Slider */}
          <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded overflow-hidden border border-luxury-gold/15 shadow-inner">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img 
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={BRIDAL_SLIDES[currentSlide].image} 
                alt={BRIDAL_SLIDES[currentSlide].title} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Slider Navigation Chevrons inside Image Container */}
            <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
              <button 
                onClick={slidePrev}
                className="w-9 h-9 rounded-full bg-luxury-black/75 hover:bg-luxury-gold hover:text-luxury-black text-luxury-gold transition-colors flex items-center justify-center border border-luxury-gold/30"
                aria-label="Previous bridal set"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={slideNext}
                className="w-9 h-9 rounded-full bg-luxury-black/75 hover:bg-luxury-gold hover:text-luxury-black text-luxury-gold transition-colors flex items-center justify-center border border-luxury-gold/30"
                aria-label="Next bridal set"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="absolute bottom-3 right-3 bg-luxury-black/80 px-2 py-0.5 rounded text-[9px] text-gray-400 font-sans">
              Slide {currentSlide + 1} of {BRIDAL_SLIDES.length}
            </div>
          </div>

          {/* Right Panel: Content Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
            
            {/* Title with sparkles */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-luxury-gold">
                <Sparkles size={14} />
                <span className="text-[10px] tracking-[0.2em] font-sans font-bold uppercase">Bridal Masterwork</span>
              </div>
              <h3 className="text-white font-display-serif text-2xl md:text-3xl tracking-wide uppercase leading-tight">
                {BRIDAL_SLIDES[currentSlide].title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-300 font-serif text-sm leading-relaxed">
              {BRIDAL_SLIDES[currentSlide].description}
            </p>

            {/* Specs Table */}
            <div className="border-t border-b border-luxury-gold/15 py-4 space-y-2 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase tracking-wider text-[9px]">Gems Encrusted</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <Gem size={10} className="text-luxury-gold" />
                  {BRIDAL_SLIDES[currentSlide].gems}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase tracking-wider text-[9px]">Approximate Weight</span>
                <span className="text-luxury-gold font-bold">{BRIDAL_SLIDES[currentSlide].weight}</span>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <a 
                href={getWhatsAppBridalLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gold-gradient text-luxury-black font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded-sm shadow-md flex items-center justify-center space-x-2 font-sans text-xs"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="mr-1"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Inquire via WhatsApp</span>
              </a>
              <p className="text-[10px] text-gray-500 font-sans mt-3 text-center sm:text-left">
                *Customizations available. Inquire to request video preview or catalog modification.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
