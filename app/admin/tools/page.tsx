'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import ImageUploader from '@/components/admin/ImageUploader';

interface Tool {
  id: string;
  name: string;
  iconUrl: string;
  order: number;
  isActive: boolean;
}

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Partial<Tool>>({
    name: '', iconUrl: '', order: 0, isActive: true
  });
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      setTools(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Upload handled by ImageUploader now

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = currentTool.id ? 'PUT' : 'POST';
      const url = currentTool.id ? `/api/tools/${currentTool.id}` : '/api/tools';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTool),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchTools();
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet outil ?')) return;
    try {
      await fetch(`/api/tools/${id}`, { method: 'DELETE' });
      fetchTools();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-white">Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-brand-darkCard p-6 rounded-2xl border border-brand-gold/20">
        <div>
          <h1 className="text-2xl font-bold text-brand-gold">Outils & Technologies</h1>
          <p className="text-sm text-brand-beige/70">Gérez les logos qui défilent sur la page d'accueil</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentTool({ name: '', iconUrl: '', order: tools.length, isActive: true });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-dark rounded-xl font-bold hover:bg-brand-goldHover"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-brand-darkCard p-6 rounded-2xl border border-brand-gold/20 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">
            {currentTool.id ? 'Modifier l\'outil' : 'Nouvel outil'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Nom de l'outil (ex: Figma)</label>
              <input
                type="text"
                required
                value={currentTool.name}
                onChange={e => setCurrentTool({...currentTool, name: e.target.value})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Ordre d'affichage</label>
              <input
                type="number"
                value={currentTool.order}
                onChange={e => setCurrentTool({...currentTool, order: parseInt(e.target.value) || 0})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Logo (URL ou Upload)</label>
            <ImageUploader
              value={currentTool.iconUrl || ''}
              onChange={(url) => setCurrentTool({ ...currentTool, iconUrl: url })}
            />
            {currentTool.iconUrl && (
              <div className="mt-4 p-4 bg-white rounded-xl inline-block">
                <img src={currentTool.iconUrl} alt="Aperçu" className="h-12 object-contain" />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t border-brand-gold/20">
            <button type="submit" className="px-6 py-2 bg-brand-gold text-brand-dark rounded-xl font-bold flex items-center gap-2">
              <Save className="w-4 h-4" /> Enregistrer
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-brand-dark text-white rounded-xl font-bold flex items-center gap-2">
              <X className="w-4 h-4" /> Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tools.map(tool => (
            <div key={tool.id} className="bg-brand-darkCard p-4 rounded-2xl border border-brand-gold/20 flex flex-col items-center gap-3 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                <button onClick={() => { setCurrentTool(tool); setIsEditing(true); }} className="p-1.5 bg-brand-gold text-brand-dark rounded-md">
                  <Edit2 className="w-3 h-3" />
                </button>
                <button onClick={() => handleDelete(tool.id)} className="p-1.5 bg-red-500 text-white rounded-md">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center">
                <img src={tool.iconUrl} alt={tool.name} className="max-w-full max-h-full object-contain" />
              </div>
              <span className="text-sm font-bold text-white text-center truncate w-full">{tool.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
