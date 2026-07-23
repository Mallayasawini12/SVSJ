import React from 'react';
import { Phone, MapPin, Clock, Smartphone } from 'lucide-react';

export default function Contact() {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Namaste, I would like to check ornament availability and live gold pricing details.

నమస్తే, నేను నగలు లభ్యత మరియు లైవ్ బంగారం ధరల వివరాలను తెలుసుకోవాలనుకుంటున్నాను.`
    );
    return `https://wa.me/919246668319?text=${text}`;
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 bg-luxury-dark border-t border-luxury-gold/10 noise-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Store Locator & Assistance
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Contact Our Store
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            Visit our flagship heritage showroom in South India or connect with us directly via phone or WhatsApp to check ornament availability and live gold pricing details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            
            {/* Address */}
            <div className="bg-luxury-black border border-luxury-gold/15 rounded p-5 flex flex-col justify-between">
              <div className="flex space-x-3">
                <MapPin className="text-luxury-gold flex-shrink-0" size={18} />
                <div>
                  <h4 className="text-white uppercase font-bold tracking-wider mb-2">Showroom Address</h4>
                  <p className="text-gray-400 font-serif leading-relaxed">
                    Sri Venkata Sapthagiri Jewellers,<br />
                    Opposite Fish Market, Pappula Veedhi,<br />
                    Anakapalle, Andhra Pradesh - 531001
                  </p>
                </div>
              </div>
            </div>

            {/* Contact numbers */}
            <div className="bg-luxury-black border border-luxury-gold/15 rounded p-5 flex flex-col justify-between">
              <div className="flex space-x-3">
                <Phone className="text-luxury-gold flex-shrink-0" size={18} />
                <div>
                  <h4 className="text-white uppercase font-bold tracking-wider mb-2">Customer Helpline</h4>
                  <p className="text-gray-400 font-serif leading-relaxed">
                    Helpline / Mobile: +91 92466 68319<br />
                    Email: mallayasaswini7@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-luxury-black border border-luxury-gold/15 rounded p-5 flex flex-col justify-between">
              <div className="flex space-x-3">
                <Clock className="text-luxury-gold flex-shrink-0" size={18} />
                <div>
                  <h4 className="text-white uppercase font-bold tracking-wider mb-2">Business Hours</h4>
                  <p className="text-gray-400 font-serif leading-relaxed">
                    Monday - Saturday:<br />
                    09:00 AM - 09:00 PM<br />
                    Sunday: 09:00 AM - 01:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-luxury-black border border-luxury-gold/15 rounded p-5 flex flex-col justify-between">
              <div className="flex space-x-3 mb-4">
                <Smartphone className="text-luxury-gold flex-shrink-0" size={18} />
                <div>
                  <h4 className="text-white uppercase font-bold tracking-wider mb-2">Direct Chat</h4>
                  <p className="text-gray-400 font-serif leading-relaxed">Quick support via WhatsApp chat</p>
                </div>
              </div>
              <div>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full inline-flex items-center justify-center py-2.5 bg-green-500 hover:bg-green-600 transition-colors text-white font-sans font-bold text-[10px] tracking-wider rounded uppercase"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Map Simulation */}
          <div className="relative min-h-[300px] rounded border border-luxury-gold/20 overflow-hidden shadow-inner bg-luxury-black flex flex-col justify-center">
            {/* Luxury dark map placeholder */}
            <div className="absolute inset-0 bg-luxury-black flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="text-luxury-gold animate-bounce mb-3" size={32} />
              <h4 className="text-white font-serif font-bold text-sm">Sri Venkata Sapthagiri Jewellers</h4>
              <p className="text-gray-500 text-xs mt-1">Anakapalle, Andhra Pradesh, India</p>
              
              {/* Mock Map frame simulation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-8">
                <a 
                  href="https://share.google/uhJfr7hnEEOJSaohL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-luxury-gold text-luxury-gold font-sans font-bold text-[10px] tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-black transition-colors rounded"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

