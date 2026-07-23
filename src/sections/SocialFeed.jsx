import React from 'react';
import { SOCIAL_POSTS } from '../utils/data';
import { Heart, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { motion } from 'framer-motion';

export default function SocialFeed() {
  return (
    <section className="relative py-24 bg-luxury-black border-t border-luxury-gold/10 noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <span className="text-[10px] tracking-[0.3em] font-sans font-bold text-luxury-gold uppercase block mb-1">
              Social Connection
            </span>
            <h2 className="text-white font-display-serif text-3xl sm:text-4xl tracking-widest uppercase">
              Follow Us on Instagram
            </h2>
            <p className="text-gray-500 font-sans text-xs tracking-wider mt-1">
              Join our community of over 150k followers for daily updates on gold rates and new designs.
            </p>
          </div>

          <a 
            href="https://www.instagram.com/newsrivenkata" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 border border-luxury-gold text-luxury-gold font-sans text-[10px] tracking-widest uppercase font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all flex items-center space-x-1.5"
          >
            <InstagramIcon size={14} />
            <span>@newsrivenkata</span>
          </a>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded border border-luxury-gold/10 hover:border-luxury-gold/45 group shadow-md"
            >
              
              {/* Image */}
              <img 
                src={post.image} 
                alt="Instagram jewelry post" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-luxury-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-10 font-sans text-xs">
                
                <div className="flex items-center space-x-1 text-white">
                  <Heart size={14} className="text-red-500 fill-current" />
                  <span className="font-bold">{post.likes}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-white">
                  <MessageCircle size={14} className="text-luxury-gold fill-current" />
                  <span className="font-bold">{post.comments}</span>
                </div>

              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
