import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, RefreshCw, Star, Info, ShieldCheck } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid 
} from 'recharts';

export default function GoldRateDashboard() {
  const { 
    goldRate22K, 
    goldRate24K, 
    silverRate, 
    goldRateHistory 
  } = useApp();

  // Custom styling for Tooltip in Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-luxury-black border border-luxury-gold/40 p-3 rounded shadow-2xl font-sans text-xs">
          <p className="text-white font-bold mb-1.5">{label} Price Index</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }} className="flex justify-between gap-4 py-0.5">
              <span>{item.name}:</span>
              <span className="font-semibold">₹{item.value.toLocaleString('en-IN')}/g</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      id="gold-rates" 
      className="relative py-24 bg-luxury-black overflow-hidden noise-overlay border-b border-luxury-gold/10"
    >
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-radial-glow opacity-30 pointer-events-none" />

      {/* ==================================================== */}
      {/* ANIMATED HORIZONTAL TICKER */}
      {/* ==================================================== */}
      <div className="absolute top-0 left-0 w-full bg-luxury-dark/90 border-b border-luxury-gold/20 py-2.5 z-20">
        <div className="ticker-wrap w-full overflow-hidden">
          <div className="ticker-content inline-block whitespace-nowrap uppercase text-[10px] tracking-[0.25em] font-sans font-semibold text-luxury-gold">
            <span className="mx-8">• LIVE GOLD RATES: 22K Gold ₹{goldRate22K}/g</span>
            <span className="mx-8">• 24K Gold ₹{goldRate24K}/g</span>
            <span className="mx-8">• Silver ₹{silverRate}/g</span>
            <span className="mx-8">• 100% certified BIS 916 hallmarked jewelry</span>
            <span className="mx-8">• zero weight deduction on old gold exchange</span>
            <span className="mx-8">• booking appointments opens daily slots</span>
            
            {/* Duplicate for seamless loop */}
            <span className="mx-8">• LIVE GOLD RATES: 22K Gold ₹{goldRate22K}/g</span>
            <span className="mx-8">• 24K Gold ₹{goldRate24K}/g</span>
            <span className="mx-8">• Silver ₹{silverRate}/g</span>
            <span className="mx-8">• 100% certified BIS 916 hallmarked jewelry</span>
            <span className="mx-8">• zero weight deduction on old gold exchange</span>
            <span className="mx-8">• booking appointments opens daily slots</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
            Market Board
          </span>
          <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase heritage-border-bottom">
            Live Gold Rates
          </h2>
          <p className="text-gray-400 font-serif text-sm max-w-xl mx-auto mt-6 leading-relaxed">
            Stay updated with our certified real-time gold and silver pricing indices. Rates are tracked directly from Chennai gold market trends.
          </p>
        </div>

        {/* Dashboard Cards + Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Rates Columns (2 Columns on grid) */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
            
            {/* Card 22K Gold */}
            <div className="bg-luxury-dark border border-luxury-gold/20 rounded p-5 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-gradient" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-display-serif text-lg font-semibold tracking-wide uppercase">22K Gold Rate</h3>
                  <span className="text-[9px] text-gray-500 font-sans tracking-widest uppercase mt-0.5 block">Recommended for ornaments</span>
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-xs font-sans font-semibold bg-green-500/10 px-2 py-0.5 rounded">
                  <TrendingUp size={12} />
                  <span>+0.3%</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-serif text-luxury-gold">₹{goldRate22K}</span>
                <span className="text-gray-400 text-xs font-sans">per gram</span>
              </div>
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-luxury-gold/10 font-sans text-[10px] text-gray-500">
                <span>Rate per 10 grams:</span>
                <span className="text-white font-bold text-sm font-serif">₹{(goldRate22K * 10).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Card 24K Gold */}
            <div className="bg-luxury-dark border border-luxury-gold/20 rounded p-5 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-gradient" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-display-serif text-lg font-semibold tracking-wide uppercase">24K Gold Rate</h3>
                  <span className="text-[9px] text-gray-500 font-sans tracking-widest uppercase mt-0.5 block">Pure gold coin/bullion index</span>
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-xs font-sans font-semibold bg-green-500/10 px-2 py-0.5 rounded">
                  <TrendingUp size={12} />
                  <span>+0.4%</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-serif text-luxury-gold">₹{goldRate24K}</span>
                <span className="text-gray-400 text-xs font-sans">per gram</span>
              </div>
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-luxury-gold/10 font-sans text-[10px] text-gray-500">
                <span>Rate per 10 grams:</span>
                <span className="text-white font-bold text-sm font-serif">₹{(goldRate24K * 10).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Card Silver */}
            <div className="bg-luxury-dark border border-luxury-gold/20 rounded p-5 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-400" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-display-serif text-lg font-semibold tracking-wide uppercase">Silver Rate</h3>
                  <span className="text-[9px] text-gray-500 font-sans tracking-widest uppercase mt-0.5 block">Sterling silverware index</span>
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-xs font-sans font-semibold bg-green-500/10 px-2 py-0.5 rounded">
                  <TrendingUp size={12} />
                  <span>+0.2%</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold font-serif text-gray-300">₹{silverRate}</span>
                <span className="text-gray-400 text-xs font-sans">per gram</span>
              </div>
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-luxury-gold/10 font-sans text-[10px] text-gray-500">
                <span>Rate per kilogram:</span>
                <span className="text-white font-bold text-sm font-serif">₹{(silverRate * 1000).toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Chart Display (2 Columns on grid) */}
          <div className="lg:col-span-2 bg-luxury-dark border border-luxury-gold/20 rounded p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Header info */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-pulse" />
                <h3 className="text-white font-sans text-xs tracking-widest uppercase font-semibold">Weekly Market Trend</h3>
              </div>
              <div className="flex items-center space-x-1 text-[9px] text-gray-500 font-sans uppercase">
                <RefreshCw size={10} className="animate-spin text-luxury-gold" />
                <span>Auto-refreshing</span>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="h-[250px] w-full font-sans text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={goldRateHistory}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#555" 
                    tickLine={false} 
                    tick={{ fill: '#888', fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="#555" 
                    tickLine={false} 
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tick={{ fill: '#888', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="22K Gold" 
                    name="22K Gold"
                    stroke="#D4AF37" 
                    strokeWidth={2.5} 
                    dot={{ fill: '#D4AF37', r: 3 }}
                    activeDot={{ r: 6, fill: '#FFDF73' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="24K Gold" 
                    name="24K Gold"
                    stroke="#AA7C11" 
                    strokeWidth={1.5} 
                    dot={{ fill: '#AA7C11', r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Note & Assurance */}
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-luxury-gold/10 text-[10px] text-gray-500 font-sans">
              <ShieldCheck className="text-luxury-gold flex-shrink-0" size={14} />
              <p className="leading-normal">
                *Rates displayed are standard daily benchmarks excluding local making charges, GST (3%), and hallmark fees. Old gold value is calculated at 100% conversion rate with no deduction in purity weight.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
