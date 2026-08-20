'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import Image from 'next/image';

export const PortfolioHero = () => {
  const { name, heroHeading, heroSubheading } = portfolioData.profile;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-brand-bronze/15 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

      {/* Bottom Transition Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none z-10" />

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center">
        
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-brand-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <Image
              src="/images/image kevin.jpg"
              alt={name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-brand-darkCard border border-brand-gold/50 rounded-full p-2">
            <Terminal className="w-4 h-4 text-brand-gold" />
          </div>
        </motion.div>

        {/* Top Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-6 shadow-inner"
        >
          <span>{name}</span>
        </motion.div>

        {/* Hero Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-brand-beigeLight tracking-tight leading-[1.1] uppercase max-w-4xl"
        >
          {heroHeading}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-brand-beige/80 max-w-2xl leading-relaxed"
        >
          {heroSubheading}
        </motion.p>

        {/* CTA Buttons Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#projets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gold-gradient hover:bg-gold-gradient-hover shadow-2xl hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Voir mes projets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-white bg-brand-darkCard/80 border border-brand-gold/30 hover:border-brand-gold/60 backdrop-blur-md transition-all duration-300"
          >
            <span>Me contacter</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
