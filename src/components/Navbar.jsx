import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Heart, ShoppingBag, Menu, X, Sun, Moon, 
  Trash2, Phone, Calendar, ArrowRight, Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
export default function Navbar() {
  const { 
    wishlist, toggleWishlist, 
    cart, removeFromCart, updateCartQty, getCartTotal, getCartCount,
    isCartOpen, setIsCartOpen,
    isWishlistOpen, setIsWishlistOpen,
    isSearchOpen, setIsSearchOpen,
    theme, toggleTheme,
    openQuickView,
    searchQuery, setSearchQuery,
    products
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for glassmorphism and active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracking
      const sections = ['home', 'featured-products-gold', 'featured-products-silver', 'bridal-collection', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'featured-products-gold', label: 'Gold Masterpieces', href: '#featured-products-gold' },
    { id: 'featured-products-silver', label: 'Silver Collection', href: '#featured-products-silver' },
    { id: 'bridal-collection', label: 'Bridal', href: '#bridal-collection' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products based on search query
  const searchedProducts = searchQuery.trim() 
    ? products.filter(p => {
        const query = searchQuery.toLowerCase().trim();
        return (
          p.title.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query)) ||
          (p.category && p.category.toLowerCase().includes(query)) ||
          (p.metal && p.metal.toLowerCase().includes(query)) ||
          (p.gender && p.gender.toLowerCase().includes(query))
        );
      })
    : [];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold-gradient z-[100] origin-left"
        style={{ scaleX }}
      />

      <header className={`fixed top-[3px] left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-luxury-black/90 backdrop-blur-md border-b border-luxury-gold/20 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 border border-luxury-gold/50 flex items-center justify-center rounded-full bg-luxury-black overflow-hidden shadow-inner">
                <span className="text-luxury-gold font-display-serif font-semibold text-xl group-hover:scale-110 transition-transform duration-300">S</span>
                <div className="absolute inset-0 bg-gold-gradient opacity-10 group-hover:opacity-25 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-luxury-gold font-display-serif font-bold text-lg tracking-wider leading-tight">
                  SRI VENKATA
                </span>
                <span className="text-white dark:text-white font-sans text-[10px] tracking-[0.25em] font-medium leading-none">
                  SAPATHIGIRI JEWELLERY
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-sans text-xs tracking-widest uppercase py-2 transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-luxury-gold font-semibold'
                      : 'text-gray-300 hover:text-luxury-gold'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Navbar Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-300 hover:text-luxury-gold transition-colors p-1.5"
                aria-label="Search items"
              >
                <Search size={18} />
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1.5"
                aria-label="Open wishlist"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-luxury-gold text-luxury-black font-sans font-bold text-[9px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-300 hover:text-luxury-gold transition-colors p-1.5"
                aria-label="Open shopping bag"
              >
                <ShoppingBag size={18} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-gradient text-luxury-black font-sans font-bold text-[9px] rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>



              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-gray-300 hover:text-luxury-gold transition-colors p-1.5"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ==================================================== */}
      {/* SEARCH OVERLAY */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-md flex flex-col pt-24 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-luxury-gold font-display-serif text-2xl tracking-widest">SEARCH OUR COLLECTION</h3>
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Bar Input */}
              <div className="relative border-b border-luxury-gold/40 py-2 flex items-center mb-8">
                <input 
                  type="text" 
                  placeholder="Search for gold necklaces, heritage jewelry, rings..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-lg md:text-2xl placeholder-gray-500 focus:outline-none font-serif"
                  autoFocus
                />
                <Search className="text-luxury-gold ml-2" size={24} />
              </div>

              {/* Real-time Search Results */}
              <div className="overflow-y-auto max-h-[60vh] scrollbar-thin">
                {searchQuery.trim() === '' ? (
                  <p className="text-gray-500 font-sans text-sm tracking-wide">Type something to search our legacy collections...</p>
                ) : searchedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchedProducts.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => { openQuickView(p); setIsSearchOpen(false); }}
                        className="flex items-center space-x-4 p-3 bg-luxury-gray/50 hover:bg-luxury-gray/90 border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all rounded cursor-pointer group"
                      >
                        <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded border border-luxury-gold/10" />
                        <div className="flex-1">
                          <h4 className="text-white group-hover:text-luxury-gold transition-colors font-serif font-medium">{p.title}</h4>
                          <p className="text-xs text-luxury-gold/70">{p.purity}</p>
                          <p className="text-sm font-semibold text-white mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <ArrowRight size={16} className="text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 font-sans text-sm">No items found matching "{searchQuery}". Try "heritage", "bridal", or "necklaces".</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* WISHLIST DRAWER */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-luxury-black border-l border-luxury-gold/20 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Heart size={20} className="text-luxury-gold fill-luxury-gold" />
                  <h3 className="text-luxury-gold font-display-serif text-xl tracking-wider">MY WISHLIST</h3>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={22} />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto pr-1">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Heart size={48} className="text-gray-600 mb-4 stroke-1" />
                    <p className="text-gray-400 font-sans text-sm mb-4">Your wishlist is empty</p>
                    <button 
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-6 py-2 border border-luxury-gold text-luxury-gold text-xs tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all"
                    >
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.filter(p => wishlist.includes(p.id)).map(p => (
                      <div key={p.id} className="flex space-x-3 p-3 bg-luxury-dark border border-luxury-gold/10 rounded">
                        <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded border border-luxury-gold/10" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-serif font-semibold text-sm truncate">{p.title}</h4>
                          <p className="text-[10px] text-luxury-gold/80">{p.purity}</p>
                          <p className="text-sm font-bold text-white mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                          
                          <div className="flex space-x-2 mt-2">
                            <button 
                              onClick={() => { openQuickView(p); setIsWishlistOpen(false); }}
                              className="text-[10px] text-luxury-gold hover:underline tracking-wider uppercase font-semibold"
                            >
                              Quick View
                            </button>
                            <span className="text-gray-600">|</span>
                            <button 
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[10px] text-red-400 hover:underline tracking-wider uppercase font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* CART DRAWER */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-luxury-black border-l border-luxury-gold/20 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <ShoppingBag size={20} className="text-luxury-gold" />
                  <h3 className="text-luxury-gold font-display-serif text-xl tracking-wider">YOUR BAG</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={22} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingBag size={48} className="text-gray-600 mb-4 stroke-1" />
                    <p className="text-gray-400 font-sans text-sm mb-4">Your bag is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2 border border-luxury-gold text-luxury-gold text-xs tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-black transition-all"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex space-x-3 p-3 bg-luxury-dark border border-luxury-gold/10 rounded">
                        <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded border border-luxury-gold/10" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-serif font-semibold text-sm truncate">{item.product.title}</h4>
                          <p className="text-xs text-luxury-gold/80">₹{item.product.price.toLocaleString('en-IN')}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-luxury-gold/20 rounded bg-luxury-gray">
                              <button 
                                onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-gray-400 hover:text-white transition-colors text-xs"
                              >
                                -
                              </button>
                              <span className="px-2.5 py-0.5 text-xs font-semibold text-white">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-gray-400 hover:text-white transition-colors text-xs"
                              >
                                +
                              </button>
                            </div>
                            
                            {/* Remove button */}
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-400 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal and Checkout Button */}
              {cart.length > 0 && (
                <div className="border-t border-luxury-gold/10 pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-xs tracking-wider uppercase font-sans">Est. Subtotal</span>
                    <span className="text-luxury-gold text-lg font-bold font-serif">₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-4 font-sans leading-normal">
                    *Taxes, making charges, and hallmarking charges are calculated at final checkout page. Shipping is free and fully insured.
                  </p>
                  <button 
                    onClick={() => alert("Checkout process simulation: Thank you for shopping with Sri Venkata Sapathigiri Jewellery!")}
                    className="w-full py-3 bg-gold-gradient text-luxury-black font-semibold tracking-wider text-xs uppercase hover:opacity-90 transition-opacity rounded-sm shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MOBILE FULL SCREEN MENU */}
      {/* ==================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-50 bg-luxury-black/98 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4 mb-10">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2">
                <div className="w-8 h-8 border border-luxury-gold/50 flex items-center justify-center rounded-full">
                  <span className="text-luxury-gold font-display-serif font-bold text-sm">S</span>
                </div>
                <span className="text-luxury-gold font-display-serif font-bold text-sm tracking-widest">SVS JEWELLERY</span>
              </a>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-serif text-xl tracking-widest uppercase transition-colors py-2 ${
                    activeSection === link.id
                      ? 'text-luxury-gold font-bold'
                      : 'text-gray-300 hover:text-luxury-gold'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="text-center text-gray-500 font-sans text-[10px] tracking-widest pt-12">
                <p>© 2026 SRI VENKATA SAPATHIGIRI JEWELLERY</p>
                <p className="mt-1">Purity & Trust Since 2013</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
