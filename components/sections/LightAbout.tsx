'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Wrench, TrendingUp, Sparkles, MapPin, Globe } from 'lucide-react';

interface LightAboutProps {
  settings: any;
}

export default function LightAbout({ settings }: LightAboutProps) {
  return (
    <section className="py-20 bg-white" id="a-propos">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-brand-light">
              <img 
                src={settings?.aboutImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                alt="À propos"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 glass-card p-6 flex flex-col items-center justify-center min-w-[140px]"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-brand-dark">+ {settings?.statExperience || 3} ans</span>
              <span className="text-xs text-brand-gray text-center leading-tight mt-1">d'expérience<br/>dans le digital</span>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                À propos de <span className="text-brand-blue">moi</span>
              </h2>
              <p className="text-brand-gray leading-relaxed mb-4">
                {settings?.aboutMainText || "Je suis Kevin Stéphane Assamoi, Référent Digital et AI Product Builder basé en Côte d'Ivoire."}
              </p>
              <p className="text-brand-gray leading-relaxed mb-6">
                {settings?.aboutSubText || "Passionné par le digital, la créativité et la technologie, j'interviens à la croisée de la communication, du design et du développement pour aider les marques à se démarquer et à atteindre leurs objectifs. De la stratégie digitale à la création de contenu, en passant par la conception de sites web, le montage vidéo, la photographie et l'IA, j'apporte une approche 360° à chaque projet."}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-light rounded-full text-sm font-semibold text-brand-dark border border-gray-100">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  Basé en Côte d'Ivoire
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-light rounded-full text-sm font-semibold text-brand-dark border border-gray-100">
                  <Globe className="w-4 h-4 text-brand-blue" />
                  Disponible à distance
                </div>
              </div>
              
              <button className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blueDark transition-colors shadow-md">
                En savoir plus sur mon parcours
              </button>
            </div>

            {/* 4 Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-brand-blue">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{settings?.aboutValue1Title || "Créativité"}</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-snug">{settings?.aboutValue1Desc || "Des idées uniques et percutantes"}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-brand-blue">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{settings?.aboutValue2Title || "Polyvalence"}</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-snug">{settings?.aboutValue2Desc || "Une expertise multi-compétences"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-brand-blue">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{settings?.aboutValue3Title || "Résultats"}</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-snug">{settings?.aboutValue3Desc || "Des solutions orientées impact"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-brand-blue">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{settings?.aboutValue4Title || "Innovation"}</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-snug">{settings?.aboutValue4Desc || "IA & nouvelles technologies"}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
