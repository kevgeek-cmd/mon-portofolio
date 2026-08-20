'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ManagedPage {
  id: string;
  name: string;
  platform: string;
  url: string;
  imageUrl: string;
  stats: string;
  description: string;
  order: number;
  isActive: boolean;
}

export default function AdminManagedPagesPage() {
  const [pages, setPages] = useState<ManagedPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<Partial<ManagedPage>>({
    name: '', platform: '', url: '', imageUrl: '', stats: '', description: '', order: 0, isActive: true
  });
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/managed-pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentPage({ ...currentPage, imageUrl: data.url });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erreur lors du téléchargement');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = currentPage.id ? 'PUT' : 'POST';
      const url = currentPage.id ? `/api/managed-pages/${currentPage.id}` : '/api/managed-pages';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPage),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchPages();
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette page ?')) return;
    try {
      await fetch(`/api/managed-pages/${id}`, { method: 'DELETE' });
      fetchPages();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-white">Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-brand-darkCard p-6 rounded-2xl border border-brand-gold/20">
        <div>
          <h1 className="text-2xl font-bold text-brand-gold">Pages Sociales Gérées</h1>
          <p className="text-sm text-brand-beige/70">Gérez les pages de réseaux sociaux que vous administrez (Community Management)</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPage({ name: '', platform: '', url: '', imageUrl: '', stats: '', description: '', order: pages.length, isActive: true });
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
            {currentPage.id ? 'Modifier la page' : 'Nouvelle page sociale'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Nom de la page</label>
              <input
                type="text"
                required
                value={currentPage.name}
                onChange={e => setCurrentPage({...currentPage, name: e.target.value})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
                placeholder="Ex: Entreprise XYZ"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Plateforme</label>
              <input
                type="text"
                required
                value={currentPage.platform}
                onChange={e => setCurrentPage({...currentPage, platform: e.target.value})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
                placeholder="Ex: Facebook, Instagram, LinkedIn"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Statistiques / Abonnés</label>
              <input
                type="text"
                value={currentPage.stats}
                onChange={e => setCurrentPage({...currentPage, stats: e.target.value})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
                placeholder="Ex: +10k Abonnés"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Lien de la page</label>
              <input
                type="url"
                value={currentPage.url}
                onChange={e => setCurrentPage({...currentPage, url: e.target.value})}
                className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Description / Rôle</label>
            <textarea
              rows={3}
              value={currentPage.description}
              onChange={e => setCurrentPage({...currentPage, description: e.target.value})}
              className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
              placeholder="Ex: Gestion quotidienne, création de contenu, ads..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Image de couverture / Profil (URL ou Upload)</label>
            <div className="flex gap-4">
              <input
                type="text"
                required
                value={currentPage.imageUrl}
                onChange={e => setCurrentPage({...currentPage, imageUrl: e.target.value})}
                className="flex-1 p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-white"
                placeholder="https://..."
              />
              <label className="flex items-center justify-center px-4 py-3 bg-brand-dark border border-brand-gold/20 text-brand-gold rounded-xl cursor-pointer hover:bg-brand-gold/10">
                {uploading ? '...' : <ImageIcon className="w-5 h-5" />}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            {currentPage.imageUrl && (
              <div className="mt-4 p-2 bg-brand-dark rounded-xl inline-block">
                <img src={currentPage.imageUrl} alt="Aperçu" className="h-32 object-cover rounded-lg" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map(page => (
            <div key={page.id} className="bg-brand-darkCard rounded-2xl border border-brand-gold/20 overflow-hidden flex flex-col group relative">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity z-10">
                <button onClick={() => { setCurrentPage(page); setIsEditing(true); }} className="p-2 bg-brand-gold text-brand-dark rounded-xl shadow-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(page.id)} className="p-2 bg-red-500 text-white rounded-xl shadow-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="h-40 w-full relative bg-brand-dark">
                <img src={page.imageUrl} alt={page.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-brand-dark/80 backdrop-blur-md rounded-md text-brand-gold text-xs font-bold uppercase">
                  {page.platform}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1">{page.name}</h3>
                {page.stats && <p className="text-brand-gold text-sm font-semibold mb-2">{page.stats}</p>}
                <p className="text-brand-beige/70 text-sm mb-4 line-clamp-2 flex-1">{page.description}</p>
                {page.url && (
                  <a href={page.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-brand-beige hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Visiter la page
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
