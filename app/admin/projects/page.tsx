'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectItem } from '@/lib/types';
import { Plus, Edit, Trash2, ExternalLink, RefreshCw, FolderPlus, Tag, CheckCircle, X, Layers } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface ProjectCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count?: { projects: number };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<ProjectCategoryItem[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // Project Modal State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [savingProject, setSavingProject] = useState(false);

  // Category Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProjectCategoryItem | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [savingCategory, setSavingCategory] = useState(false);

  // Feedback Notification
  const [notification, setNotification] = useState<string | null>(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    summary: '',
    description: '',
    coverImage: '',
    liveUrl: '',
    githubUrl: '',
    technologies: '',
    categoryId: '',
    isFeatured: true,
    order: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, catRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/project-categories'),
      ]);

      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Open Create Project
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      summary: '',
      description: '',
      coverImage: '',
      liveUrl: '',
      githubUrl: '',
      technologies: 'Next.js, TypeScript, Tailwind CSS',
      categoryId: categories[0]?.id || '',
      isFeatured: true,
      order: projects.length + 1,
    });
    setShowProjectModal(true);
  };

  // Open Edit Project
  const handleOpenEditProject = (project: ProjectItem) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      summary: project.summary || '',
      description: project.description || '',
      coverImage: project.coverImage || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      categoryId: project.category?.id || '',
      isFeatured: project.isFeatured ?? true,
      order: project.order || 0,
    });
    setShowProjectModal(true);
  };

  // Save Project (Create / Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const techArray = projectForm.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...projectForm,
        technologies: techArray,
        categoryId: projectForm.categoryId || null,
      };

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowProjectModal(false);
        notify(editingProject ? 'Projet mis à jour avec succès !' : 'Nouveau projet ajouté avec succès !');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors de la sauvegarde du projet');
      }
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSavingProject(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet du catalogue ?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        notify('Projet supprimé du catalogue');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Category (Create / Edit)
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    setSavingCategory(true);
    try {
      const url = editingCategory ? `/api/project-categories/${editingCategory.id}` : '/api/project-categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName, description: categoryDesc }),
      });

      if (res.ok) {
        setCategoryName('');
        setCategoryDesc('');
        setEditingCategory(null);
        notify(editingCategory ? 'Catégorie renommée' : 'Catégorie créée');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors de la gestion de la catégorie');
      }
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la gestion de la catégorie');
    } finally {
      setSavingCategory(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ? Les projets associés seront simplement non catégorisés.')) return;
    try {
      const res = await fetch(`/api/project-categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
        notify('Catégorie supprimée');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = selectedCategoryFilter === 'ALL'
    ? projects
    : selectedCategoryFilter === 'UNCATEGORIZED'
    ? projects.filter((p) => !p.category)
    : projects.filter((p) => p.category?.id === selectedCategoryFilter);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-brand-darkCard border border-brand-gold/25 shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Catalogue des Projets &amp; Catégories
          </h1>
          <p className="text-sm text-brand-beige/70 mt-1">
            Gérez vos études de cas, modifiez ou créez des catégories et attribuez vos projets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all"
          >
            <FolderPlus className="w-4 h-4 text-[#FF7A00]" />
            <span>Gérer les Catégories ({categories.length})</span>
          </button>

          <button
            onClick={handleOpenCreateProject}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un projet</span>
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll">
        <span className="text-xs font-mono text-zinc-400 uppercase mr-2 flex items-center gap-1 shrink-0">
          <Tag className="w-3.5 h-3.5 text-[#FF7A00]" />
          Filtrer :
        </span>

        <button
          onClick={() => setSelectedCategoryFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategoryFilter === 'ALL'
              ? 'bg-[#FF7A00] text-black font-bold shadow-md'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          Tous ({projects.length})
        </button>

        {categories.map((cat) => {
          const count = projects.filter((p) => p.category?.id === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat.id
                  ? 'bg-[#FF7A00] text-black font-bold shadow-md'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}

        {projects.some((p) => !p.category) && (
          <button
            onClick={() => setSelectedCategoryFilter('UNCATEGORIZED')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'UNCATEGORIZED'
                ? 'bg-zinc-200 text-black font-bold shadow-md'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            Non catégorisés ({projects.filter((p) => !p.category).length})
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-20">
          <RefreshCw className="w-8 h-8 text-[#FF7A00] animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-brand-darkCard border border-brand-gold/15">
          <Layers className="w-12 h-12 text-[#FF7A00]/50 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Aucun projet dans cette catégorie</h3>
          <p className="text-xs text-zinc-400 mb-4">Créez votre premier projet ou changez de filtre.</p>
          <button
            onClick={handleOpenCreateProject}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black text-xs font-bold"
          >
            Créer un projet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-brand-darkCard border border-brand-gold/20 overflow-hidden flex flex-col justify-between hover:border-[#FF7A00]/50 transition-all shadow-lg group"
            >
              <div>
                {/* Cover Image with Category Badge */}
                <div className="relative aspect-video w-full bg-black/60 overflow-hidden">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono">
                      Pas d'image
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#FF7A00]/40 text-[#FF7A00] text-[10px] font-mono font-semibold">
                      {project.category?.name || 'Sans catégorie'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditProject(project)}
                      className="p-2 rounded-xl bg-black/80 hover:bg-[#FF7A00] text-white hover:text-black transition-all shadow-lg"
                      title="Modifier le projet"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-xl bg-black/80 hover:bg-red-600 text-white transition-all shadow-lg"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                    {project.summary || project.description}
                  </p>

                  {/* Tech stack */}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-zinc-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-zinc-500">
                  Ordre : {project.order || 0}
                </span>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF7A00] font-semibold hover:underline"
                  >
                    <span>Visiter</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1 : CREATE / EDIT PROJECT */}
      {/* ========================================================================= */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scroll">
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
              {editingProject ? 'Modifier le Projet' : 'Nouveau Projet au Catalogue'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Titre du projet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aura Intelligence Platform"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              {/* Category Selector with Quick Add Link */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gold">
                    Catégorie du projet
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="text-[11px] text-[#FF7A00] hover:underline font-semibold"
                  >
                    + Créer une nouvelle catégorie
                  </button>
                </div>
                <select
                  value={projectForm.categoryId}
                  onChange={(e) => setProjectForm({ ...projectForm, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                >
                  <option value="">-- Sans catégorie --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Image de couverture (Principale)
                </label>
                <ImageUploader
                  value={projectForm.coverImage}
                  onChange={(url) => setProjectForm({ ...projectForm, coverImage: url })}
                  placeholder="Téléversez une capture ou collez une URL"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Résumé court (affiché sur la carte)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: SaaS de gestion RH et géolocalisation d'équipes."
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Description détaillée (affichée dans le modal de zoom)
                </label>
                <textarea
                  rows={4}
                  placeholder="Architecture technique, objectifs résolus, features clés..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Lien Démo / Live URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://monprojet.com"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Lien GitHub (Optionnel)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Technologies (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js 15, TypeScript, Tailwind, OpenAI"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={projectForm.order}
                    onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                >
                  {savingProject ? 'Enregistrement...' : editingProject ? 'Mettre à jour' : 'Ajouter le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2 : CATEGORIES MANAGER */}
      {/* ========================================================================= */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scroll space-y-6">
            <button
              onClick={() => {
                setShowCategoryModal(false);
                setEditingCategory(null);
                setCategoryName('');
                setCategoryDesc('');
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#FF7A00]" />
                Gestionnaire des Catégories de Projets
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Créez, renommez ou supprimez les catégories pour organiser votre portfolio.
              </p>
            </div>

            {/* Form Create / Edit */}
            <form onSubmit={handleSaveCategory} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider">
                {editingCategory ? `Modifier la catégorie : ${editingCategory.name}` : 'Ajouter une nouvelle catégorie'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nom (ex: SaaS & Plateformes)"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                />
                <input
                  type="text"
                  placeholder="Description (optionnel)"
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                {editingCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryName('');
                      setCategoryDesc('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                  >
                    Annuler
                  </button>
                )}
                <button
                  type="submit"
                  disabled={savingCategory}
                  className="px-4 py-1.5 rounded-lg bg-[#FF7A00] text-black font-bold text-xs hover:brightness-110"
                >
                  {savingCategory ? 'En cours...' : editingCategory ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>

            {/* Categories List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Catégories existantes ({categories.length})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto custom-scroll pr-1">
                {categories.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-3 text-center">Aucune catégorie pour le moment.</p>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{cat.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#FF7A00]">
                            {projects.filter((p) => p.category?.id === cat.id).length} projets
                          </span>
                        </div>
                        {cat.description && (
                          <p className="text-[11px] text-zinc-400 mt-0.5">{cat.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryName(cat.name);
                            setCategoryDesc(cat.description || '');
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300"
                          title="Modifier"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  setEditingCategory(null);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
