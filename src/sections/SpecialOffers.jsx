import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, Calendar, Sparkles, Percent, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Countdown Timer Helper
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center font-sans">
      <div className="bg-luxury-black/80 border border-luxury-gold/25 p-2 rounded w-14 sm:w-16">
        <span className="text-luxury-gold font-bold text-base sm:text-lg block leading-none">{timeLeft.days}</span>
        <span className="text-[8px] text-gray-500 uppercase tracking-widest block mt-1">Days</span>
      </div>
      <div className="bg-luxury-black/80 border border-luxury-gold/25 p-2 rounded w-14 sm:w-16">
        <span className="text-luxury-gold font-bold text-base sm:text-lg block leading-none">{timeLeft.hours}</span>
        <span className="text-[8px] text-gray-500 uppercase tracking-widest block mt-1">Hrs</span>
      </div>
      <div className="bg-luxury-black/80 border border-luxury-gold/25 p-2 rounded w-14 sm:w-16">
        <span className="text-luxury-gold font-bold text-base sm:text-lg block leading-none">{timeLeft.minutes}</span>
        <span className="text-[8px] text-gray-500 uppercase tracking-widest block mt-1">Min</span>
      </div>
      <div className="bg-luxury-black/80 border border-luxury-gold/25 p-2 rounded w-14 sm:w-16">
        <span className="text-luxury-gold font-bold text-base sm:text-lg block leading-none animate-pulse">{timeLeft.seconds}</span>
        <span className="text-[8px] text-gray-500 uppercase tracking-widest block mt-1">Sec</span>
      </div>
    </div>
  );
};

export default function SpecialOffers() {
  const getWhatsAppOfferLink = () => {
    const text = encodeURIComponent(
      `Namaste, I would like to pre-book the Shravana Masa Bridal Gold Offer (Flat 25% Off on Making Charges). Please connect me to the sales team.

నమస్తే, నేను శ్రావణ మాస బ్రైడల్ గోల్డ్ ఆఫర్ (మేకింగ్ ఛార్జీలపై 25% తగ్గింపు) ప్రీ-బుక్ చేయాలనుకుంటున్నాను. దయచేసి నన్ను సేల్స్ టీమ్‌తో కనెక్ట్ చేయండి.`
    );
    return `https://wa.me/919246668319?text=${text}`;
  };

  const getWhatsAppSchemeLink = () => {
    const text = encodeURIComponent(
      `Namaste, I am interested in enrolling in the Swarna Sapathigiri Gold Purchase Scheme. Please share details and the online signup form.

నమస్తే, నాకు స్వర్ణ సపతిగిరి గోల్డ్ పర్చేజ్ స్కీమ్‌లో చేరడానికి ఆసక్తి ఉంది. దయచేసి దీని వివరాలు మరియు ఆన్‌లైన్ సైన్అప్ ఫారమ్‌ను పంపండి.`
    );
    return `https://wa.me/919246668319?text=${text}`;
  };

  // Set target date for 15 days in the future
  const [targetDateStr, setTargetDateStr] = useState('');
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    setTargetDateStr(d.toISOString());
  }, []);

  return (
    <section 
      className="relative py-24 bg-luxury-dark noise-overlay border-b border-luxury-gold/10 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Exclusive Deals
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Special Offers & Schemes
          </h2>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Offer 1: Wedding Special */}
          <div className="bg-luxury-black border border-luxury-gold/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden group">
            
            {/* Shimmer background */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-gradient" />

            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2 text-luxury-gold">
                <Gift size={16} />
                <span className="text-[9px] font-sans tracking-widest uppercase font-bold">Auspicious Wedding Special</span>
              </div>
              
              <h3 className="text-white font-display-serif text-xl sm:text-2xl uppercase tracking-wide leading-tight">
                Shravana Masa <br />
                <span className="text-luxury-gold">Bridal Gold Discount</span>
              </h3>
              
              <p className="text-gray-400 font-serif text-xs leading-relaxed">
                Enjoy **Flat 25% Off on Making Charges** for all bridal harams and heritage jewelry sets, plus zero wastage on certified diamond jewelry.
              </p>

              {/* Countdown */}
              <div className="py-2">
                <span className="text-[9px] text-gray-500 font-sans tracking-wider uppercase block mb-2">Offer expires in:</span>
                {targetDateStr && <CountdownTimer targetDate={targetDateStr} />}
              </div>

              <div className="pt-2">
                <a 
                  href={getWhatsAppOfferLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gold-gradient text-luxury-black font-sans text-[10px] tracking-widest uppercase font-bold hover:opacity-90 transition-opacity rounded-sm flex items-center space-x-1.5 inline-flex"
                >
                  <Gift size={12} className="mr-1.5" />
                  <span>Pre-Book Offer Slot</span>
                </a>
              </div>
            </div>

            {/* Right graphic */}
            <div className="w-32 h-32 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-dark relative flex-shrink-0">
              <div className="absolute inset-2 rounded-full border border-luxury-gold/5 flex items-center justify-center flex-col text-center">
                <Percent className="text-luxury-gold animate-bounce" size={24} />
                <span className="text-white font-serif text-xs font-bold mt-1">25% OFF</span>
                <span className="text-[7px] text-gray-500 font-sans uppercase tracking-widest">MAKING FEES</span>
              </div>
            </div>

          </div>

          {/* Offer 2: Gold Saving Scheme */}
          <div className="bg-luxury-black border border-luxury-gold/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden group">
            
            {/* Shimmer background */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-gradient" />

            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-2 text-luxury-gold">
                <Sparkles size={16} />
                <span className="text-[9px] font-sans tracking-widest uppercase font-bold">Smart Wealth Accumulator</span>
              </div>
              
              <h3 className="text-white font-display-serif text-xl sm:text-2xl uppercase tracking-wide leading-tight">
                Swarna Sapathigiri <br />
                <span className="text-luxury-gold">Gold Purchase Scheme</span>
              </h3>
              
              <p className="text-gray-400 font-serif text-xs leading-relaxed">
                Invest monthly starting from ₹5,000. On maturity, redeem pure BIS 916 gold jewelry with **100% discount on making charges & zero wastage**.
              </p>

              <div className="bg-luxury-dark border border-luxury-gold/10 rounded p-3 text-[10px] text-gray-500 font-sans leading-normal">
                ✔ Pay for 10 months, get the 11th month installment paid by Sri Venkata Sapathigiri. Lock weight and secure against market rate hikes.
              </div>

              <div className="pt-2">
                <a 
                  href={getWhatsAppSchemeLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-luxury-gold text-luxury-gold font-sans text-[10px] tracking-widest uppercase font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all rounded-sm flex items-center space-x-1.5 inline-flex"
                >
                  <ShieldCheck size={12} className="mr-1.5" />
                  <span>Enroll in Scheme</span>
                </a>
              </div>
            </div>

            {/* Right graphic */}
            <div className="w-32 h-32 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-dark relative flex-shrink-0">
              <div className="absolute inset-2 rounded-full border border-luxury-gold/5 flex items-center justify-center flex-col text-center">
                <Sparkles className="text-luxury-gold animate-spin" style={{ animationDuration: '8s' }} size={24} />
                <span className="text-white font-serif text-xs font-bold mt-1">100% OFF</span>
                <span className="text-[7px] text-gray-500 font-sans uppercase tracking-widest">MAKING FEES</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
