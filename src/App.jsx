import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import FeaturedProducts from './sections/FeaturedProducts';
import BridalCollection from './sections/BridalCollection';
import WhyChooseUs from './sections/WhyChooseUs';
import SocialFeed from './sections/SocialFeed';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './components/AdminPanel';
import AIChatbot from './components/AIChatbot';
import { motion, AnimatePresence } from 'framer-motion';

// Page pre-loading spinner component
function PageLoader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 bg-luxury-black z-[200] flex flex-col items-center justify-center font-sans"
    >
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        {/* Rotating gold border ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="absolute inset-0 border-t-2 border-b-2 border-luxury-gold/50 rounded-full"
        />
        
        {/* Shimmering S character */}
        <span className="text-luxury-gold font-display-serif text-4xl font-bold tracking-widest animate-pulse">S</span>
      </div>

      <div className="flex flex-col items-center text-center space-y-1">
        <h2 className="text-luxury-gold font-display-serif text-base tracking-[0.3em] font-bold uppercase leading-none">
          SRI VENKATA
        </h2>
        <span className="text-gray-500 text-[9px] tracking-[0.25em] font-medium uppercase block">
          SAPATHIGIRI JEWELLERY
        </span>
      </div>

      <div className="absolute bottom-10 w-full text-center text-gray-600 text-[10px] tracking-widest">
        <span>PURITY & TRUST SINCE 2013</span>
      </div>
    </motion.div>
  );
}

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate luxury page loading sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <PageLoader />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen flex flex-col overflow-x-hidden"
        >
          {/* Sticky responsive Header */}
          <Navbar />

          {/* Core Sections */}
          <main className="flex-1">
            <Hero />
            <FeaturedProducts />
            <BridalCollection />
            <WhyChooseUs />
            <SocialFeed />
            <Contact />
          </main>

          {/* Footer details */}
          <Footer />

          {/* Overlays */}
          <QuickViewModal />
          <WhatsAppButton />
          <AdminPanel />
          <AIChatbot />
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
