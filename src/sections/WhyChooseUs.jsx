import React from 'react';
import { ShieldAlert, Receipt, PenTool, HeartHandshake, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <ShieldAlert className="text-luxury-gold stroke-1.5" size={28} />,
    title: 'BIS 916 Hallmark Purity',
    description: 'Every grain of gold carries the Government of India BIS engraving certifying 91.6% purity. Check Hallmark details in-store with our digital laser analyzers.'
  },
  {
    icon: <Receipt className="text-luxury-gold stroke-1.5" size={28} />,
    title: 'Honest Making Charges',
    description: 'Zero hidden margins. Our making and wastage charges are among the most reasonable in South India, starting at just 8% making fee.'
  },
  {
    icon: <PenTool className="text-luxury-gold stroke-1.5" size={28} />,
    title: 'Custom Jewelry Design',
    description: 'Bring your bridal sketches or dream design. Our senior karigars and 3D CAD modeling specialists will sculpt it to absolute perfection.'
  },
  {
    icon: <HeartHandshake className="text-luxury-gold stroke-1.5" size={28} />,
    title: 'Trusted Old Gold Exchange',
    description: 'Get 100% value exchange on your old gold ornaments. Transparency in melting and purity checks in high-tech carat-meters.'
  },
  {
    icon: <Eye className="text-luxury-gold stroke-1.5" size={28} />,
    title: 'Heritage & Modern Blend',
    description: 'We house everything from hefty, classic heritage harams telling ancient mythologies, to ultra-lightweight contemporary gold and platinum bands.'
  }
];

export default function WhyChooseUs() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      className="relative py-24 bg-luxury-black noise-overlay border-t border-b border-luxury-gold/10 overflow-hidden"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Our Promise
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Why Choose Us
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            Crafting gold is a sacred art of trust. At Sri Venkata Sapathigiri, we prioritize transparency and purity above all else.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-luxury-dark border border-luxury-gold/10 hover:border-luxury-gold/45 rounded p-6 shadow-md hover:shadow-2xl transition-all duration-400 group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-black mb-5 group-hover:bg-luxury-gold/5 transition-all">
                {feat.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-display-serif text-lg tracking-wide uppercase group-hover:text-luxury-gold transition-colors duration-300">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 font-serif text-xs mt-3 leading-relaxed">
                {feat.description}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
