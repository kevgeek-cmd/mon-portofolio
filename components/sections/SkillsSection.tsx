'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { Share2, Code, Database, Palette, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    title: "Digital & Communication",
    icon: Share2,
    skills: portfolioData.skills.digital
  },
  {
    title: "Web Development",
    icon: Code,
    skills: portfolioData.skills.web
  },
  {
    title: "Backend & Infrastructure",
    icon: Database,
    skills: portfolioData.skills.backend
  },
  {
    title: "Design & Création",
    icon: Palette,
    skills: portfolioData.skills.design
  },
  {
    title: "Intelligence Artificielle",
    icon: Sparkles,
    skills: portfolioData.skills.ai
  }
];

export const SkillsSection = () => {
  return (
    <section id="competences" className="py-24 bg-brand-dark relative overflow-hidden text-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              COMPÉTENCES
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center mb-16">
          L'expertise hybride
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-brand-darkCard p-8 rounded-3xl border border-brand-gold/10 hover:border-brand-gold/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-dark border border-brand-gold/20 text-brand-beige/80 hover:text-brand-gold hover:border-brand-gold/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};
