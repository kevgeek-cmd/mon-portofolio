'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

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
  settings?: any;
}

export default function LightProjects({ projects, settings }: LightProjectsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!projects || projects.length === 0) return null;

  const titleText = settings?.projectsSectionTitle || "Mes projets récents";
  const words = titleText.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');
  const ctaText = settings?.projectsCtaText || "Voir tous les projets";

  return (
    <section className="py-20 bg-white" id="projets">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
              {firstPart} {lastWord && <span className="text-brand-blue">{lastWord}</span>}
            </h2>
            <div className="w-16 h-1.5 bg-brand-blue rounded-full" />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2 mr-4">
              <button onClick={scrollPrev} className="p-2 rounded-full border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} className="p-2 rounded-full border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/projets" className="flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blueDark transition-colors">
              {ctaText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
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
        </div>

        <div className="mt-10 flex items-center justify-between md:hidden">
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="p-2 rounded-full border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="p-2 rounded-full border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Link href="/projets" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-blueDark transition-colors">
            Voir tous <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
