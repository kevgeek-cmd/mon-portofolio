'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';

export const AboutSection = () => {
  const { aboutText } = portfolioData.profile;

  return (
    <section id="a-propos" className="py-24 bg-brand-darkCard relative overflow-hidden text-brand-beige border-t border-brand-gold/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              À PROPOS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-12 flex flex-col space-y-8 text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              À l'intersection de la communication, du design et de la tech
            </h2>

            <div className="space-y-6 text-base sm:text-lg lg:text-xl text-brand-beige/80 leading-relaxed max-w-4xl mx-auto">
              {aboutText.map((paragraph, index) => (
                <p key={index} className={index === aboutText.length - 1 ? "font-semibold text-brand-gold mt-8" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};
