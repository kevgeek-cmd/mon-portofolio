'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Terminal } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export const ContactSection = () => {
  const { email, linkedin, github } = portfolioData.contact;
  const { name, title } = portfolioData.profile;

  return (
    <section id="contact" className="py-24 bg-brand-darkCard relative overflow-hidden border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              CONTACT
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-lg text-brand-beige/70">
            {name} <span className="mx-2 text-brand-gold">•</span> {title}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          
          {/* Email */}
          <a href={`mailto:${email}`} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-sm text-brand-beige/60 break-all">{email}</p>
          </a>

          {/* LinkedIn */}
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold mb-2">LinkedIn</h3>
            <p className="text-sm text-brand-beige/60 break-all">{linkedin}</p>
          </a>

          {/* GitHub */}
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all group">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5 text-brand-gold" />
            </div>
            <h3 className="text-white font-bold mb-2">GitHub</h3>
            <p className="text-sm text-brand-beige/60 break-all">{github}</p>
          </a>

        </div>

      </div>
    </section>
  );
};
