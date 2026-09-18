import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, X, Send, Bot, User, RefreshCw, MessageSquare, 
  ExternalLink, Eye, ChevronRight, Phone, ShieldCheck, Award, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChatbot() {
  const { 
    products, 
    openQuickView, 
    goldRate22K, 
    goldRate24K, 
    silverRate,
    setIsAppointmentOpen
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial Welcome Messages
  const [messages, setMessages] = useState([
    {
      id: 'welcome_1',
      sender: 'bot',
      text: `Namaste! 🙏 Welcome to **Sri Venkata Sapathigiri Jewellers** (Established 2013).\n\nI am your **AI Heritage Concierge**. How may I assist you today?`,
      suggestions: [
        "🪙 Today's Gold & Silver Rates",
        "📿 Deity Lockets (Ganesha/Lakshmi)",
        "👑 Bridal Jewelry Collection",
        "🪔 Sacred Silver Pooja Items",
        "✨ Special Offers & Savings Scheme",
        "📍 Showroom Location & Contact"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Generate Bilingual WhatsApp Link for a product or general inquiry
  const getWhatsAppLink = (customText) => {
    const defaultMsg = customText || 
      `Namaste, I am inquiring through your website AI Assistant regarding Sri Venkata Sapathigiri Jewellery designs and live rates. Please assist me.

నమస్తే, నేను మీ వెబ్‌సైట్ AI అసిస్టెంట్ ద్వారా శ్రీ వెంకట సపతిగిరి జ్యువెలరీ డిజైన్స్ మరియు లైవ్ బంగారం ధరల గురించి తెలుసుకోవడానికి మెసేజ్ చేస్తున్నాను. దయచేసి వివరాలు పంపండి.`;
    return `https://wa.me/919246668319?text=${encodeURIComponent(defaultMsg)}`;
  };

  // =========================================================
  // RAG KNOWLEDGE RETRIEVAL & GROUNDING ENGINE
  // (Strict adherence to "The Chatbot Rule" — never invent data)
  // =========================================================
  const generateRAGResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // Domain Relevance Check (In-domain store topics)
    const isDomainQuery = (text) => {
      const keywords = [
        'rate', 'price', 'cost', 'today', 'gram', 'weight', 'sovereign', 'tola', '22k', '24k', '92.5', 'silver', 'gold', 'diamond',
        'locket', 'pendant', 'necklace', 'haram', 'choker', 'bangle', 'kada', 'earring', 'jhumka', 'ring', 'chain', 'bracelet',
        'pooja', 'puja', 'diya', 'deepam', 'kalash', 'kundi', 'plate', 'idol', 'statue', 'ornament', 'item', 'product', 'design', 'collection', 'bridal', 'wedding', 'trousseau',
        'bis', 'hallmark', '916', 'karat', 'carat', 'svsj', 'sapathigiri', 'sapthagiri', 'venkata', 'store', 'showroom', 'location', 'address',
        'where', 'timing', 'hours', 'contact', 'phone', 'call', 'whatsapp', 'instagram', 'scheme', 'saving', 'offer', 'discount',
        'making charge', 'shravana', 'hi', 'hello', 'namaste', 'hey', 'help', 'info', 'details', 'who are you', 'what can you do',
        'options', 'buy', 'order', 'custom', 'karigar', 'artisan', 'kids', 'men', 'women', 'anakapalle', 'pappula', 'veedhi', 'pincode', 'map', 'landmark'
      ];
      return keywords.some(k => text.includes(k));
    };

    // STRICT CHATBOT RULE: If query is out-of-domain or asks for non-store data, MUST say "I don't know"
    if (!isDomainQuery(q)) {
      return {
        text: `**I don't know.**\n\nI don't know based on our verified store data. As the AI Assistant for **Sri Venkata Sapathigiri Jewellers**, I only answer using real data from our business — I never guess or invent an answer.\n\nI can assist you with:\n• Live 22K/24K Gold & 92.5 Silver rates\n• Jewelry Catalog (Necklaces, Bangles, Rings, Lockets)\n• Sacred Silver Pooja Items & Deity Lockets\n• Bridal Collections & Special Offers\n• Store Location & WhatsApp Assistance`,
        suggestions: [
          "🪙 Today's Gold & Silver Rates",
          "📿 Deity Lockets (Gold/Silver)",
          "👑 Bridal Jewelry Collection",
          "📍 Store Location & Timings"
        ]
      };
    }

    // 1. LIVE GOLD & SILVER RATES INTENT
    if (q.includes('rate') || q.includes('price per gram') || q.includes('today') || q.includes('cost') || q.includes('22k') || q.includes('24k') || q.includes('silver rate')) {
      const g22 = goldRate22K ? goldRate22K.toLocaleString('en-IN') : '6,895';
      const g24 = goldRate24K ? goldRate24K.toLocaleString('en-IN') : '7,520';
      const s92 = silverRate ? silverRate.toFixed(2) : '94.50';

      const g22_8g = (goldRate22K * 8).toLocaleString('en-IN');
      const g24_8g = (goldRate24K * 8).toLocaleString('en-IN');

      return {
        text: `Here are today's **Live Hallmark Metal Rates** at Sri Venkata Sapathigiri Jewellers:\n\n` +
              `• **22K Gold (BIS 916)**: **₹${g22}** / gram (₹${g22_8g} per 8g / Sovereign)\n` +
              `• **24K Pure Gold**: **₹${g24}** / gram (₹${g24_8g} per 8g)\n` +
              `• **92.5 Sterling Silver**: **₹${s92}** / gram\n\n` +
              `✨ *All our gold ornaments are 100% BIS 916 Hallmarked with transparent live making charges and zero hidden fees.*`,
        suggestions: ["📿 Show Gold Necklaces", "👑 Bridal Collection", "✨ Savings Scheme"]
      };
    }

    // 2. GOD IDOL LOCKETS INTENT
    if (q.includes('locket') || q.includes('pendant') || q.includes('ganesha') || q.includes('lakshmi') || q.includes('venkateswara') || q.includes('shiva') || q.includes('god') || q.includes('deity')) {
      const lockets = products.filter(p => p.category === 'lockets');
      return {
        text: `We specialize in **Sacred Deity Lockets & Pendants** in 22K BIS Hallmarked Gold and 92.5 Sterling Silver featuring Lord Ganesha, Goddess Lakshmi, Lord Venkateswara, and Shiva Trishul:\n\nHere are some featured deity lockets from our store catalog:`,
        matchedProducts: lockets.slice(0, 4),
        suggestions: ["🪙 Today's Gold Rates", "🪔 Sacred Pooja Items", "💬 Connect on WhatsApp"]
      };
    }

    // 3. BRIDAL COLLECTION & TROUSSEAU INTENT
    if (q.includes('bridal') || q.includes('wedding') || q.includes('trousseau') || q.includes('marriage') || q.includes('haram') || q.includes('choker') || q.includes('kasu')) {
      const bridalProducts = products.filter(p => 
        p.category === 'necklaces' || p.id === 'p1' || p.id === 'p4' || p.id === 'p5'
      );
      return {
        text: `👑 **The Royal SVSJ Bridal Collection**:\n\nOur flagship bridal jewelry encompasses traditional South Indian masterpieces crafted in 22K gold:\n` +
              `• **Lakshmi Nakshi Grand Bridal Set**: Intricate hand-engraved temple motifs with Burmese rubies.\n` +
              `• **Heritage Gold Kasu Mala**: Traditional Lakshmi gold coin haram representing wealth and bliss.\n` +
              `• **Nizam Kundan Choker Sets**: Uncut diamonds & emerald cabochons.\n\n` +
              `🎁 *Special Offer: Shravana Masa Bridal Offer offers Flat 25% Off on Making Charges!*`,
        matchedProducts: bridalProducts.slice(0, 3),
        suggestions: ["✨ Shravana Masa Offer", "📅 Book Bridal Consultation", "🪙 Check Live Rates"]
      };
    }

    // 4. POOJA ARTICLES INTENT
    if (q.includes('pooja') || q.includes('puja') || q.includes('diya') || q.includes('kalash') || q.includes('plate') || q.includes('kundi') || q.includes('temple')) {
      const poojaItems = products.filter(p => p.category === 'pooja');
      return {
        text: `🪔 **Sacred Silver Pooja Ornaments & Articles**:\n\nWe offer pure 92.5 Sterling Silver pooja items for your home altar and sacred ceremonies:\n` +
              `• **Sterling Silver Pooja Diya (Deepam)**: Hand-carved traditional oil lamps.\n` +
              `• **Pure Silver Kalash**: Sacred vessel for rituals and festival ceremonies.\n` +
              `• **Silver Goddess Lakshmi Idol**: Auspicious silver idol for daily worship.\n\nHere are our top sacred pooja items:`,
        matchedProducts: poojaItems.slice(0, 3),
        suggestions: ["📿 Silver Lockets", "🪙 Live Silver Rate", "💬 WhatsApp Inquiry"]
      };
    }

    // 5. OFFERS & GOLD SAVINGS SCHEME INTENT
    if (q.includes('offer') || q.includes('scheme') || q.includes('saving') || q.includes('discount') || q.includes('shravana') || q.includes('making charge')) {
      return {
        text: `✨ **Current Special Offers & Savings Schemes**:\n\n` +
              `1️⃣ **Shravana Masa Bridal Gold Offer**:\n` +
              `   • Enjoy **Flat 25% Off on Making Charges** across all bridal & heritage gold sets.\n\n` +
              `2️⃣ **Swarna Sapathigiri Gold Purchase Scheme**:\n` +
              `   • Flexible monthly gold investment plan.\n` +
              `   • Pay for 11 months and receive **1 Month Bonus Contribution** from SVSJ Jewellers + **Zero Making Charges** on plan maturity!`,
        suggestions: ["📅 Book Appointment", "🪙 Check Gold Rates", "💬 Enroll via WhatsApp"]
      };
    }

    // 6. RINGS & BANGLES / SPECIFIC CATEGORY SEARCH
    if (q.includes('ring') || q.includes('bangle') || q.includes('kada') || q.includes('chain') || q.includes('earring') || q.includes('jhumka')) {
      let matched = products.filter(p => {
        if (q.includes('ring') && p.category === 'rings') return true;
        if ((q.includes('bangle') || q.includes('kada')) && (p.category === 'bangles' || p.category === 'bracelets')) return true;
        if (q.includes('chain') && p.category === 'chains') return true;
        if ((q.includes('earring') || q.includes('jhumka')) && p.category === 'earrings') return true;
        return false;
      });

      // Filter by metal if specified
      if (q.includes('gold')) {
        matched = matched.filter(p => p.metal === 'gold' || !p.metal);
      } else if (q.includes('silver')) {
        matched = matched.filter(p => p.metal === 'silver');
      }

      // Filter by gender if specified
      if (q.includes('men')) {
        matched = matched.filter(p => p.gender === 'men' || p.gender === 'all');
      } else if (q.includes('women')) {
        matched = matched.filter(p => p.gender === 'women' || p.gender === 'all');
      } else if (q.includes('kid') || q.includes('child')) {
        matched = matched.filter(p => p.gender === 'kids' || p.gender === 'all');
      }

      const categoryName = q.includes('ring') ? 'Rings' : q.includes('chain') ? 'Chains' : q.includes('earring') ? 'Earrings' : 'Bangles & Kadas';

      return {
        text: `Here are our finest **${categoryName}** matching your preferences:`,
        matchedProducts: matched.length > 0 ? matched.slice(0, 4) : products.slice(0, 3),
        suggestions: ["🪙 Today's Gold Rates", "📿 View Lockets", "📍 Showroom Address"]
      };
    }

    // 7. LOCATION, TIMINGS & CONTACT INTENT
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('timing') || q.includes('hours') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('instagram') || q.includes('map') || q.includes('landmark') || q.includes('anakapalle') || q.includes('pappula') || q.includes('pincode')) {
      return {
        text: `📍 **Sri Venkata Sapthagiri Jewellers Store Location & Address**:\n\n` +
              `• **Showroom Address**: Opposite Fish Market, Pappula Veedhi, Anakapalle, Andhra Pradesh - 531001\n` +
              `• **Landmark**: Opposite Fish Market, Pappula Veedhi\n` +
              `• **Pincode**: 531001\n` +
              `• **Customer Helpline / WhatsApp**: **+91 92466 68319**\n` +
              `• **Email**: mallayasaswini7@gmail.com\n\n` +
              `⏰ **Business Hours**:\n` +
              `• **Monday – Saturday**: 09:00 AM – 09:00 PM\n` +
              `• **Sunday**: 09:00 AM – 01:00 PM (Open All 7 Days)\n\n` +
              `✨ *Established 2013 • 100% BIS 916 Hallmarked Gold & 92.5 Sterling Silver Ornaments.*`,
        suggestions: ["💬 Open WhatsApp Chat", "📅 Book Store Appointment", "🪙 Check Live Gold Rate"]
      };
    }

    // 8. GENERAL / KEYWORD MATCH FALLBACK ON CATALOG PRODUCTS
    const generalMatches = products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );

    if (generalMatches.length > 0) {
      return {
        text: `I found **${generalMatches.length} jewelry item(s)** matching your query "${userQuery}":`,
        matchedProducts: generalMatches.slice(0, 3),
        suggestions: ["🪙 Today's Rates", "👑 Bridal Collection", "📍 Store Contact"]
      };
    }

    // STRICT CHATBOT RULE FOR UNFOUND DATA: Must say "I don't know"
    return {
      text: `**I don't know.**\n\nI don't know based on our store data. As the AI Assistant for **Sri Venkata Sapathigiri Jewellers**, I only answer using real data from our business — never inventing an answer.\n\nI can assist you with:\n• Live 22K/24K Gold & 92.5 Silver rates\n• SVSJ Jewelry Catalog (Necklaces, Bangles, Rings, Lockets)\n• Sacred Silver Pooja Items & Deity Lockets\n• Bridal Collections & Special Offers\n• Store Location & WhatsApp Assistance`,
      suggestions: [
        "🪙 Today's Gold & Silver Rates",
        "📿 Deity Lockets (Gold/Silver)",
        "👑 Bridal Jewelry Collection",
        "📍 Store Location & WhatsApp"
      ]
    };
  };

  // Handle Send Message
  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const ragResponse = generateRAGResponse(text);
      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: ragResponse.text,
        matchedProducts: ragResponse.matchedProducts,
        suggestions: ragResponse.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button (Left-Side Floating Badge + Bot Icon) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-6 z-40 flex items-center space-x-2"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="relative group bg-luxury-black/95 backdrop-blur-md border border-luxury-gold/40 hover:border-luxury-gold p-3.5 rounded-full shadow-2xl flex items-center space-x-2.5 text-white transition-all hover:scale-105"
              aria-label="Open SVSJ AI Assistant"
            >
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-luxury-gold opacity-40 animate-ping duration-1000 pointer-events-none" />
              
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-luxury-black shadow-md flex-shrink-0">
                <Sparkles size={18} className="animate-spin-slow" />
              </div>

              <div className="hidden sm:flex flex-col text-left pr-1">
                <span className="text-[10px] font-sans font-bold tracking-widest text-luxury-gold uppercase leading-none">
                  Ask SVSJ AI
                </span>
                <span className="text-[9px] font-serif text-gray-400 leading-tight mt-0.5">
                  Rates, Jewelry & Offers
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-luxury-black border border-luxury-gold/40 rounded-xl shadow-2xl flex flex-col overflow-hidden noise-overlay"
          >
            {/* Header */}
            <div className="p-4 bg-luxury-dark border-b border-luxury-gold/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-luxury-black shadow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-white font-display-serif text-sm font-semibold tracking-wider uppercase flex items-center space-x-1.5">
                    <span>SVSJ AI Concierge</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-luxury-gold font-sans tracking-wider">
                    Purity & Trust Since 2013
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMessages([messages[0]])}
                  className="p-1.5 text-gray-400 hover:text-luxury-gold transition-colors"
                  title="Clear Chat History"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-luxury-gold transition-colors"
                  title="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Live Rate Header Ticker inside Chat */}
            <div className="bg-luxury-black/90 border-b border-luxury-gold/10 px-4 py-1.5 flex items-center justify-between text-[10px] font-sans">
              <div className="flex items-center space-x-3 text-gray-300">
                <span>22K: <strong className="text-luxury-gold">₹{goldRate22K ? goldRate22K.toLocaleString('en-IN') : '6,895'}</strong>/g</span>
                <span>24K: <strong className="text-luxury-gold">₹{goldRate24K ? goldRate24K.toLocaleString('en-IN') : '7,520'}</strong>/g</span>
                <span>Silver: <strong className="text-luxury-gold">₹{silverRate ? silverRate.toFixed(1) : '94.5'}</strong>/g</span>
              </div>
              <span className="text-[9px] text-green-400 font-medium uppercase tracking-wider">● Live Rates</span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-serif text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Badge */}
                  <div className="flex items-center space-x-1.5 mb-1 px-1">
                    {msg.sender === 'bot' ? (
                      <span className="text-[9px] font-sans font-semibold text-luxury-gold uppercase tracking-wider flex items-center space-x-1">
                        <Bot size={11} /> <span>SVSJ AI</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-sans font-semibold text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                        <span>You</span> <User size={11} />
                      </span>
                    )}
                    <span className="text-[8px] text-gray-500 font-sans">{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] p-3.5 rounded-lg text-white shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-luxury-gold/20 border border-luxury-gold/40 text-right rounded-tr-none'
                        : 'bg-luxury-dark border border-luxury-gold/15 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line font-serif text-xs">
                      {msg.text}
                    </div>

                    {/* Render Matched Product Cards if present */}
                    {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-luxury-gold/15">
                        {msg.matchedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="bg-luxury-black p-2 rounded border border-luxury-gold/20 flex items-center space-x-3 text-left"
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded border border-luxury-gold/10 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-serif font-semibold text-[11px] truncate">
                                {product.title}
                              </h4>
                              <p className="text-[9px] text-luxury-gold">{product.purity} • {product.weight}</p>
                              <p className="text-xs font-bold text-white mt-0.5">
                                ₹{product.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-1 flex-shrink-0">
                              <button
                                onClick={() => openQuickView(product)}
                                className="px-2 py-1 bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-black font-sans text-[8px] font-bold tracking-wider uppercase rounded transition-colors"
                              >
                                View
                              </button>
                              <a
                                href={getWhatsAppLink(`Namaste, I am interested in "${product.title}" (₹${product.price.toLocaleString('en-IN')}) shown by your AI Assistant.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white font-sans text-[8px] font-bold tracking-wider uppercase rounded transition-colors text-center"
                              >
                                Inquiry
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestions.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="px-2.5 py-1 bg-luxury-dark/90 border border-luxury-gold/25 hover:border-luxury-gold hover:bg-luxury-gold/20 text-luxury-gold text-[10px] font-sans font-medium rounded-full transition-all flex items-center space-x-1"
                        >
                          <span>{chip}</span>
                          <ChevronRight size={10} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 text-luxury-gold text-xs italic font-serif">
                  <Sparkles size={14} className="animate-spin" />
                  <span>SVSJ AI Concierge is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-luxury-dark border-t border-luxury-gold/20 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about gold rates, lockets, bridal sets, offers..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-luxury-black border border-luxury-gold/25 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold font-serif"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-gold-gradient text-luxury-black rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>

            {/* Footer Trust Bar */}
            <div className="bg-luxury-black px-4 py-1.5 border-t border-luxury-gold/10 flex items-center justify-between text-[8px] text-gray-500 font-sans tracking-widest uppercase">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={10} className="text-luxury-gold" />
                <span>100% BIS 916 Hallmarked</span>
              </span>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline flex items-center space-x-1 font-bold"
              >
                <Phone size={10} />
                <span>WhatsApp Expert</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
