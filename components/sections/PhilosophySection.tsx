'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';

export const PhilosophySection = () => {
  const { philosophyText } = portfolioData.profile;

  return (
    <section id="philosophie" className="py-32 bg-brand-dark relative overflow-hidden text-brand-beige">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-gold fill-current">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-8">
            How I Build
          </h2>

          <div className="space-y-6">
            {philosophyText.map((text, idx) => (
              <p 
                key={idx} 
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug ${idx === 0 ? 'text-brand-gold' : ''}`}
              >
                "{text}"
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 text-sm font-bold tracking-widest text-brand-beige/50 uppercase">
            <span>Design</span>
            <span className="text-brand-gold">•</span>
            <span>Marketing</span>
            <span className="text-brand-gold">•</span>
            <span>Technology</span>
            <span className="text-brand-gold">•</span>
            <span>AI</span>
            <span className="text-brand-gold">•</span>
            <span>Business</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
