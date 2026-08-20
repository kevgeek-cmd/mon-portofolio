'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Facebook, Instagram, Youtube, Globe } from 'lucide-react';
import Image from 'next/image';

interface LightHeroProps {
  settings: any;
  socialLinks: any[];
}

export default function LightHero({ settings, socialLinks }: LightHeroProps) {
  // Extract blue highlighted part if needed, or just use CSS
  const title = settings?.heroTitle || 'Je transforme des idées en expériences digitales et produits innovants';
  
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="accueil">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              Disponible pour de nouveaux projets
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
              {title.split('expériences digitales').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-brand-blue">expériences digitales</span>}
                </React.Fragment>
              ))}
            </h1>
            
            <p className="text-lg text-brand-gray mb-8 max-w-2xl mx-auto lg:mx-0">
              {settings?.heroSubtitle || "Référent digital polyvalent, créatif et tech, j'accompagne les marques et entreprises dans leur croissance grâce à la communication, la création de contenu, l'IA et la conception de produits."}
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {['Communication', 'Design', 'IA', 'Développement', 'Vidéo', 'Photo'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-white border border-gray-200 text-brand-dark text-sm font-semibold rounded-full shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a 
                href={settings?.heroCtaLink || '#projets'} 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-blueDark transition-all shadow-lg hover:shadow-brand-blue/30 flex items-center justify-center gap-2"
              >
                {settings?.heroCtaText || 'Découvrir mon travail'}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-brand-dark font-bold border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Mail className="w-5 h-5" />
                Me contacter
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-sm font-semibold text-brand-gray">Suivez-moi</span>
              <div className="flex gap-2">
                {socialLinks?.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                  >
                    <img src={social.icon} alt={social.platform} className="w-5 h-5 object-contain" />
                  </a>
                ))}
                {/* Fallback dummy icons if no socialLinks */}
                {!socialLinks?.length && (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-blue"><Globe className="w-4 h-4"/></div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg mx-auto"
          >
            <div className="relative w-full aspect-square">
              {/* Blobs/Gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
              
              {/* Main Image */}
              <div className="absolute inset-0 z-10 flex items-end justify-center">
                <img 
                  src={settings?.heroImageMain || "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80"} 
                  alt="Kevin Stéphane Assamoi" 
                  className="object-contain h-full w-full drop-shadow-2xl"
                />
              </div>

              {/* Floating Widgets */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 z-20"
              >
                <div className="glass-card p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎬</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-dark">Montage Vidéo</p>
                    <p className="text-[10px] text-brand-gray">Premiere Pro, After Effects</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 -left-10 z-20"
              >
                <div className="glass-card p-4">
                  <p className="text-xs text-brand-gray font-semibold">Croissance</p>
                  <p className="text-2xl font-black text-brand-blue">+125%</p>
                  <p className="text-[10px] text-brand-gray">Engagement</p>
                </div>
              </motion.div>

              {/* Floating Icons from Settings */}
              {settings?.heroFloatingIcon1 && (
                <motion.img 
                  src={settings.heroFloatingIcon1} 
                  alt="Icon 1"
                  className="absolute top-0 left-10 w-12 h-12 z-20 drop-shadow-lg"
                  animate={{ y: [0, 15, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              )}
              {settings?.heroFloatingIcon2 && (
                <motion.img 
                  src={settings.heroFloatingIcon2} 
                  alt="Icon 2"
                  className="absolute bottom-1/3 -right-5 w-14 h-14 z-20 drop-shadow-lg"
                  animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
