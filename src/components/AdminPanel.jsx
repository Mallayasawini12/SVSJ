import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Trash2, Edit2, RotateCcw, Lock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const { 
    isAdminOpen, 
    setIsAdminOpen,
    products, 
    addProduct, 
    deleteProduct, 
    editProduct, 
    resetProducts 
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Lock when modal is closed (comes back)
  useEffect(() => {
    if (!isAdminOpen) {
      setIsAuthenticated(false);
      setPasscode('');
      setAuthError('');
    }
  }, [isAdminOpen]);

  // Form States
  const [editingId, setEditingId] = useState(null);
  const [metal, setMetal] = useState('gold');
  const [category, setCategory] = useState('necklaces');
  const [gender, setGender] = useState('all');
  const [title, setTitle] = useState('');
  const [purity, setPurity] = useState('22K BIS Hallmarked');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Handle Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '2013') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Hint: Sri Venkata Sapathigiri Jewellers established year.');
    }
  };

  // Pre-fill form for editing
  const startEdit = (product) => {
    setEditingId(product.id);
    setMetal(product.metal || 'gold');
    setCategory(product.category || 'necklaces');
    setGender(product.gender || 'all');
    setTitle(product.title || '');
    setPurity(product.purity || '');
    setWeight(product.weight || '');
    setPrice(product.price || '');
    setImage(product.image || '');
    setDescription(product.description || '');
  };

  // Reset form inputs
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setWeight('');
    setPrice('');
    setImage('');
    setDescription('');
    // Default purity depending on metal
    if (metal === 'gold') {
      setPurity('22K BIS Hallmarked');
    } else {
      setPurity('92.5 Sterling Silver');
    }
  };

  // Handle metal change to update category and purity defaults
  const handleMetalChange = (newMetal) => {
    setMetal(newMetal);
    if (newMetal === 'gold') {
      setCategory('necklaces');
      setPurity('22K BIS Hallmarked');
    } else {
      setCategory('chains');
      setPurity('92.5 Sterling Silver');
    }
  };

  // Read local file from gallery/files
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file size is too large (maximum 2MB). Please select a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !weight) {
      alert('Please fill out Title, Price, and Weight.');
      return;
    }

    // Default image if empty
    const finalImage = image.trim() || (
      metal === 'gold' 
        ? '/heritage_gold_choker.png' 
        : '/silver_pooja_items.png'
    );

    // Smart weight formatting: e.g. "10.5" -> "10.5g", "15 grams" -> "15g"
    let rawWeight = weight.trim().toLowerCase();
    let finalWeight = rawWeight;
    // Extract numbers and decimals
    const numericPart = rawWeight.match(/^[\d.]+/);
    if (numericPart) {
      finalWeight = `${numericPart[0]}g`;
    } else if (!rawWeight.endsWith('g')) {
      finalWeight = `${rawWeight}g`;
    }

    const categoryLabel = metal === 'gold' 
      ? `Gold ${category.charAt(0).toUpperCase() + category.slice(1)}`
      : `Silver ${category.charAt(0).toUpperCase() + category.slice(1)}`;

    const productData = {
      title: title.trim(),
      metal,
      category,
      gender,
      purity,
      weight: finalWeight,
      price: Number(price),
      image: finalImage,
      description: description.trim() || `${title} - Exquisite hand-crafted luxury jewelry by Sri Venkata Sapathigiri Jewellers.`,
    };

    if (editingId) {
      editProduct(editingId, productData);
      alert('Product updated successfully!');
    } else {
      addProduct(productData);
      alert('New product added to catalog successfully!');
    }

    resetForm();
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAdminOpen(false)}
        className="fixed inset-0 bg-black backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-luxury-black border border-luxury-gold/30 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto z-10 flex flex-col noise-overlay"
      >
        {/* Header */}
        <div className="p-6 border-b border-luxury-gold/20 flex items-center justify-between bg-luxury-dark">
          <div className="flex items-center space-x-3">
            <Lock className="text-luxury-gold" size={20} />
            <h2 className="text-white font-display-serif text-xl tracking-wider uppercase">
              Sri Venkata Sapathigiri Jewellers - Catalog Manager
            </h2>
          </div>
          <button 
            onClick={() => setIsAdminOpen(false)}
            className="text-gray-400 hover:text-luxury-gold transition-colors p-1"
            aria-label="Close admin panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Mode */}
        {!isAuthenticated ? (
          <div className="p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full border border-luxury-gold/35 flex items-center justify-center bg-luxury-dark/50">
              <Lock className="text-luxury-gold animate-pulse" size={28} />
            </div>
            <div>
              <h3 className="text-white font-display-serif text-lg uppercase tracking-widest">
                Owner Authentication
              </h3>
              <p className="text-gray-400 font-serif text-xs mt-2 leading-relaxed">
                Please enter the store passcode to access the Catalog Manager dashboard and add, modify, or delete jewelry items.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input 
                  type="password"
                  placeholder="Enter Store Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-3 text-center text-white tracking-widest focus:outline-none focus:border-luxury-gold transition-all"
                  required
                />
                {authError && (
                  <p className="text-red-500 font-sans text-[11px] mt-2 font-medium">
                    {authError}
                  </p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gold-gradient text-luxury-black font-sans text-xs tracking-widest uppercase font-bold rounded hover:shadow-lg hover:shadow-luxury-gold/10 transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Mode */
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
            
            {/* Left Panel - Product Form */}
            <div className="lg:col-span-5 bg-luxury-dark/40 border border-luxury-gold/10 p-5 rounded-lg space-y-6">
              <div>
                <h3 className="text-luxury-gold font-display-serif text-base uppercase tracking-wider border-b border-luxury-gold/10 pb-2">
                  {editingId ? 'Modify Jewelry Details' : 'Add New Jewelry Design'}
                </h3>
                <p className="text-gray-500 font-serif text-[11px] mt-1">
                  Fill out the parameters below. Added items will show up instantly in the respective sections on the website.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Metal Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleMetalChange('gold')}
                    className={`py-2 text-[10px] tracking-widest uppercase font-bold border rounded transition-all ${
                      metal === 'gold' 
                        ? 'bg-gold-gradient text-luxury-black border-transparent' 
                        : 'border-luxury-gold/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    Gold Item
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMetalChange('silver')}
                    className={`py-2 text-[10px] tracking-widest uppercase font-bold border rounded transition-all ${
                      metal === 'silver' 
                        ? 'bg-white text-luxury-black border-transparent' 
                        : 'border-luxury-gold/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    Silver Item
                  </button>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-luxury-dark border border-luxury-gold/20 text-white rounded p-2.5 text-xs focus:outline-none focus:border-luxury-gold"
                  >
                    {metal === 'gold' ? (
                      <>
                        <option value="necklaces">Necklace / Haram</option>
                        <option value="bangles">Bangles / Kada</option>
                        <option value="earrings">Jhumkas / Earrings</option>
                        <option value="rings">Cocktail Rings</option>
                        <option value="lockets">Deity Lockets</option>
                      </>
                    ) : (
                      <>
                        <option value="chains">Silver Chains</option>
                        <option value="lockets">Silver Deity Lockets</option>
                        <option value="rings">Silver Rings</option>
                        <option value="bracelets">Silver Bracelets / Kadas</option>
                        <option value="pooja">Pooja Articles</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Gender / Target Audience */}
                {category !== 'pooja' && (
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Target Audience</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-luxury-dark border border-luxury-gold/20 text-white rounded p-2.5 text-xs focus:outline-none focus:border-luxury-gold"
                    >
                      <option value="all">Unisex / Universal</option>
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Product Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Royal Ganesha Gold Haram"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    required
                  />
                </div>

                {/* Weight & Purity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Weight (in Grams)</label>
                    <input 
                      type="text"
                      placeholder="e.g. 15.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Purity Certification</label>
                    <input 
                      type="text"
                      placeholder="e.g. 22K BIS Hallmarked"
                      value={purity}
                      onChange={(e) => setPurity(e.target.value)}
                      className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Price (₹ INR)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 95000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    required
                  />
                </div>

                {/* Design Photo (Gallery / Files Upload) */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">
                    Design Photo
                  </label>
                  
                  <div className="flex items-center space-x-4">
                    {/* Plus Icon / Image Preview Box */}
                    <label className="relative flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-luxury-gold/30 hover:border-luxury-gold rounded cursor-pointer bg-luxury-dark/40 overflow-hidden group transition-all">
                      {image ? (
                        <>
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] uppercase font-bold tracking-widest font-sans">
                            Change
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 hover:text-luxury-gold transition-colors">
                          <Plus size={24} className="text-luxury-gold/60 group-hover:text-luxury-gold mb-1" />
                          <span className="text-[8px] uppercase tracking-wider font-bold">Gallery</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>

                    {/* Text instructions / fallback URL input */}
                    <div className="flex-1 space-y-2">
                      <p className="text-[10px] text-gray-500 font-serif leading-tight">
                        Click the gallery box to upload a photo of the jewelry design from your mobile gallery or files.
                      </p>
                      {image ? (
                        <button
                          type="button"
                          onClick={() => setImage('')}
                          className="text-[9px] font-sans font-bold text-red-500 hover:text-red-400 uppercase tracking-widest block"
                        >
                          Remove Photo
                        </button>
                      ) : (
                        <input 
                          type="text"
                          placeholder="Or paste an image URL instead"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          className="w-full bg-luxury-dark border border-luxury-gold/25 rounded p-1.5 text-[10px] text-white focus:outline-none focus:border-luxury-gold"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-gray-400 block mb-1">Description (Optional)</label>
                  <textarea 
                    rows="2"
                    placeholder="Brief description of the design, carving, or style..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-luxury-dark border border-luxury-gold/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold resize-none"
                  />
                </div>

                {/* Submit / Reset buttons */}
                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-gold-gradient text-luxury-black font-sans text-[10px] tracking-widest uppercase font-bold rounded flex items-center justify-center space-x-1.5 hover:shadow-lg hover:shadow-luxury-gold/10 transition-all"
                  >
                    {editingId ? <Check size={14} /> : <Plus size={14} />}
                    <span>{editingId ? 'Save Changes' : 'Add to Catalog'}</span>
                  </button>
                  {editingId && (
                    <button 
                      type="button"
                      onClick={resetForm}
                      className="px-4 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] tracking-widest uppercase font-bold rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Panel - Products List */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-display-serif text-base uppercase tracking-wider">
                    Live Catalog ({products.length} Items)
                  </h3>
                  <p className="text-gray-500 font-serif text-[11px] mt-0.5">
                    Click Edit to load item details, or Delete to permanently remove it from display.
                  </p>
                </div>
                <button
                  onClick={resetProducts}
                  className="px-3 py-1.5 border border-red-500/20 text-red-500 hover:border-red-500 hover:bg-red-500/10 rounded transition-all flex items-center space-x-1 font-sans text-[9px] tracking-wider uppercase font-semibold"
                >
                  <RotateCcw size={12} />
                  <span>Reset Catalog</span>
                </button>
              </div>

              {/* Scrollable Products Table */}
              <div className="bg-luxury-dark/40 border border-luxury-gold/10 rounded-lg overflow-hidden flex-1 max-h-[50vh] overflow-y-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-luxury-dark text-gray-400 uppercase text-[9px] tracking-wider border-b border-luxury-gold/10">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Metal / Cat</th>
                      <th className="p-3">Weight / Purity</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxury-gold/10 text-gray-300">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-luxury-dark/20 transition-colors">
                        <td className="p-3 flex items-center space-x-2.5">
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            className="w-8 h-8 object-cover rounded border border-luxury-gold/10" 
                          />
                          <span className="font-serif text-white font-medium truncate max-w-[120px]">
                            {p.title}
                          </span>
                        </td>
                        <td className="p-3 capitalize">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            p.metal === 'silver' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-luxury-gold/20 text-luxury-gold'
                          }`}>
                            {p.metal || 'gold'}
                          </span>
                          <span className="text-[10px] text-gray-500 ml-1.5">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-3 text-[10px]">
                          <div>{p.weight}</div>
                          <div className="text-gray-500 text-[9px]">{p.purity}</div>
                        </td>
                        <td className="p-3 text-right text-white font-semibold">
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-1 hover:text-luxury-gold transition-colors"
                              title="Edit item"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1 hover:text-red-500 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
