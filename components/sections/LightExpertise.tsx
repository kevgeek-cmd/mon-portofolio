'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, MonitorPlay, Code, Bot, Video, Camera } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface LightExpertiseProps {
  services: Service[];
  settings?: any;
}

export default function LightExpertise({ services, settings }: LightExpertiseProps) {
  // Mapping string icon names to Lucide icons + specific colors for the light theme
  const getIconData = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'megaphone': return { icon: <Megaphone className="w-6 h-6" />, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'monitorplay': return { icon: <MonitorPlay className="w-6 h-6" />, color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'code': return { icon: <Code className="w-6 h-6" />, color: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'bot': return { icon: <Bot className="w-6 h-6" />, color: 'text-orange-600', bg: 'bg-orange-50' };
      case 'video': return { icon: <Video className="w-6 h-6" />, color: 'text-red-600', bg: 'bg-red-50' };
      case 'camera': return { icon: <Camera className="w-6 h-6" />, color: 'text-teal-600', bg: 'bg-teal-50' };
      default: return { icon: <Code className="w-6 h-6" />, color: 'text-brand-blue', bg: 'bg-blue-50' };
    }
  };

  const titleText = settings?.expertiseSectionTitle || "Mes domaines d'expertise";
  // Attempt to colorize the last word if it's multiple words
  const words = titleText.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const firstPart = words.join(' ');

  return (
    <section className="py-20 bg-brand-light" id="services">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
            {firstPart} {lastWord && <span className="text-brand-blue">{lastWord}</span>}
          </h2>
          <div className="w-16 h-1.5 bg-brand-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const { icon, color, bg } = getIconData(service.icon);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>
                
                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  {service.title}
                </h3>
                
                <p className="text-brand-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
