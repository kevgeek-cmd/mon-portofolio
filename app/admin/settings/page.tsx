'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Sparkles, Layout, Info, MapPin, Search, Menu as MenuIcon, Palette, Plus, Trash2, RefreshCw, Building2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'branding' | 'hero' | 'about' | 'contact' | 'footer' | 'menu' | 'colors'>('branding');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    // Branding & Header
    companyName: '',
    companySubtitle: '',
    companyLogoUrl: '',
    headerCtaText: 'Parlons de votre projet ↗',
    headerCtaLink: '#contact',

    // Hero
    heroBadgeText: '',
    heroTitle: '',
    heroSubtitle: '',
    heroSkills: '',
    heroVideoUrl: '',
    heroCtaText: '',
    heroCtaLink: '',
    heroSecondaryCtaText: '',
    heroSecondaryCtaLink: '',
    heroImageMain: '',
    heroWidget1Icon: '',
    heroWidget1Title: '',
    heroWidget1Subtitle: '',
    heroWidget2Title: '',
    heroWidget2Value: '',
    heroWidget2Subtitle: '',
    heroFloatingIcon1: '',
    heroFloatingIcon2: '',
    heroFloatingIcon3: '',

    // About
    aboutBadge: '',
    aboutTitle: '',
    aboutMainText: '',
    aboutSubText: '',
    aboutLocation1: '',
    aboutLocation2: '',
    aboutStackTags: 'Figma Maestro, Design Systems Tokens, Next.js & Tailwind, LLM & Agents',
    aboutCtaText: '',
    aboutCtaLink: '',
    aboutExperienceText: '',
    aboutImageUrl: '',
    aboutBadgeStat: '',
    aboutBadgeLabel: '',

    // About Values
    aboutValue1Icon: '',
    aboutValue1Title: '',
    aboutValue1Desc: '',
    aboutValue2Icon: '',
    aboutValue2Title: '',
    aboutValue2Desc: '',
    aboutValue3Icon: '',
    aboutValue3Title: '',
    aboutValue3Desc: '',
    aboutValue4Icon: '',
    aboutValue4Title: '',
    aboutValue4Desc: '',

    // Stats
    statLabelProjects: '',
    statProjects: 30,
    statLabelClients: '',
    statClients: 15,
    statLabelExperience: '',
    statExperience: 3,
    statLabelPassion: '',
    statPassion: 100,

    // Expertise & Projects & Tools
    expertiseSectionTitle: '',
    projectsSectionTitle: '',
    projectsCtaText: '',
    toolsSectionTitle: '',
    toolsSectionSubtitle: '',

    // Contact
    contactTitle: '',
    contactSubtitle: '',
    contactPrimaryBtnText: '',
    contactSecondaryBtnText: '',
    contactWhatsappBtnText: '',
    contactWhatsappUrl: '',
    contactLocation1: 'Abidjan, CI (GMT)',
    contactLocation2: 'Paris, France (CET)',
    contactLocation3: 'Remote Worldwide',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    mapEmbedUrl: '',

    // Footer
    footerTagline: '',
    copyrightText: '',

    // Theme & Menu
    primaryColor: '#FF7A00',
    darkBgColor: '#090909',
    containerBgColor: '#121414',
    textColor: '#F5F5F5',
    beigeBgColor: '#F7F5F0',
  });

  const [menuItems, setMenuItems] = useState<{ name: string; href: string }[]>([
    { name: 'ACCUEIL', href: 'hero' },
    { name: 'À PROPOS', href: 'about' },
    { name: 'PROJETS', href: 'projects' },
    { name: 'EXPERTISE', href: 'skills' },
    { name: 'AVIS', href: 'testimonials' },
    { name: 'CONTACT', href: 'contact' },
  ]);

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: '',
    siteDescription: '',
    keywordsStr: '',
    twitterHandle: '',
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings({
          companyName: data.settings.companyName || '',
          companySubtitle: data.settings.companySubtitle || '',
          companyLogoUrl: data.settings.companyLogoUrl || '',
          headerCtaText: data.settings.headerCtaText || 'Parlons de votre projet ↗',
          headerCtaLink: data.settings.headerCtaLink || '#contact',

          heroBadgeText: data.settings.heroBadgeText || '',
          heroTitle: data.settings.heroTitle || '',
          heroSubtitle: data.settings.heroSubtitle || '',
          heroSkills: data.settings.heroSkills || '',
          heroVideoUrl: data.settings.heroVideoUrl || '',
          heroCtaText: data.settings.heroCtaText || '',
          heroCtaLink: data.settings.heroCtaLink || '',
          heroSecondaryCtaText: data.settings.heroSecondaryCtaText || '',
          heroSecondaryCtaLink: data.settings.heroSecondaryCtaLink || '',
          heroImageMain: data.settings.heroImageMain || '',
          heroWidget1Icon: data.settings.heroWidget1Icon || '',
          heroWidget1Title: data.settings.heroWidget1Title || '',
          heroWidget1Subtitle: data.settings.heroWidget1Subtitle || '',
          heroWidget2Title: data.settings.heroWidget2Title || '',
          heroWidget2Value: data.settings.heroWidget2Value || '',
          heroWidget2Subtitle: data.settings.heroWidget2Subtitle || '',
          heroFloatingIcon1: data.settings.heroFloatingIcon1 || '',
          heroFloatingIcon2: data.settings.heroFloatingIcon2 || '',
          heroFloatingIcon3: data.settings.heroFloatingIcon3 || '',

          aboutBadge: data.settings.aboutBadge || '',
          aboutTitle: data.settings.aboutTitle || '',
          aboutMainText: data.settings.aboutMainText || '',
          aboutSubText: data.settings.aboutSubText || '',
          aboutLocation1: data.settings.aboutLocation1 || '',
          aboutLocation2: data.settings.aboutLocation2 || '',
          aboutStackTags: data.settings.aboutStackTags || 'Figma Maestro, Design Systems Tokens, Next.js & Tailwind, LLM & Agents',
          aboutCtaText: data.settings.aboutCtaText || '',
          aboutCtaLink: data.settings.aboutCtaLink || '',
          aboutExperienceText: data.settings.aboutExperienceText || '',
          aboutImageUrl: data.settings.aboutImageUrl || '',
          aboutBadgeStat: data.settings.aboutBadgeStat || '',
          aboutBadgeLabel: data.settings.aboutBadgeLabel || '',

          aboutValue1Icon: data.settings.aboutValue1Icon || '',
          aboutValue1Title: data.settings.aboutValue1Title || '',
          aboutValue1Desc: data.settings.aboutValue1Desc || '',
          aboutValue2Icon: data.settings.aboutValue2Icon || '',
          aboutValue2Title: data.settings.aboutValue2Title || '',
          aboutValue2Desc: data.settings.aboutValue2Desc || '',
          aboutValue3Icon: data.settings.aboutValue3Icon || '',
          aboutValue3Title: data.settings.aboutValue3Title || '',
          aboutValue3Desc: data.settings.aboutValue3Desc || '',
          aboutValue4Icon: data.settings.aboutValue4Icon || '',
          aboutValue4Title: data.settings.aboutValue4Title || '',
          aboutValue4Desc: data.settings.aboutValue4Desc || '',

          statProjects: data.settings.statProjects || 30,
          statLabelProjects: data.settings.statLabelProjects || '',
          statClients: data.settings.statClients || 15,
          statLabelClients: data.settings.statLabelClients || '',
          statExperience: data.settings.statExperience || 3,
          statLabelExperience: data.settings.statLabelExperience || '',
          statPassion: data.settings.statPassion || 100,
          statLabelPassion: data.settings.statLabelPassion || '',

          expertiseSectionTitle: data.settings.expertiseSectionTitle || '',
          projectsSectionTitle: data.settings.projectsSectionTitle || '',
          projectsCtaText: data.settings.projectsCtaText || '',
          toolsSectionTitle: data.settings.toolsSectionTitle || '',
          toolsSectionSubtitle: data.settings.toolsSectionSubtitle || '',

          contactTitle: data.settings.contactTitle || '',
          contactSubtitle: data.settings.contactSubtitle || '',
          contactPrimaryBtnText: data.settings.contactPrimaryBtnText || '',
          contactSecondaryBtnText: data.settings.contactSecondaryBtnText || '',
          contactWhatsappBtnText: data.settings.contactWhatsappBtnText || '',
          contactWhatsappUrl: data.settings.contactWhatsappUrl || '',
          contactLocation1: data.settings.contactLocation1 || 'Abidjan, CI (GMT)',
          contactLocation2: data.settings.contactLocation2 || 'Paris, France (CET)',
          contactLocation3: data.settings.contactLocation3 || 'Remote Worldwide',
          companyEmail: data.settings.companyEmail || '',
          companyPhone: data.settings.companyPhone || '',
          companyAddress: data.settings.companyAddress || '',
          mapEmbedUrl: data.settings.mapEmbedUrl || '',

          footerTagline: data.settings.footerTagline || '',
          copyrightText: data.settings.copyrightText || '',

          primaryColor: data.settings.primaryColor || '#FF7A00',
          darkBgColor: data.settings.darkBgColor || '#090909',
          containerBgColor: data.settings.containerBgColor || '#121414',
          textColor: data.settings.textColor || '#F5F5F5',
          beigeBgColor: data.settings.beigeBgColor || '#F7F5F0',
        });

        if (Array.isArray(data.settings.menuItems) && data.settings.menuItems.length > 0) {
          setMenuItems(data.settings.menuItems);
        }
      }

      if (data.seoSettings) {
        setSeoSettings({
          siteTitle: data.seoSettings.siteTitle || '',
          siteDescription: data.seoSettings.siteDescription || '',
          keywordsStr: Array.isArray(data.seoSettings.keywords)
            ? data.seoSettings.keywords.join(', ')
            : '',
          twitterHandle: data.seoSettings.twitterHandle || '',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: 'Nouveau lien', href: '#section' }]);
  };

  const handleRemoveMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleMenuItemChange = (index: number, field: 'name' | 'href', value: string) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const keywordsArray = seoSettings.keywordsStr
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settingsData: {
            ...settings,
            menuItems,
          },
          seoData: {
            siteTitle: seoSettings.siteTitle,
            siteDescription: seoSettings.siteDescription,
            keywords: keywordsArray,
            twitterHandle: seoSettings.twitterHandle,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setSaveError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-brand-gold gap-3">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="text-sm font-semibold">Chargement des paramètres du site...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestion Globale du Site</span>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-beigeLight">
            Paramètres & Contenu du Site
          </h1>
          <p className="text-sm text-brand-beige/70 mt-1">
            Modifiez en direct tous les textes, marque, images, menus, couleurs et SEO affichés sur le site.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark bg-brand-gold hover:bg-brand-goldHover transition-all shadow-lg shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Enregistrement...' : 'Sauvegarder Tout'}</span>
        </button>
      </div>

      {/* Success / Error Banners */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Toutes les modifications ont été enregistrées avec succès ! Les visiteurs verront les changements immédiatement.</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 flex items-center gap-3 text-sm">
          <span>{saveError}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-gold/20 pb-3">
        <button
          onClick={() => setActiveTab('branding')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'branding'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>1. Identité & Logo</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hero'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>2. Hero Banner</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'about'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>3. À Propos</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'contact'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>4. Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('footer')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'footer'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>5. SEO & Footer</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'menu'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <MenuIcon className="w-4 h-4" />
          <span>6. Menu</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'colors'
              ? 'bg-brand-gold text-brand-dark shadow-md'
              : 'bg-brand-darkCard text-brand-beige/80 border border-brand-gold/20 hover:border-brand-gold/50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>7. Couleurs</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Branding & Identity */}
        {activeTab === 'branding' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2 pb-3 border-b border-brand-gold/15">
              <Building2 className="w-5 h-5" />
              Identité de l'Entreprise & Logo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Nom de l'Entreprise / Marque
                </label>
                <input
                  type="text"
                  placeholder="Ex: NEXUS DIGITAL"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Sous-titre / Slogan Court
                </label>
                <input
                  type="text"
                  placeholder="Ex: AGENCE DIGITALE & TECH"
                  value={settings.companySubtitle}
                  onChange={(e) => setSettings({ ...settings, companySubtitle: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                URL de l'image de Logo (Optionnel - laisse vide pour l'emblème géométrique moderne)
              </label>
              <ImageUploader
                value={settings.companyLogoUrl || ''}
                onChange={(url) => setSettings({ ...settings, companyLogoUrl: url })}
                placeholder="https://... ou télécharger une image"
              />
              <p className="text-[11px] text-brand-beige/60 mt-1">
                Si vide, l'emblème doré vectoriel haute définition sera affiché automatiquement avec le nom de l'entreprise.
              </p>
            </div>

            <div className="pt-4 border-t border-brand-gold/20">
              <h4 className="text-sm font-bold text-white mb-4">Bouton d'Action En-tête (Header CTA)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Texte du Bouton Header
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Parlons de votre projet ↗"
                    value={settings.headerCtaText}
                    onChange={(e) => setSettings({ ...settings, headerCtaText: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Lien du Bouton Header
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: #contact ou contact"
                    value={settings.headerCtaLink}
                    onChange={(e) => setSettings({ ...settings, headerCtaLink: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hero */}
        {activeTab === 'hero' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2 pb-3 border-b border-brand-gold/15">
              <Layout className="w-5 h-5" />
              Contenu de la Section Hero (Bannière d'Accueil)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Badge Supérieur
                </label>
                <input
                  type="text"
                  value={settings.heroBadgeText}
                  onChange={(e) => setSettings({ ...settings, heroBadgeText: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Titre Principal (Hero)
                </label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                Sous-titre / Description (Hero)
              </label>
              <textarea
                rows={3}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                Compétences (séparées par des virgules)
              </label>
              <input
                type="text"
                placeholder="Communication, Design, IA, Développement..."
                value={settings.heroSkills}
                onChange={(e) => setSettings({ ...settings, heroSkills: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-brand-gold/15 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-4">Bouton Principal</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Texte</label>
                    <input type="text" value={settings.heroCtaText} onChange={e => setSettings({...settings, heroCtaText: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Lien</label>
                    <input type="text" value={settings.heroCtaLink} onChange={e => setSettings({...settings, heroCtaLink: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 border border-brand-gold/15 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-4">Bouton Secondaire</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Texte</label>
                    <input type="text" value={settings.heroSecondaryCtaText} onChange={e => setSettings({...settings, heroSecondaryCtaText: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Lien</label>
                    <input type="text" value={settings.heroSecondaryCtaLink} onChange={e => setSettings({...settings, heroSecondaryCtaLink: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-gold/20">
              <h4 className="text-sm font-bold text-white mb-4">Widgets & Images</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Image Principale (Toi)</label>
                  <ImageUploader
                    value={settings.heroImageMain || ''}
                    onChange={(url) => setSettings({ ...settings, heroImageMain: url })}
                    placeholder="/images/hero-main.png"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Icône Widget Vidéo (ex: 🎬)</label>
                  <input type="text" value={settings.heroWidget1Icon} onChange={e => setSettings({...settings, heroWidget1Icon: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Widget Vidéo</label>
                  <input type="text" value={settings.heroWidget1Title} onChange={e => setSettings({...settings, heroWidget1Title: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Sous-titre Widget Vidéo</label>
                  <input type="text" value={settings.heroWidget1Subtitle} onChange={e => setSettings({...settings, heroWidget1Subtitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Widget Croissance</label>
                  <input type="text" value={settings.heroWidget2Title} onChange={e => setSettings({...settings, heroWidget2Title: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Valeur Widget Croissance (+125%)</label>
                  <input type="text" value={settings.heroWidget2Value} onChange={e => setSettings({...settings, heroWidget2Value: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Sous-titre Widget Croissance</label>
                  <input type="text" value={settings.heroWidget2Subtitle} onChange={e => setSettings({...settings, heroWidget2Subtitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: About & 4 Values */}
        {activeTab === 'about' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-8">
            <div className="border-b border-brand-gold/15 pb-4">
              <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2">
                <Info className="w-5 h-5" />
                Contenu de la Vue « À Propos » (Manifeste & Vision)
              </h3>
              <p className="text-xs text-brand-beige/60 mt-1">
                Personnalisez chaque bloc affiché sur la page À propos de votre portfolio.
              </p>
            </div>

            {/* 1. En-tête de la page */}
            <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-gold/15 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-[#FF7A00] tracking-wider block">
                1. En-tête de la Section
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Badge Supérieur (Haut Gauche)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: MANIFESTE & VISION"
                    value={settings.aboutBadge}
                    onChange={(e) => setSettings({ ...settings, aboutBadge: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Tag / Spécialités (Haut Droite)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Basé en Côte d'Ivoire • Disponible à distance"
                    value={settings.aboutLocation1}
                    onChange={(e) => setSettings({ ...settings, aboutLocation1: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Grand Titre Principal de la Section
                </label>
                <input
                  type="text"
                  placeholder="Ex: L'innovation et la performance au service de vos ambitions"
                  value={settings.aboutTitle}
                  onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* 2. Carte Principale Gauche */}
            <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-gold/15 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-[#FF7A00] tracking-wider block">
                2. Carte Principale de Gauche (Manifeste & Présentation)
              </span>
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Titre / Accroche en gras de la carte
                </label>
                <input
                  type="text"
                  placeholder="Ex: Artisanat numérique guidé par le sens, la rigueur et la performance."
                  value={settings.aboutSubText}
                  onChange={(e) => setSettings({ ...settings, aboutSubText: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Texte descriptif / Paragraphe de présentation
                </label>
                <textarea
                  rows={4}
                  placeholder="Ex: Nous sommes une équipe d'experts dédiée à la conception d'outils numériques performants..."
                  value={settings.aboutMainText}
                  onChange={(e) => setSettings({ ...settings, aboutMainText: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Stack de prédilection (Badges Bento, séparés par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Figma Maestro, Design Systems Tokens, Next.js & Tailwind, LLM & Agents"
                  value={settings.aboutStackTags || ''}
                  onChange={(e) => setSettings({ ...settings, aboutStackTags: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* 3. Les 4 Cartes de Valeurs */}
            <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-gold/15 space-y-4">
              <span className="text-xs font-mono uppercase font-bold text-[#FF7A00] tracking-wider block">
                3. Les 4 Cartes de Valeurs & Piliers (01, 02, 03, 04)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 01 */}
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-gold/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF7A00]">Pilier 01</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Titre</label>
                    <input
                      type="text"
                      placeholder="Ex: Écoute & Conseil"
                      value={settings.aboutValue1Title}
                      onChange={(e) => setSettings({ ...settings, aboutValue1Title: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Description du pilier 01..."
                      value={settings.aboutValue1Desc}
                      onChange={(e) => setSettings({ ...settings, aboutValue1Desc: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                {/* 02 */}
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-gold/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF7A00]">Pilier 02</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Titre</label>
                    <input
                      type="text"
                      placeholder="Ex: Qualité & Performance"
                      value={settings.aboutValue2Title}
                      onChange={(e) => setSettings({ ...settings, aboutValue2Title: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Description du pilier 02..."
                      value={settings.aboutValue2Desc}
                      onChange={(e) => setSettings({ ...settings, aboutValue2Desc: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                {/* 03 */}
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-gold/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF7A00]">Pilier 03</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Titre</label>
                    <input
                      type="text"
                      placeholder="Ex: Innovation Continue"
                      value={settings.aboutValue3Title}
                      onChange={(e) => setSettings({ ...settings, aboutValue3Title: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Description du pilier 03..."
                      value={settings.aboutValue3Desc}
                      onChange={(e) => setSettings({ ...settings, aboutValue3Desc: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                {/* 04 */}
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-gold/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#FF7A00]">Pilier 04</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Titre</label>
                    <input
                      type="text"
                      placeholder="Ex: Engagement & Rigueur"
                      value={settings.aboutValue4Title}
                      onChange={(e) => setSettings({ ...settings, aboutValue4Title: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Description du pilier 04..."
                      value={settings.aboutValue4Desc}
                      onChange={(e) => setSettings({ ...settings, aboutValue4Desc: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-brand-darkCard border border-brand-gold/20 text-xs text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contact & Location */}
        {activeTab === 'contact' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2 pb-3 border-b border-brand-gold/15">
              <MapPin className="w-5 h-5" />
              Coordonnées de Contact & Carte Google Maps
            </h3>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Contact (ex: Vous avez un projet ?)</label>
              <input type="text" value={settings.contactTitle} onChange={e => setSettings({...settings, contactTitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white mb-4" />
              
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Sous-titre Contact</label>
              <textarea rows={2} value={settings.contactSubtitle} onChange={e => setSettings({...settings, contactSubtitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white resize-none mb-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Bouton Principal (ex: Me contacter)</label>
                <input type="text" value={settings.contactPrimaryBtnText} onChange={e => setSettings({...settings, contactPrimaryBtnText: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Bouton Secondaire (ex: Voir mes services)</label>
                <input type="text" value={settings.contactSecondaryBtnText} onChange={e => setSettings({...settings, contactSecondaryBtnText: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white" />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-gold/20">
              <h4 className="text-sm font-bold text-white mb-4">Informations de Contact & Localisation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Adresse Email de Contact
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Numéro de Téléphone
                  </label>
                  <input
                    type="text"
                    value={settings.companyPhone}
                    onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Adresse Physique
                </label>
                <input
                  type="text"
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-brand-gold/15">
                <h5 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-3">
                  Fuseaux Horaires & Villes Mondiales (Badges de Disponibilité)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 font-semibold mb-1">Localisation 1</label>
                    <input
                      type="text"
                      placeholder="Abidjan, CI (GMT)"
                      value={settings.contactLocation1 || ''}
                      onChange={(e) => setSettings({ ...settings, contactLocation1: e.target.value })}
                      className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 font-semibold mb-1">Localisation 2</label>
                    <input
                      type="text"
                      placeholder="Paris, France (CET)"
                      value={settings.contactLocation2 || ''}
                      onChange={(e) => setSettings({ ...settings, contactLocation2: e.target.value })}
                      className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-brand-beige/70 font-semibold mb-1">Localisation 3</label>
                    <input
                      type="text"
                      placeholder="Remote Worldwide"
                      value={settings.contactLocation3 || ''}
                      onChange={(e) => setSettings({ ...settings, contactLocation3: e.target.value })}
                      className="w-full p-3 rounded-xl bg-brand-dark border border-brand-gold/20 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Lien d'Intégration Google Maps (URL iframe src)
                </label>
                <input
                  type="text"
                  placeholder="https://www.google.com/maps/embed?..."
                  value={settings.mapEmbedUrl}
                  onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Footer & SEO */}
        {activeTab === 'footer' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2 pb-3 border-b border-brand-gold/15">
              <Search className="w-5 h-5" />
              Pied de page & Optimisation SEO
            </h3>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                Slogan du Footer
              </label>
              <input
                type="text"
                value={settings.footerTagline}
                onChange={(e) => setSettings({ ...settings, footerTagline: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                Texte Copyright
              </label>
              <input
                type="text"
                placeholder="Ex: © 2026 Nexus Digital. Tous droits réservés."
                value={settings.copyrightText}
                onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="pt-4 border-t border-brand-gold/20 space-y-4">
              <h4 className="text-sm font-bold text-white">Référencement SEO & Réseaux Sociaux</h4>

              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Titre du site (Balise Meta Title)
                </label>
                <input
                  type="text"
                  value={seoSettings.siteTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                  Description du site (Meta Description)
                </label>
                <textarea
                  rows={3}
                  value={seoSettings.siteDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Mots-clés SEO (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={seoSettings.keywordsStr}
                    onChange={(e) => setSeoSettings({ ...seoSettings, keywordsStr: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                    Handle Twitter / X (ex: @agence_digitale)
                  </label>
                  <input
                    type="text"
                    placeholder="@agence_digitale"
                    value={seoSettings.twitterHandle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, twitterHandle: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Menu Navigation */}
        {activeTab === 'menu' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-gold/15">
              <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2">
                <MenuIcon className="w-5 h-5" />
                Gestion des Éléments du Menu Principal
              </h3>
              <button
                type="button"
                onClick={handleAddMenuItem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-gold/20 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un élément</span>
              </button>
            </div>

            <div className="space-y-3">
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-brand-dark border border-brand-gold/15">
                  <div className="flex-1">
                    <label className="block text-[10px] text-brand-gold font-bold uppercase mb-1">Nom du lien</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleMenuItemChange(idx, 'name', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-[10px] text-brand-gold font-bold uppercase mb-1">Lien / Onglet (ex: hero, about, projects, skills, testimonials, contact)</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleMenuItemChange(idx, 'href', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMenuItem(idx)}
                    title="Supprimer l'élément"
                    className="p-2.5 mt-5 rounded-xl bg-red-600/90 text-white hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-gold/20 space-y-4">
              <h4 className="text-sm font-bold text-white">Titres des Sections</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Section Expertise</label>
                  <input type="text" value={settings.expertiseSectionTitle} onChange={e => setSettings({...settings, expertiseSectionTitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Section Projets</label>
                  <input type="text" value={settings.projectsSectionTitle} onChange={e => setSettings({...settings, projectsSectionTitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Titre Section Outils</label>
                  <input type="text" value={settings.toolsSectionTitle} onChange={e => setSettings({...settings, toolsSectionTitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Sous-titre Section Outils</label>
                  <input type="text" value={settings.toolsSectionSubtitle} onChange={e => setSettings({...settings, toolsSectionSubtitle: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">Texte Bouton Projets (ex: Voir tous les projets)</label>
                <input type="text" value={settings.projectsCtaText} onChange={e => setSettings({...settings, projectsCtaText: e.target.value})} className="w-full p-3.5 rounded-xl bg-brand-dark border border-brand-gold/20 text-sm text-white focus:outline-none focus:border-brand-gold" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Colors & Theme */}
        {activeTab === 'colors' && (
          <div className="p-8 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2 pb-3 border-b border-brand-gold/15">
              <Palette className="w-5 h-5" />
              Personnalisation des Couleurs du Thème Kinetic Amber
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-2xl bg-brand-dark border border-brand-gold/20 space-y-3">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Couleur Accent / Ambre
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-transparent cursor-pointer border border-brand-gold/30"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-dark border border-brand-gold/20 space-y-3">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Fond Principal (Dark)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.darkBgColor}
                    onChange={(e) => setSettings({ ...settings, darkBgColor: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-transparent cursor-pointer border border-brand-gold/30"
                  />
                  <input
                    type="text"
                    value={settings.darkBgColor}
                    onChange={(e) => setSettings({ ...settings, darkBgColor: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-dark border border-brand-gold/20 space-y-3">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Fond Cartes / Bento
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.containerBgColor || '#121414'}
                    onChange={(e) => setSettings({ ...settings, containerBgColor: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-transparent cursor-pointer border border-brand-gold/30"
                  />
                  <input
                    type="text"
                    value={settings.containerBgColor || '#121414'}
                    onChange={(e) => setSettings({ ...settings, containerBgColor: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-dark border border-brand-gold/20 space-y-3">
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Couleur du Texte Principal
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.textColor || '#F5F5F5'}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                    className="w-12 h-12 rounded-xl bg-transparent cursor-pointer border border-brand-gold/30"
                  />
                  <input
                    type="text"
                    value={settings.textColor || '#F5F5F5'}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-brand-darkCard border border-brand-gold/20 text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-dark bg-brand-gold hover:bg-brand-goldHover transition-all shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement...' : 'Sauvegarder les modifications'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
