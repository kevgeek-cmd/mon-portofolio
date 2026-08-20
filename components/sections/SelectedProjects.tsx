'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';
import { ArrowUpRight, Code2, LayoutDashboard } from 'lucide-react';

export const SelectedProjects = () => {
  return (
    <section id="projets" className="py-24 bg-brand-dark relative overflow-hidden text-brand-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              SELECTED PROJECTS
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center mb-20">
          Études de cas & Réalisations
        </h2>

        <div className="space-y-24">
          {portfolioData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row gap-12 items-start"
            >
              {/* Project Info */}
              <div className="w-full lg:w-1/3 flex flex-col space-y-6 sticky top-24">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-brand-gold text-sm font-medium uppercase tracking-widest">{project.type}</p>
                </div>
                
                <p className="text-brand-beige/70 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-brand-gold/10">
                  <p className="text-sm font-semibold text-white mb-1">Rôle</p>
                  <p className="text-brand-beige/80 text-sm">{project.role}</p>
                </div>

                <div className="pt-4 border-t border-brand-gold/10">
                  <p className="text-sm font-semibold text-white mb-1">Statut</p>
                  <p className="text-brand-beige/80 text-sm">{project.status}</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                
                {/* Tech Stack */}
                <div className="bg-brand-darkCard p-8 rounded-3xl border border-brand-gold/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="w-5 h-5 text-brand-gold" />
                    <h4 className="text-lg font-bold text-white">Technologies & Stack</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-medium px-3 py-1.5 rounded-md bg-brand-dark border border-brand-gold/20 text-brand-beige">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concepts & Features */}
                <div className="bg-brand-darkCard p-8 rounded-3xl border border-brand-gold/10">
                  <div className="flex items-center gap-3 mb-6">
                    <LayoutDashboard className="w-5 h-5 text-brand-gold" />
                    <h4 className="text-lg font-bold text-white">Concepts Travaillés</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.concepts.map((concept, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/70" />
                        <span className="text-sm text-brand-beige/80">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
