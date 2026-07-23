import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Heart, Star, ShieldCheck, HelpCircle, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickViewModal() {
  const { 
    isQuickViewOpen, 
    closeQuickView, 
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useApp();

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isWish = isInWishlist(product.id);

  // Generate WhatsApp inquiry link
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Namaste, I am interested in viewing the "${product.title}" (${product.purity}, Approx. Weight: ${product.weight}) priced at ₹${product.price.toLocaleString('en-IN')}. Please share availability and live making charge discounts at the store. Thank you.

నమస్తే, నేను ₹${product.price.toLocaleString('en-IN')} ధర కలిగిన "${product.title}" (${product.purity}, బరువు: ${product.weight}) గురించి తెలుసుకోవడానికి ఆసక్తిగా ఉన్నాను. దయచేసి దీని లభ్యత మరియు లైవ్ మేకింగ్ చార్జీల తగ్గింపుల వివరాలను తెలియజేయండి. ధన్యవాదాలు.`
    );
    return `https://wa.me/919246668319?text=${text}`; // Showroom WhatsApp number
  };

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl bg-luxury-black border border-luxury-gold/30 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto z-10 noise-overlay flex flex-col md:flex-row"
          >
            
            {/* Close Button */}
            <button 
              onClick={closeQuickView} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20 bg-luxury-black/60 rounded-full p-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Left side: Product Image */}
            <div className="w-full md:w-1/2 relative bg-luxury-dark flex items-center justify-center min-h-[300px] md:min-h-[450px]">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover max-h-[400px] md:max-h-full"
              />
              
              {/* Decorative gold badge overlay */}
              <div className="absolute top-4 left-4 bg-luxury-black/80 backdrop-blur-sm border border-luxury-gold/30 px-3 py-1 rounded-sm text-[9px] text-luxury-gold font-sans tracking-widest uppercase font-semibold">
                {product.purity}
              </div>
            </div>

            {/* Right side: Product Info */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              
              {/* Header Details */}
              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-luxury-gold uppercase block mb-1">
                  {product.categoryLabel}
                </span>
                <h3 className="text-white font-display-serif text-2xl tracking-wide uppercase mb-2">
                  {product.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex text-luxury-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={13} 
                        className={i < Math.floor(product.rating) ? 'fill-luxury-gold' : 'text-gray-600'} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Price Tag */}
                <div className="flex items-baseline space-x-2 mb-4 border-b border-luxury-gold/10 pb-4">
                  <span className="text-gray-400 text-xs font-sans uppercase">Est. Price:</span>
                  <span className="text-luxury-gold text-2xl font-bold font-serif">₹{product.price.toLocaleString('en-IN')}</span>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5 font-sans text-xs bg-luxury-dark/60 p-3 border border-luxury-gold/5 rounded">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Approx Weight</span>
                    <span className="text-white font-semibold">{product.weight}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Purity Certified</span>
                    <span className="text-white font-semibold">{product.purity}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 font-serif text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 font-sans text-xs mt-auto">
                <div className="flex gap-3">
                  {/* Add to Bag */}
                  <button 
                    onClick={() => { addToCart(product); closeQuickView(); }}
                    className="flex-1 py-3 bg-gold-gradient text-luxury-black font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded-sm shadow-md flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Bag</span>
                  </button>

                  {/* Add to Wishlist */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`px-4 py-3 border rounded-sm transition-colors flex items-center justify-center ${
                      isWish 
                        ? 'border-red-500 bg-red-500/10 text-red-500' 
                        : 'border-luxury-gold/30 hover:border-luxury-gold text-gray-400 hover:text-white'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart size={16} className={isWish ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* WhatsApp Inquiry */}
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-green-500 bg-green-500/5 hover:bg-green-500/10 text-green-400 font-bold tracking-widest uppercase hover:text-green-300 transition-colors rounded-sm flex items-center justify-center space-x-2"
                >
                  <PhoneCall size={14} />
                  <span>Inquire via WhatsApp</span>
                </a>

                {/* Guarantee Banner */}
                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500 pt-2 border-t border-luxury-gold/10">
                  <ShieldCheck size={12} className="text-luxury-gold" />
                  <span className="tracking-wide">BIS Hallmarked & Insured Delivery Guarantee</span>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
