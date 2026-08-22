'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface LightContactProps {
  settings: any;
}

export default function LightContact({ settings }: LightContactProps) {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-blue to-purple-600 overflow-hidden relative shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            
            {/* Left Content */}
            <div className="flex-1 p-10 md:p-16 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight whitespace-pre-wrap">
                {settings?.contactTitle || "Vous avez un projet ?\nParlons-en !"}
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-md whitespace-pre-wrap">
                {settings?.contactSubtitle || "Je suis disponible pour de nouvelles opportunités et la création de vos prochains produits digitaux."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`mailto:${settings?.companyEmail || 'contact@kevinstephene.com'}`}
                  className="px-8 py-4 bg-white text-brand-blue font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {settings?.contactPrimaryBtnText || 'Me contacter'}
                </a>
                <a 
                  href="#projets"
                  className="px-8 py-4 bg-brand-blue/20 text-white font-bold rounded-xl border border-white/20 flex items-center justify-center gap-2 hover:bg-brand-blue/30 transition-colors"
                >
                  {settings?.contactSecondaryBtnText || 'Voir mes services'}
                </a>
              </div>
            </div>

            {/* Right Content / Contact Info */}
            <div className="w-full md:w-[450px] p-10 bg-white/10 backdrop-blur-md h-full md:min-h-[400px] flex flex-col justify-center border-l border-white/10">
              <div className="space-y-8">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-blue-200 text-sm font-semibold mb-1">Email</h4>
                    <a href={`mailto:${settings?.companyEmail || 'contact@kevinstephene.com'}`} className="text-white font-bold hover:underline">
                      {settings?.companyEmail || 'contact@kevinstephene.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-blue-200 text-sm font-semibold mb-1">Téléphone</h4>
                    <a href={`tel:${settings?.companyPhone || '+225 0000000000'}`} className="text-white font-bold hover:underline">
                      {settings?.companyPhone || '+225 0000000000'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-blue-200 text-sm font-semibold mb-1">Localisation</h4>
                    <p className="text-white font-bold">
                      {settings?.companyAddress || "Côte d'Ivoire"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
