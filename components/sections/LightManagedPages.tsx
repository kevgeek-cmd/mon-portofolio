'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface ManagedPage {
  id: string;
  name: string;
  platform: string;
  url: string;
  imageUrl: string;
  stats: string;
  description: string;
}

interface LightManagedPagesProps {
  pages: ManagedPage[];
}

export default function LightManagedPages({ pages }: LightManagedPagesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!pages || pages.length === 0) return null;

  return (
    <section className="py-20 bg-brand-light" id="community-management">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
              Community <span className="text-brand-blue">Management</span>
            </h2>
            <p className="text-brand-gray max-w-2xl">
              Découvrez les marques et pages sociales que j'ai accompagnées pour développer leur audience et leur engagement.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={scrollPrev} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-brand-dark hover:bg-gray-50 hover:shadow transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-brand-dark hover:bg-gray-50 hover:shadow transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden -mx-4 px-4 pb-8" ref={emblaRef}>
          <div className="flex gap-6">
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-50"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={page.imageUrl} 
                    alt={page.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-xl shadow-sm">
                      {page.platform}
                    </span>
                    {page.url && (
                      <a href={page.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-lg hover:scale-110 transition-transform">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{page.name}</h3>
                  {page.stats && (
                    <div className="inline-block px-3 py-1 bg-blue-50 text-brand-blue text-sm font-bold rounded-lg mb-4 self-start">
                      {page.stats}
                    </div>
                  )}
                  <p className="text-brand-gray text-sm leading-relaxed flex-1">
                    {page.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center md:hidden gap-4">
          <button onClick={scrollPrev} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-brand-dark hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollNext} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-brand-dark hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
