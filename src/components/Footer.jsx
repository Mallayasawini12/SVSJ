import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.7 15 9.7 9 15 12" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setCategoryFilter, setIsAdminOpen } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCollectionClick = (e, categoryId, targetId = '#featured-products') => {
    e.preventDefault();
    setCategoryFilter(categoryId);
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-luxury-black border-t border-luxury-gold/20 pt-16 pb-8 overflow-hidden noise-overlay">
      
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[150px] bg-radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Legacy Column */}
          <div className="flex flex-col space-y-4">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-2">
              <div className="w-9 h-9 border border-luxury-gold flex items-center justify-center rounded-full">
                <span className="text-luxury-gold font-display-serif font-semibold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-luxury-gold font-display-serif font-bold text-base tracking-wider leading-none">SRI VENKATA</span>
                <span className="text-gray-400 font-sans text-[8px] tracking-[0.25em] font-medium mt-0.5">SAPATHIGIRI JEWELLERY</span>
              </div>
            </a>
            <p className="text-gray-400 font-serif text-sm leading-relaxed">
              Crafting stories of gold, purity, and family legacy since 2013. Sri Venkata Sapathigiri Jewellery represents the zenith of South Indian heritage artistry and bridal magnificence.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://www.instagram.com/newsrivenkata" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-luxury-gold/20 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center text-gray-400" aria-label="Instagram">
                <InstagramIcon size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-luxury-gold/20 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center text-gray-400" aria-label="Facebook">
                <FacebookIcon size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-luxury-gold/20 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center text-gray-400" aria-label="YouTube">
                <YoutubeIcon size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-luxury-gold font-display-serif text-sm tracking-wider uppercase mb-5 border-b border-luxury-gold/10 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans text-xs tracking-wider uppercase">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Home
                </a>
              </li>
              <li>
                <a href="#featured-products-gold" onClick={(e) => handleLinkClick(e, '#featured-products-gold')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Gold Masterpieces
                </a>
              </li>
              <li>
                <a href="#featured-products-silver" onClick={(e) => handleLinkClick(e, '#featured-products-silver')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Silver Collection
                </a>
              </li>
              <li>
                <a href="#bridal-collection" onClick={(e) => handleLinkClick(e, '#bridal-collection')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Bridal Collection
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Contact & Store Locator
                </a>
              </li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="text-luxury-gold font-display-serif text-sm tracking-wider uppercase mb-5 border-b border-luxury-gold/10 pb-2 inline-block">
              Our Collections
            </h4>
            <ul className="space-y-2.5 font-sans text-xs tracking-wider uppercase">
              <li>
                <a href="#bridal-collection" onClick={(e) => handleLinkClick(e, '#bridal-collection')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Bridal Gold Sets
                </a>
              </li>
              <li>
                <a href="#featured-products-gold" onClick={(e) => handleCollectionClick(e, 'necklaces', '#featured-products-gold')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Traditional Kasu Mala
                </a>
              </li>
              <li>
                <a href="#featured-products-gold" onClick={(e) => handleCollectionClick(e, 'earrings', '#featured-products-gold')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  South Indian Jhumkas
                </a>
              </li>
              <li>
                <a href="#featured-products-gold" onClick={(e) => handleCollectionClick(e, 'bangles', '#featured-products-gold')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Kada Bangles & Vanki
                </a>
              </li>
              <li>
                <a href="#featured-products-gold" onClick={(e) => handleCollectionClick(e, 'rings', '#featured-products-gold')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Royal Statement Rings
                </a>
              </li>
              <li>
                <a href="#featured-products-silver" onClick={(e) => handleLinkClick(e, '#featured-products-silver')} className="text-gray-400 hover:text-luxury-gold transition-colors block py-0.5">
                  Silver Articles & Pooja
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-luxury-gold font-display-serif text-sm tracking-wider uppercase border-b border-luxury-gold/10 pb-2 inline-block">
              Royal Newsletter
            </h4>
            <p className="text-gray-400 font-serif text-sm">
              Subscribe to receive exclusive invitations to festival exhibitions, daily gold rate alerts, and early access to preview catalogs.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-gray border border-luxury-gold/30 rounded px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold font-sans tracking-wide"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 px-3 bg-gold-gradient text-luxury-black hover:opacity-90 transition-opacity flex items-center justify-center rounded"
                aria-label="Subscribe"
              >
                <Send size={12} />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-luxury-gold font-sans italic animate-pulse">
                ✓ Royal subscription registered successfully!
              </p>
            )}

            {/* BIS Hallmark badge */}
            <div className="flex items-center space-x-2 pt-2 text-[10px] text-gray-500 font-sans tracking-wider uppercase">
              <ShieldCheck size={14} className="text-luxury-gold" />
              <span>100% BIS 916 Hallmarked Gold</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent my-8" />

        {/* Bottom copyright and legal */}
        <div className="flex flex-col md:flex-row items-center justify-between font-sans text-[10px] tracking-widest text-gray-500">
          <p>© 2026 SRI VENKATA SAPATHIGIRI JEWELLERY. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-4 mt-3 md:mt-0 items-center">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-luxury-gold transition-colors">PRIVACY POLICY</a>
            <span>|</span>
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-luxury-gold transition-colors">TERMS OF SERVICE</a>
            <span>|</span>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-luxury-gold transition-colors">STORE LOCATOR</a>
            <span>|</span>
            <button onClick={() => setIsAdminOpen(true)} className="hover:text-luxury-gold transition-colors uppercase font-bold text-luxury-gold">ADMIN PORTAL</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
