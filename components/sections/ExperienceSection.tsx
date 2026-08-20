'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { Calendar, Building, CheckCircle2 } from 'lucide-react';

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-brand-darkCard relative overflow-hidden text-brand-beige border-t border-brand-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              EXPÉRIENCE
            </span>
          </div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-gold/30 before:to-transparent">
          
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-dark bg-brand-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative left-0 md:left-auto">
                <Building className="w-4 h-4 text-brand-dark" />
              </div>
              
              {/* Content card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-brand-dark border border-brand-gold/20 hover:border-brand-gold/50 transition-colors shadow-lg">
                <div className="flex items-center gap-2 text-brand-gold mb-3 text-sm font-semibold">
                  <Calendar className="w-4 h-4" />
                  <time>{exp.date}</time>
                </div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <h4 className="text-brand-beige/70 font-medium mb-4">{exp.company}</h4>
                
                <ul className="space-y-2 mt-4 text-sm text-brand-beige/80">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
};
