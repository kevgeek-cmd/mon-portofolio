'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Code, Rocket } from 'lucide-react';

export const AIVibeCodingSection = () => {
  return (
    <section id="ai-vibe-coding" className="py-24 bg-brand-darkCard relative overflow-hidden text-brand-beige border-t border-brand-gold/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              AI & VIBE CODING
            </span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            L'IA comme multiplicateur de compétences
          </h2>
          <p className="text-lg text-brand-beige/80 leading-relaxed">
            Le <strong className="text-brand-gold font-semibold">Vibe Coding</strong> n'est pas "laisser l'IA coder à ma place". C'est utiliser l'intelligence artificielle comme un levier puissant tout en conservant une compréhension technique fondamentale pour contrôler, tester et perfectionner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 relative overflow-hidden group hover:border-brand-gold/30 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Bot className="w-24 h-24 text-brand-gold" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Native</h3>
            <p className="text-sm text-brand-beige/70 leading-relaxed">
              Intégration d'outils comme Antigravity, OpenAI, Gemini et Vercel AI pour accélérer la réflexion, le prototypage et la production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 relative overflow-hidden group hover:border-brand-gold/30 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code className="w-24 h-24 text-brand-gold" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Background Technique</h3>
            <p className="text-sm text-brand-beige/70 leading-relaxed">
              Une véritable compréhension du code (React, Next.js, bases de données) permettant d'auditer et d'améliorer ce qui est généré.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-brand-dark border border-brand-gold/10 relative overflow-hidden group hover:border-brand-gold/30 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Rocket className="w-24 h-24 text-brand-gold" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Vitesse & Agilité</h3>
            <p className="text-sm text-brand-beige/70 leading-relaxed">
              Passer d'une idée abstraite à un produit fonctionnel et déployé en un temps record sans compromettre la qualité.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
