import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../utils/data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global Modals and UI State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark'); // Dark mode is default luxury theme
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Wishlist and Cart State
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Products Database State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('svsj_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Admin Access Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Live Gold Rates State (Simulated dynamic Indian market rate)
  const [goldRate22K, setGoldRate22K] = useState(6895); // Price per gram in INR
  const [goldRate24K, setGoldRate24K] = useState(7520);
  const [silverRate, setSilverRate] = useState(94.5);
  const [goldRateHistory, setGoldRateHistory] = useState([
    { day: 'Mon', '22K Gold': 6850, '24K Gold': 7470, Silver: 92.0 },
    { day: 'Tue', '22K Gold': 6870, '24K Gold': 7490, Silver: 92.8 },
    { day: 'Wed', '22K Gold': 6860, '24K Gold': 7480, Silver: 93.1 },
    { day: 'Thu', '22K Gold': 6890, '24K Gold': 7515, Silver: 93.8 },
    { day: 'Fri', '22K Gold': 6895, '24K Gold': 7520, Silver: 94.5 },
  ]);

  // Load wishlist and cart from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('svsj_wishlist');
    const savedCart = localStorage.getItem('svsj_cart');
    
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
    document.documentElement.classList.add('dark');
  }, []);

  // Sync Products to localStorage
  useEffect(() => {
    localStorage.setItem('svsj_products', JSON.stringify(products));
  }, [products]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('svsj_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync Cart to localStorage
  useEffect(() => {
    localStorage.setItem('svsj_cart', JSON.stringify(cart));
  }, [cart]);

  // Live gold rates fluctuating slightly every 15 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const delta22 = (Math.random() * 6 - 3).toFixed(1);
      const delta24 = (Math.random() * 8 - 4).toFixed(1);
      const deltaSilver = (Math.random() * 0.4 - 0.2).toFixed(2);

      setGoldRate22K(prev => Math.round((prev + parseFloat(delta22)) * 10) / 10);
      setGoldRate24K(prev => Math.round((prev + parseFloat(delta24)) * 10) / 10);
      setSilverRate(prev => Math.round((prev + parseFloat(deltaSilver)) * 100) / 100);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true); // Open cart sidebar when item is added
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Open Quick View Modal
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setIsQuickViewOpen(false);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Search Results
  const getFilteredProducts = () => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.categoryLabel && product.categoryLabel.toLowerCase().includes(query)) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      (product.metal && product.metal.toLowerCase().includes(query)) ||
      (product.gender && product.gender.toLowerCase().includes(query))
    );
  };

  // Product Catalog CRUD Operations for Admin panel
  const addProduct = (p) => {
    const newProduct = {
      ...p,
      id: p.id || `custom_${Date.now()}`,
      rating: Number(p.rating) || 5.0,
      reviewsCount: Number(p.reviewsCount) || 1,
      price: Number(p.price) || 0,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // Also remove from cart/wishlist if it was there
    removeFromCart(id);
    setWishlist(prev => prev.filter(pId => pId !== id));
  };

  const editProduct = (id, updatedP) => {
    setProducts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...updatedP, price: Number(updatedP.price) || p.price, rating: Number(updatedP.rating) || p.rating } 
        : p
    ));
  };

  const resetProducts = () => {
    if (window.confirm("Are you sure you want to restore the original catalog? This will delete all custom added jewelry items.")) {
      setProducts(PRODUCTS);
    }
  };

  return (
    <AppContext.Provider value={{
      isSearchOpen, setIsSearchOpen,
      isWishlistOpen, setIsWishlistOpen,
      isCartOpen, setIsCartOpen,
      isAppointmentOpen, setIsAppointmentOpen,
      isQuickViewOpen, setIsQuickViewOpen,
      selectedProduct, setSelectedProduct,
      searchQuery, setSearchQuery,
      activeSection, setActiveSection,
      theme, setTheme, toggleTheme,
      categoryFilter, setCategoryFilter,
      
      wishlist, toggleWishlist, isInWishlist,
      cart, addToCart, removeFromCart, updateCartQty, clearCart, getCartTotal, getCartCount,
      openQuickView, closeQuickView,
      
      goldRate22K, goldRate24K, silverRate, goldRateHistory,
      getFilteredProducts,
      
      products, addProduct, deleteProduct, editProduct, resetProducts,
      isAdminOpen, setIsAdminOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
