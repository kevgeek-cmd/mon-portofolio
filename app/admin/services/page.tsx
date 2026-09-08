'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
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
        setSuccessMsg(editingItem ? 'Compétence mise à jour' : 'Compétence créée');
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
            Personnalisez la grille 6-matrix des compétences de votre portfolio.
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
          <p className="text-zinc-400 text-sm">Aucune compétence personnalisée pour le moment (les valeurs par défaut s'affichent).</p>
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
                  <span className="material-symbols-outlined text-2xl text-[#FF7A00]">
                    {s.icon}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Ordre: {s.order}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">
                  ● {s.tags || 'Architecture • Performance'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
                  Icône (Material Symbol ou nom d'icône)
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
