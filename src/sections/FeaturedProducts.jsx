import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturedProducts() {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView,
    categoryFilter,
    setCategoryFilter,
    products
  } = useApp();

  // Silver Filters State
  const [silverGender, setSilverGender] = useState('all');

  // Gold Filter Tabs
  const goldFilterTabs = [
    { id: 'all', label: 'All Gold' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'bangles', label: 'Bangles' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'rings', label: 'Rings' },
    { id: 'lockets', label: 'Lockets' },
  ];

  const silverGenderTabs = [
    { id: 'all', label: 'All' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
  ];

  // Separate Gold and Silver items
  const goldProducts = products.filter(p => p.metal === 'gold' || !p.metal);
  const silverProducts = products.filter(p => p.metal === 'silver');

  // Filter gold products
  const filteredGoldProducts = categoryFilter === 'all'
    ? goldProducts
    : goldProducts.filter(p => p.category === categoryFilter);

  // Group silver items by categories
  const silverChains = silverProducts.filter(p => p.category === 'chains');
  const silverLockets = silverProducts.filter(p => p.category === 'lockets');
  const silverRings = silverProducts.filter(p => p.category === 'rings');
  const silverBracelets = silverProducts.filter(p => p.category === 'bracelets');
  const poojaItems = silverProducts.filter(p => p.category === 'pooja');

  // Filter silver categories by gender
  const filteredChains = silverChains.filter(p => silverGender === 'all' || p.gender === silverGender || p.gender === 'all');
  const filteredLockets = silverLockets.filter(p => silverGender === 'all' || p.gender === silverGender || p.gender === 'all');
  const filteredRings = silverRings.filter(p => silverGender === 'all' || p.gender === silverGender || p.gender === 'all');
  const filteredBracelets = silverBracelets.filter(p => silverGender === 'all' || p.gender === silverGender || p.gender === 'all');

  const renderProductCard = (p) => {
    const isWish = isInWishlist(p.id);
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        key={p.id}
        className="group bg-luxury-dark border border-luxury-gold/10 hover:border-luxury-gold/45 rounded overflow-hidden transition-all duration-300 flex flex-col shadow-md relative"
      >
        {/* Product Image */}
        <div className="relative aspect-video bg-luxury-black overflow-hidden flex-shrink-0">
          <img 
            src={p.image} 
            alt={p.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-2 left-2 bg-luxury-black/75 backdrop-blur-sm border border-luxury-gold/25 px-1.5 py-0.5 rounded-sm text-[7px] text-luxury-gold uppercase tracking-wider font-semibold">
            {p.purity}
          </div>

          {/* Gender/Audience Badge (only for non-pooja) */}
          {p.category !== 'pooja' && (
            <div className="absolute top-2 right-2 bg-luxury-gold text-luxury-black font-sans font-bold text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm shadow shadow-black">
              {p.gender}
            </div>
          )}

          {/* Actions overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 z-10">
            <button 
              onClick={() => openQuickView(p)}
              className="w-8 h-8 rounded-full bg-luxury-black/90 text-luxury-gold border border-luxury-gold/40 hover:bg-luxury-gold hover:text-luxury-black transition-colors flex items-center justify-center shadow-lg"
              title="Quick View"
            >
              <Eye size={12} />
            </button>
            <button 
              onClick={() => addToCart(p)}
              className="w-8 h-8 rounded-full bg-luxury-black/90 text-luxury-gold border border-luxury-gold/40 hover:bg-luxury-gold hover:text-luxury-black transition-colors flex items-center justify-center shadow-lg"
              title="Add to Bag"
            >
              <ShoppingBag size={12} />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1 text-[8px] text-gray-500 font-sans tracking-wider uppercase font-semibold">
              <span>{p.categoryLabel}</span>
              <div className="flex items-center space-x-0.5 text-luxury-gold">
                <Star size={8} className="fill-luxury-gold" />
                <span>{p.rating}</span>
              </div>
            </div>

            <h4 
              onClick={() => openQuickView(p)}
              className="text-white hover:text-luxury-gold transition-colors font-serif font-medium text-xs line-clamp-1 cursor-pointer"
            >
              {p.title}
            </h4>

            <p className="text-[9px] text-gray-400 mt-0.5 font-sans">
              Approx: {p.weight}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-luxury-gold/5 pt-2 mt-3">
            <span className="text-gray-500 font-sans text-[8px] tracking-wider uppercase font-semibold">
              {p.category === 'pooja' ? 'Sacred Articles' : 'Sterling Design'}
            </span>
            
            <button 
              onClick={() => openQuickView(p)}
              className="text-[8px] tracking-widest uppercase font-sans text-luxury-gold font-bold hover:underline"
            >
              Details
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-0">
      
      {/* ================= GOLD MASTERPIECES SECTION ================= */}
      <section 
        id="featured-products-gold" 
        className="relative py-24 bg-luxury-dark border-t border-luxury-gold/10 noise-overlay"
      >
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-radial-glow opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
              Exclusive Gold Pieces
            </span>
            <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
              Featured Masterpieces (Gold)
            </h2>
            <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
              Marvel at our handcrafted signature gold creations, certified for highest purity and decorated with precious heritage gems.
            </p>
          </div>

          {/* Gold Filters Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {goldFilterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 text-[10px] tracking-widest uppercase font-sans font-bold border transition-all rounded-sm ${
                  categoryFilter === tab.id
                    ? 'border-luxury-gold bg-luxury-gold text-luxury-black shadow-md'
                    : 'border-luxury-gold/15 bg-luxury-black text-gray-400 hover:text-white hover:border-luxury-gold/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gold Products Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredGoldProducts.map((p) => {
                const isWish = isInWishlist(p.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={p.id}
                    className="group flex flex-col bg-luxury-black border border-luxury-gold/10 hover:border-luxury-gold/40 rounded transition-all duration-400 overflow-hidden shadow-lg hover:shadow-2xl"
                  >
                    
                    {/* Product Image & Overlays */}
                    <div className="relative aspect-square bg-luxury-dark overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Dark gradient mask on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-10">
                        
                        {/* Quick View Button */}
                        <button 
                          onClick={() => openQuickView(p)}
                          className="w-10 h-10 rounded-full bg-luxury-black/90 text-luxury-gold border border-luxury-gold/40 hover:bg-luxury-gold hover:text-luxury-black transition-colors flex items-center justify-center shadow-lg"
                          title="Quick View"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Add to Cart Button */}
                        <button 
                          onClick={() => addToCart(p)}
                          className="w-10 h-10 rounded-full bg-luxury-black/90 text-luxury-gold border border-luxury-gold/40 hover:bg-luxury-gold hover:text-luxury-black transition-colors flex items-center justify-center shadow-lg"
                          title="Add to Bag"
                        >
                          <ShoppingBag size={15} />
                        </button>
                      </div>

                      {/* Wishlist Toggle Badge */}
                      <button 
                        onClick={() => toggleWishlist(p.id)}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-luxury-black/75 backdrop-blur-sm border flex items-center justify-center transition-colors ${
                          isWish 
                            ? 'border-red-500 text-red-500' 
                            : 'border-luxury-gold/20 text-gray-400 hover:text-luxury-gold'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart size={14} className={isWish ? 'fill-current' : ''} />
                      </button>

                      {/* Quality Certification Label */}
                      <div className="absolute bottom-2 left-2 bg-luxury-black/75 backdrop-blur-sm border border-luxury-gold/25 px-2 py-0.5 rounded-sm text-[8px] text-luxury-gold font-sans font-medium uppercase tracking-wider">
                        {p.purity}
                      </div>

                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      
                      <div>
                        {/* Category and Rating */}
                        <div className="flex justify-between items-center mb-1 text-[9px] text-gray-500 font-sans tracking-widest uppercase font-semibold">
                          <span>{p.categoryLabel}</span>
                          <div className="flex items-center space-x-0.5 text-luxury-gold">
                            <Star size={9} className="fill-luxury-gold" />
                            <span>{p.rating}</span>
                          </div>
                        </div>

                        {/* Product Title */}
                        <h3 
                          onClick={() => openQuickView(p)}
                          className="text-white hover:text-luxury-gold transition-colors font-serif font-medium text-sm line-clamp-1 cursor-pointer"
                        >
                          {p.title}
                        </h3>

                        {/* Weight Tag */}
                        <p className="text-[10px] text-gray-400 mt-0.5 font-sans">
                          Approx: {p.weight}
                        </p>
                      </div>

                      {/* Action CTA */}
                      <div className="flex items-center justify-between border-t border-luxury-gold/5 pt-3 mt-4">
                        <span className="text-gray-500 font-sans text-[9px] tracking-wider uppercase font-semibold">
                          Exclusive Design
                        </span>
                        
                        <button 
                          onClick={() => openQuickView(p)}
                          className="text-[9px] tracking-widest uppercase font-sans text-luxury-gold font-bold hover:underline"
                        >
                          Details
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ================= SILVER MASTERPIECES SECTION ================= */}
      <section 
        id="featured-products-silver" 
        className="relative py-24 bg-luxury-black border-t border-luxury-gold/10 noise-overlay"
      >
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-radial-glow opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
              Sterling Silver Articles
            </span>
            <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
              Featured Masterpieces (Silver)
            </h2>
            <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
              Explore our pristine sterling silver chains, lockets, rings, and bracelets alongside sacred pooja articles designed for auspicious home rituals.
            </p>
          </div>

          {/* Gender Filter Header for all columns */}
          <div className="flex justify-center mb-12 border-b border-luxury-gold/5 pb-6">
            <div className="flex items-center space-x-3 bg-luxury-dark/60 p-2 rounded border border-luxury-gold/10 shadow-lg">
              <span className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold px-3">Filter Collection:</span>
              <div className="flex space-x-1">
                {silverGenderTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSilverGender(tab.id)}
                    className={`px-4 py-1.5 text-[10px] tracking-widest uppercase font-sans font-bold rounded-sm transition-all ${
                      silverGender === tab.id
                        ? 'bg-luxury-gold text-luxury-black shadow-md font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-luxury-black/35'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
            
            {/* Column 1: Chains */}
            <div className="space-y-6">
              <h3 className="text-white font-display-serif text-base tracking-widest uppercase text-center lg:text-left heritage-border-bottom pb-2">
                Silver Chains
              </h3>
              <div className="space-y-6 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {filteredChains.map((p) => renderProductCard(p))}
                </AnimatePresence>
                {filteredChains.length === 0 && (
                  <p className="text-gray-500 text-xs font-serif text-center py-10">No items fit this filter.</p>
                )}
              </div>
            </div>

            {/* Column 2: Lockets */}
            <div className="space-y-6">
              <h3 className="text-white font-display-serif text-base tracking-widest uppercase text-center lg:text-left heritage-border-bottom pb-2">
                Silver Lockets
              </h3>
              <div className="space-y-6 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {filteredLockets.map((p) => renderProductCard(p))}
                </AnimatePresence>
                {filteredLockets.length === 0 && (
                  <p className="text-gray-500 text-xs font-serif text-center py-10">No items fit this filter.</p>
                )}
              </div>
            </div>

            {/* Column 3: Rings */}
            <div className="space-y-6">
              <h3 className="text-white font-display-serif text-base tracking-widest uppercase text-center lg:text-left heritage-border-bottom pb-2">
                Silver Rings
              </h3>
              <div className="space-y-6 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {filteredRings.map((p) => renderProductCard(p))}
                </AnimatePresence>
                {filteredRings.length === 0 && (
                  <p className="text-gray-500 text-xs font-serif text-center py-10">No items fit this filter.</p>
                )}
              </div>
            </div>

            {/* Column 4: Bracelets */}
            <div className="space-y-6">
              <h3 className="text-white font-display-serif text-base tracking-widest uppercase text-center lg:text-left heritage-border-bottom pb-2">
                Silver Bracelets
              </h3>
              <div className="space-y-6 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {filteredBracelets.map((p) => renderProductCard(p))}
                </AnimatePresence>
                {filteredBracelets.length === 0 && (
                  <p className="text-gray-500 text-xs font-serif text-center py-10">No items fit this filter.</p>
                )}
              </div>
            </div>

            {/* Column 5: Pooja Ornaments */}
            <div className="space-y-6">
              <h3 className="text-white font-display-serif text-base tracking-widest uppercase text-center lg:text-left heritage-border-bottom pb-2">
                Sacred Pooja Items
              </h3>
              <div className="space-y-6 min-h-[200px]">
                {poojaItems.map((p) => renderProductCard(p))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

