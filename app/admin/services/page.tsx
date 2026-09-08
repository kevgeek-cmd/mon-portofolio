'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, CheckCircle, RefreshCw, Star, ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string | null;
  percentage: number | null;
  rating: number | null;
  tags: string | null;
  isActive: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'code_blocks',
    image: '',
    percentage: 90,
    rating: 5,
    tags: '',
    isActive: true,
    order: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      icon: 'code_blocks',
      image: '',
      percentage: 90,
      rating: 5,
      tags: 'Discovery • Wireframes • User Flow',
      isActive: true,
      order: services.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Service) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      image: item.image || '',
      percentage: typeof item.percentage === 'number' ? item.percentage : 90,
      rating: typeof item.rating === 'number' ? item.rating : 5,
      tags: item.tags || '',
      isActive: item.isActive !== undefined ? item.isActive : true,
      order: item.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingItem ? `/api/services/${editingItem.id}` : '/api/services';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setSuccessMsg(editingItem ? 'Compétence mise à jour avec succès' : 'Compétence créée avec succès');
        setTimeout(() => setSuccessMsg(null), 3000);
        fetchServices();
      }
    } catch (err) {
      console.error('Error saving service:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
        setSuccessMsg('Compétence supprimée');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const suggestedIcons = [
    { name: 'devices', label: 'Product Design' },
    { name: 'grid_view', label: 'UI/UX & Tokens' },
    { name: 'code_blocks', label: 'Web Apps / Code' },
    { name: 'smart_toy', label: 'AI & Agents' },
    { name: 'phone_iphone', label: 'Mobile App' },
    { name: 'blur_on', label: 'Brand 3D' },
    { name: 'palette', label: 'Design' },
    { name: 'rocket_launch', label: 'Launch' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gestion des Compétences &amp; Services
          </h1>
          <p className="text-sm text-brand-beige/70 mt-1">
            Personnalisez vos compétences, ajoutez des images illustratives et définissez le niveau d'expertise (pourcentage et étoiles).
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une compétence</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center p-16">
          <RefreshCw className="w-8 h-8 text-[#FF7A00] animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-brand-darkCard border border-brand-gold/15">
          <p className="text-zinc-400 text-sm">Aucune compétence personnalisée pour le moment.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
          >
            Créer la première compétence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-6 rounded-2xl bg-brand-darkCard border border-brand-gold/20 flex flex-col justify-between relative group hover:border-[#FF7A00]/50 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {s.image ? (
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-10 h-10 rounded-xl object-cover border border-white/10" 
                    />
                  ) : (
                    <span className="material-symbols-outlined text-2xl text-[#FF7A00]">
                      {s.icon}
                    </span>
                  )}

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5 text-[#FF7A00]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < (s.rating || 5) ? 'fill-[#FF7A00] text-[#FF7A00]' : 'text-zinc-600'}`} 
                        />
                      ))}
                    </div>
                    {typeof s.percentage === 'number' && (
                      <span className="text-[10px] font-mono font-bold text-[#FF7A00] bg-[#FF7A00]/10 px-2 py-0.5 rounded-full border border-[#FF7A00]/20">
                        {s.percentage}%
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10">
                {/* Progress bar */}
                {typeof s.percentage === 'number' && (
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FF7A00] to-[#FFB066] h-full rounded-full"
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">
                    ● {s.tags || 'Architecture • Performance'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white"
                      title="Modifier"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scroll">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editingItem ? 'Modifier la Compétence' : 'Nouvelle Compétence'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Titre de la compétence
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                  placeholder="Ex: Product Design"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Image / Illustration illustrative (Optionnel)
                </label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  placeholder="Téléverser une image ou laisser vide pour l'icône"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Icône (si aucune image n'est choisie)
                </label>
                <input
                  type="text"
                  required
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                  placeholder="Ex: devices, grid_view, code_blocks, smart_toy"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {suggestedIcons.map((ic) => (
                    <button
                      key={ic.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: ic.name })}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
                        formData.icon === ic.name
                          ? 'bg-[#FF7A00] text-black border-[#FF7A00] font-bold'
                          : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {ic.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Niveau (%) : {formData.percentage}%
                    </label>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) || 90 })}
                    className="w-full accent-[#FF7A00] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Note / Étoiles (1 à 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 text-xl transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-[#FF7A00] text-[#FF7A00]'
                              : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-white ml-2">
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                  placeholder="Description du champ d'expertise..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Tags techniques (séparés par •)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                  placeholder="Ex: Discovery • Wireframes • User Flow"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
