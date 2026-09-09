'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Check, 
  Share2, 
  Sparkles, 
  Layers, 
  Eye, 
  EyeOff, 
  X,
  Search,
  Globe,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
  order: number;
}

const PRESET_ICONS = [
  { id: 'linkedin', label: 'LinkedIn', iconName: 'work', defaultUrl: 'https://linkedin.com/in/' },
  { id: 'github', label: 'GitHub', iconName: 'code', defaultUrl: 'https://github.com/' },
  { id: 'twitter', label: 'Twitter / X', iconName: 'sports_volleyball', defaultUrl: 'https://x.com/' },
  { id: 'instagram', label: 'Instagram', iconName: 'photo_camera', defaultUrl: 'https://instagram.com/' },
  { id: 'tiktok', label: 'TikTok', iconName: 'music_note', defaultUrl: 'https://tiktok.com/@' },
  { id: 'youtube', label: 'YouTube', iconName: 'smart_display', defaultUrl: 'https://youtube.com/@' },
  { id: 'whatsapp', label: 'WhatsApp', iconName: 'chat', defaultUrl: 'https://wa.me/' },
  { id: 'facebook', label: 'Facebook', iconName: 'groups', defaultUrl: 'https://facebook.com/' },
  { id: 'dribbble', label: 'Dribbble', iconName: 'palette', defaultUrl: 'https://dribbble.com/' },
  { id: 'behance', label: 'Behance', iconName: 'brush', defaultUrl: 'https://behance.net/' },
  { id: 'figma', label: 'Figma Community', iconName: 'draw', defaultUrl: 'https://figma.com/@' },
  { id: 'discord', label: 'Discord', iconName: 'forum', defaultUrl: 'https://discord.gg/' },
  { id: 'telegram', label: 'Telegram', iconName: 'send', defaultUrl: 'https://t.me/' },
  { id: 'twitch', label: 'Twitch', iconName: 'videogame_asset', defaultUrl: 'https://twitch.tv/' },
  { id: 'medium', label: 'Medium', iconName: 'article', defaultUrl: 'https://medium.com/@' },
  { id: 'spotify', label: 'Spotify', iconName: 'headphones', defaultUrl: 'https://open.spotify.com/user/' },
  { id: 'email', label: 'Email Direct', iconName: 'mail', defaultUrl: 'mailto:' },
  { id: 'website', label: 'Site Web / Blog', iconName: 'globe', defaultUrl: 'https://' },
];

export default function AdminSocialLinksPage() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [iconSearch, setIconSearch] = useState('');

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: 'link',
    isActive: true,
    order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchSocials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/social-links');
      if (res.ok) {
        const data = await res.json();
        setSocials(data || []);
      }
    } catch (err) {
      console.error('Error fetching socials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      platform: '',
      url: '',
      icon: 'work',
      isActive: true,
      order: socials.length,
    });
    setErrorMsg(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item: SocialLink) => {
    setEditingId(item.id);
    setFormData({
      platform: item.platform,
      url: item.url,
      icon: item.icon,
      isActive: item.isActive,
      order: item.order,
    });
    setErrorMsg(null);
    setShowModal(true);
  };

  const handleSelectPreset = (preset: typeof PRESET_ICONS[0]) => {
    setFormData(prev => ({
      ...prev,
      platform: prev.platform || preset.label,
      icon: preset.iconName,
      url: prev.url ? prev.url : preset.defaultUrl,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform.trim() || !formData.url.trim()) {
      setErrorMsg('Veuillez remplir le nom et l’URL du réseau social.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      const url = editingId ? `/api/social-links/${editingId}` : '/api/social-links';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur lors de la sauvegarde');
      }

      setShowModal(false);
      fetchSocials();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, platform: string) => {
    if (!confirm(`Supprimer définitivement le lien "${platform}" ?`)) return;

    try {
      const res = await fetch(`/api/social-links/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSocials(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Échec de la suppression');
    }
  };

  const handleToggleActive = async (item: SocialLink) => {
    try {
      const res = await fetch(`/api/social-links/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isActive: !item.isActive,
        }),
      });
      if (res.ok) {
        setSocials(prev => prev.map(s => s.id === item.id ? { ...s, isActive: !s.isActive } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveOrder = async (item: SocialLink, direction: 'up' | 'down') => {
    const currentIndex = socials.findIndex(s => s.id === item.id);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= socials.length) return;

    const targetItem = socials[targetIndex];
    const newSocials = [...socials];
    newSocials[currentIndex] = { ...targetItem, order: item.order };
    newSocials[targetIndex] = { ...item, order: targetItem.order };
    setSocials(newSocials);

    try {
      await Promise.all([
        fetch(`/api/social-links/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, order: targetIndex }),
        }),
        fetch(`/api/social-links/${targetItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...targetItem, order: currentIndex }),
        }),
      ]);
      fetchSocials();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPresets = PRESET_ICONS.filter(p => 
    p.label.toLowerCase().includes(iconSearch.toLowerCase()) || 
    p.id.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-darkCard p-6 sm:p-8 rounded-3xl border border-brand-gold/20 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#FF7A00] tracking-wider mb-1 font-bold">
            <Share2 className="w-4 h-4" />
            <span>Barre Latérale Flottante (Hero Dock)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Réseaux Sociaux
          </h1>
          <p className="text-xs sm:text-sm text-brand-beige/70 mt-1 max-w-2xl">
            Ajoutez, personnalisez et ordonnez les réseaux sociaux affichés dans la barre verticale à gauche de votre page d'accueil.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#FF9326] text-black font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-[#FF7A00]/20 hover:scale-105 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Réseau</span>
        </button>
      </div>

      {/* Social Links List */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 font-mono text-xs">
          Chargement de vos réseaux sociaux...
        </div>
      ) : socials.length === 0 ? (
        <div className="p-12 text-center bg-brand-darkCard rounded-3xl border border-dashed border-brand-gold/20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500">
            <Share2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Aucun réseau social configuré</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Cliquez sur le bouton ci-dessous pour ajouter vos premiers liens (LinkedIn, GitHub, Twitter/X, Instagram...).
          </p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 bg-[#FF7A00] text-black font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter maintenant</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socials.map((item, index) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                item.isActive 
                  ? 'bg-brand-darkCard border-brand-gold/20 hover:border-[#FF7A00]/40' 
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Icon Bubble Preview */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon || 'link'}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.platform}
                    </h3>
                    {!item.isActive && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] text-zinc-400 font-mono">
                        Masqué
                      </span>
                    )}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-zinc-400 hover:text-[#FF7A00] transition-colors truncate flex items-center gap-1 mt-0.5"
                  >
                    <span className="truncate">{item.url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-0.5 mr-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveOrder(item, 'up')}
                    className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    title="Monter"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === socials.length - 1}
                    onClick={() => handleMoveOrder(item, 'down')}
                    className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    title="Descendre"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Toggle Active */}
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    item.isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                      : 'bg-zinc-800/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  title={item.isActive ? 'Lien actif (visible)' : 'Lien masqué'}
                >
                  {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Modifier"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(item.id, item.platform)}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Create / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-darkCard border border-brand-gold/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-scaleIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#FF7A00]" />
                <span>{editingId ? 'Modifier le Réseau Social' : 'Ajouter un Réseau Social'}</span>
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 space-y-6">
              {/* Presets Grid */}
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  1. Sélection Rapide (Presets Populaires)
                </label>
                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Filtrer les icônes (ex: LinkedIn, GitHub, WhatsApp...)"
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-brand-dark border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF7A00]"
                  />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto custom-scroll p-1">
                  {filteredPresets.map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        formData.icon === preset.iconName
                          ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-[#FF7A00] font-bold shadow-md'
                          : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {preset.iconName}
                      </span>
                      <span className="text-[10px] truncate max-w-full font-mono">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Nom de la Plateforme
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: LinkedIn, GitHub, Portfolio..."
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-[#FF7A00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Identifiant Icône (Material Symbols)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ex: work, code, photo_camera..."
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-[#FF7A00]"
                      required
                    />
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] shrink-0">
                      <span className="material-symbols-outlined text-xl">
                        {formData.icon || 'link'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  URL Complète du Profil
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-[#FF7A00]"
                  required
                />
              </div>

              {/* Visibility Checkbox */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-dark/50 border border-white/5">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#FF7A00] focus:ring-[#FF7A00] cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs text-zinc-300 cursor-pointer">
                  Afficher ce lien dans la barre latérale gauche (Actif)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF9326] text-black text-xs font-bold shadow-lg shadow-[#FF7A00]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Ajouter le lien'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
