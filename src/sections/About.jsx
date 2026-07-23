import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Award, Gem, Heart } from 'lucide-react';

// Counter component for animated numbers
const Counter = ({ value, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="text-luxury-gold font-display-serif text-3xl md:text-4xl font-bold">
      {count}{suffix}
    </span>
  );
};

export default function About() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-24 bg-luxury-dark border-t border-b border-luxury-gold/10 overflow-hidden noise-overlay"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-radial-glow opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Our Legacy
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Trust & Heritage
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            For nearly three decades, we have been shaping timeless traditional jewelry, preserving legacy South Indian heritage artistry while embracing modern sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Legacy Details */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
            className="space-y-6"
          >
            <h3 className="text-white font-display-serif text-2xl tracking-wide">
              The Golden Story of <br />
              <span className="text-luxury-gold">Sri Venkata Sapathigiri Jewellery</span>
            </h3>
            
            <p className="text-gray-300 font-serif text-sm leading-relaxed">
              Established in 2013 in the heart of South India, Sri Venkata Sapathigiri Jewellery was founded with a single guiding philosophy: to deliver gold of absolute purity and designs that tell a story.
            </p>
            
            <p className="text-gray-400 font-serif text-sm leading-relaxed">
              Our master karigars (artisans) spend hundreds of hours sculpting every single ornament. From the intricate carvings of deities in heritage jewelry to the precise placement of certified diamonds in bridal chokers, we strive for flawless perfection in every gram.
            </p>

            {/* Certifications Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3 p-3 bg-luxury-black/40 border border-luxury-gold/15 rounded">
                <ShieldCheck className="text-luxury-gold flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-sans text-xs tracking-wider uppercase font-semibold">100% BIS 916 Hallmarked</h4>
                  <p className="text-gray-500 font-serif text-[11px] mt-1">Every gold article carries the official Government hallmark certifying 91.6% pure gold.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-luxury-black/40 border border-luxury-gold/15 rounded">
                <Award className="text-luxury-gold flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-white font-sans text-xs tracking-wider uppercase font-semibold">Certified Diamonds</h4>
                  <p className="text-gray-500 font-serif text-[11px] mt-1">Every diamond comes with official IGI/GIA certifications confirming clarity, color, and cut.</p>
                </div>
              </div>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-luxury-gold/10">
              <div className="text-center sm:text-left">
                <p className="block"><Counter value="28" suffix="+" /></p>
                <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase mt-1 block">Years of Trust</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="block"><Counter value="50" suffix="K+" /></p>
                <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase mt-1 block">Happy Clients</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="block"><Counter value="10" suffix="K+" /></p>
                <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase mt-1 block">Exquisite Designs</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="block"><Counter value="100" suffix="%" /></p>
                <span className="text-[10px] text-gray-500 font-sans tracking-widest uppercase mt-1 block">Certified Purity</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Luxury Image Grid Collage */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative group overflow-hidden border border-luxury-gold/20 rounded shadow-md">
                <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-transparent transition-all z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80" 
                  alt="Heritage bridal model" 
                  className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="relative group overflow-hidden border border-luxury-gold/20 rounded shadow-md">
                <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-transparent transition-all z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80" 
                  alt="Artisan gold crafting" 
                  className="w-full h-[150px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative group overflow-hidden border border-luxury-gold/20 rounded shadow-md">
                <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-transparent transition-all z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" 
                  alt="Jewelry design template" 
                  className="w-full h-[150px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="relative group overflow-hidden border border-luxury-gold/20 rounded shadow-md">
                <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-transparent transition-all z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" 
                  alt="Purity verification" 
                  className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
