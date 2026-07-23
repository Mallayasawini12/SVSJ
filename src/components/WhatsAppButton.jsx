import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp floating button after scrolling 300px
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show tooltip after 5 seconds of loading
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Namaste, I am visiting your Sri Venkata Sapathigiri Jewellery website and would like to discuss some jewelry designs or check live making charges. Please connect me to a design expert.

నమస్తే, నేను మీ శ్రీ వెంకట సపతిగిరి జ్యువెలరీ వెబ్‌సైట్‌ను చూస్తున్నాను. నాకు కొన్ని నగలు డిజైన్స్ లేదా లైవ్ మేకింగ్ ఛార్జీల గురించి చర్చించాలని ఉంది. దయచేసి డిజైనర్‌తో నన్ను కనెక్ట్ చేయండి.`
    );
    return `https://wa.me/919246668319?text=${text}`;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2"
        >
          {/* Animated Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-luxury-black/95 backdrop-blur-md border border-luxury-gold/30 text-white px-4 py-2 rounded shadow-2xl text-[10px] tracking-wider uppercase font-sans font-semibold max-w-xs whitespace-nowrap"
              >
                <span className="text-luxury-gold">Live Chat:</span> Connect with our Designer
                {/* Arrow */}
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-luxury-black border-r border-t border-luxury-gold/30 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative w-14 h-14 bg-green-500 hover:bg-green-600 transition-colors rounded-full flex items-center justify-center shadow-2xl group"
            aria-label="Contact us on WhatsApp"
          >
            {/* Glowing gold ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-70 scale-100 group-hover:scale-110 group-hover:opacity-100 transition-all animate-ping duration-1000" />
            <div className="absolute -inset-1 rounded-full border border-luxury-gold opacity-50 scale-100 group-hover:scale-105 transition-all" />

            <MessageCircle size={28} className="text-white fill-current" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
