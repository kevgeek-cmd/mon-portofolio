'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  category?: { name: string } | null;
}

interface LightProjectsProps {
  projects: Project[];
}

export default function LightProjects({ projects }: LightProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="projets">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
              Mes projets <span className="text-brand-blue">récents</span>
            </h2>
            <div className="w-16 h-1.5 bg-brand-blue rounded-full" />
          </div>
          <Link href="/projets" className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blueDark transition-colors">
            Voir tous les projets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-light">
                <img 
                  src={project.coverImage} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    {project.category.name}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-brand-dark mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-brand-gray text-sm mb-4 line-clamp-2 flex-1">{project.summary}</p>
                <Link href={`/projets/${project.slug}`} className="inline-flex items-center gap-2 text-brand-blue text-sm font-bold hover:text-brand-blueDark transition-colors mt-auto">
                  Voir le projet <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/projets" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blueDark transition-colors">
            Voir tous les projets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
