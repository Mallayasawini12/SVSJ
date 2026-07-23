import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, User, Phone, Mail, Award, CheckCircle, Video, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function AppointmentModal() {
  const { isAppointmentOpen, setIsAppointmentOpen } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    type: 'in-store',
    slot: 'Morning (10:00 AM - 01:00 PM)',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#F5E6C4', '#AA7C11']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#F5E6C4', '#AA7C11']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      const refId = `SVSJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(refId);
      setSubmitted(true);
      triggerConfetti();
    }
  };

  const handleClose = () => {
    setIsAppointmentOpen(false);
    // Reset state after transition completes
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        type: 'in-store',
        slot: 'Morning (10:00 AM - 01:00 PM)',
        message: ''
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isAppointmentOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-luxury-black border border-luxury-gold/30 rounded-lg shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto z-10 noise-overlay"
          >
            
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                {/* Title */}
                <div className="text-center mb-6">
                  <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
                    Royal Consultation
                  </span>
                  <h3 className="text-white font-display-serif text-2xl tracking-widest uppercase">
                    Book an Appointment
                  </h3>
                  <div className="w-16 h-[1.5px] bg-gold-gradient mx-auto mt-2" />
                  <p className="text-gray-400 font-serif text-xs mt-3">
                    Schedule a private in-store viewing or a high-definition WhatsApp video consultation with our jewelry experts.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  
                  {/* Name Input */}
                  <div className="relative">
                    <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Full Name *</label>
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-3 text-luxury-gold/70" />
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-luxury-gray border border-luxury-gold/20 rounded pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Phone Number *</label>
                      <div className="relative flex items-center">
                        <Phone size={14} className="absolute left-3 text-luxury-gold/70" />
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-luxury-gray border border-luxury-gold/20 rounded pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold"
                          placeholder="Your 10-digit number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Email Address</label>
                      <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-3 text-luxury-gold/70" />
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-luxury-gray border border-luxury-gold/20 rounded pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consultation Type Selector */}
                  <div>
                    <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Consultation Mode</label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, type: 'in-store' }))}
                        className={`flex items-center justify-center space-x-2 py-3 border rounded transition-all ${
                          formData.type === 'in-store' 
                            ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold font-bold' 
                            : 'border-luxury-gold/10 bg-luxury-gray text-gray-400 hover:text-white'
                        }`}
                      >
                        <Store size={15} />
                        <span>In-Store Visit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, type: 'video' }))}
                        className={`flex items-center justify-center space-x-2 py-3 border rounded transition-all ${
                          formData.type === 'video' 
                            ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold font-bold' 
                            : 'border-luxury-gold/10 bg-luxury-gray text-gray-400 hover:text-white'
                        }`}
                      >
                        <Video size={15} />
                        <span>Video Call</span>
                      </button>
                    </div>
                  </div>

                  {/* Date & Time Slot Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Select Date *</label>
                      <div className="relative flex items-center">
                        <Calendar size={14} className="absolute left-3 text-luxury-gold/70" />
                        <input 
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-luxury-gray border border-luxury-gold/20 rounded pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Select Time Slot</label>
                      <div className="relative flex items-center">
                        <Clock size={14} className="absolute left-3 text-luxury-gold/70" />
                        <select 
                          name="slot"
                          value={formData.slot}
                          onChange={handleChange}
                          className="w-full bg-luxury-gray border border-luxury-gold/20 rounded pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold appearance-none"
                        >
                          <option>Morning (10:00 AM - 01:00 PM)</option>
                          <option>Afternoon (01:00 PM - 04:00 PM)</option>
                          <option>Evening (04:00 PM - 08:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold block mb-1">Special Preferences (Optional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-luxury-gray border border-luxury-gold/20 rounded px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-luxury-gold resize-none"
                      placeholder="e.g. Interested in heavy antique neckpieces for a September wedding, customized bangles, etc."
                    />
                  </div>

                  {/* CTA Button */}
                  <button 
                    type="submit" 
                    className="w-full py-3 mt-2 bg-gold-gradient text-luxury-black font-bold tracking-widest uppercase rounded hover:opacity-90 transition-opacity shadow-md"
                  >
                    Confirm Royal Booking
                  </button>

                </form>
              </>
            ) : (
              // Success Screen
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 font-sans flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full border border-luxury-gold flex items-center justify-center bg-luxury-gold/10 mb-4 animate-bounce">
                  <CheckCircle size={32} className="text-luxury-gold" />
                </div>
                
                <span className="text-[10px] tracking-[0.2em] font-sans font-bold text-luxury-gold uppercase block mb-1">
                  Booking Confirmed
                </span>
                <h3 className="text-white font-display-serif text-2xl tracking-wider uppercase mb-1">
                  Thank You, {formData.name}
                </h3>
                <div className="w-12 h-[1px] bg-gold-gradient mx-auto my-3" />

                <div className="bg-luxury-gray/50 border border-luxury-gold/20 rounded p-5 my-5 text-left max-w-sm w-full space-y-2 text-xs">
                  <p className="text-gray-400"><strong className="text-white">Booking Ref:</strong> <span className="text-luxury-gold font-bold">{bookingId}</span></p>
                  <p className="text-gray-400"><strong className="text-white">Mode:</strong> {formData.type === 'in-store' ? 'In-Store Consultation (Flagship Store)' : 'Video Consultation (WhatsApp)'}</p>
                  <p className="text-gray-400"><strong className="text-white">Date:</strong> {formData.date}</p>
                  <p className="text-gray-400"><strong className="text-white">Time Slot:</strong> {formData.slot}</p>
                </div>

                <p className="text-gray-400 text-xs px-4 leading-relaxed mb-6 font-serif">
                  A verification confirmation code along with location details has been sent to <span className="text-white">{formData.phone}</span>. Our Senior Design Expert will contact you shortly to personalize your viewing catalog.
                </p>

                <button 
                  onClick={handleClose} 
                  className="px-8 py-2.5 border border-luxury-gold text-luxury-gold font-bold text-[10px] tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all"
                >
                  Return to Gallery
                </button>
              </motion.div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
