'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Calendar, Heart } from 'lucide-react';

interface StatsBannerProps {
  settings: any;
}

export default function StatsBanner({ settings }: StatsBannerProps) {
  const stats = [
    {
      icon: <Rocket className="w-6 h-6" />,
      value: `+ ${settings?.statProjects || 30}`,
      label: "Projets réalisés",
      bg: "bg-blue-50",
      color: "text-blue-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: `+ ${settings?.statClients || 15}`,
      label: "Clients satisfaits",
      bg: "bg-indigo-50",
      color: "text-indigo-500"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      value: `+ ${settings?.statExperience || 3}`,
      label: "Années d'expérience",
      bg: "bg-purple-50",
      color: "text-purple-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: `${settings?.statPassion || 100}%`,
      label: "Passion & Engagement",
      bg: "bg-pink-50",
      color: "text-pink-500"
    }
  ];

  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="glass-panel p-8 md:p-12 border-gray-100 shadow-xl rounded-[2rem]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col items-center justify-center text-center ${idx % 2 !== 0 ? 'border-none md:border-solid' : 'border-none md:border-solid'} ${idx === 0 ? 'border-none' : ''}`}
              >
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-brand-gray">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
