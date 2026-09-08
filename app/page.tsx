import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LightHero from '@/components/sections/LightHero';
import LightAbout from '@/components/sections/LightAbout';
import LightExpertise from '@/components/sections/LightExpertise';
import LightProjects from '@/components/sections/LightProjects';
import LightVideos from '@/components/sections/LightVideos';
import LightGallery from '@/components/sections/LightGallery';
import LightManagedPages from '@/components/sections/LightManagedPages';
import StatsBanner from '@/components/sections/StatsBanner';
import ToolsCarousel from '@/components/sections/ToolsCarousel';
import LightContact from '@/components/sections/LightContact';

export const revalidate = 0; // Fetch fresh data

export default async function Home() {
  let settings: any = null;
  let services: any[] = [];
  let projects: any[] = [];
  let tools: any[] = [];
  let socialLinks: any[] = [];
  let managedPages: any[] = [];
  let videos: any[] = [];
  let galleryImages: any[] = [];

  try {
    const results = await Promise.allSettled([
      prisma.settings.findUnique({ where: { id: 'default' } }),
      prisma.service.findMany({ orderBy: { order: 'asc' } }),
      prisma.project.findMany({
        orderBy: { order: 'asc' },
        include: { category: true }
      }),
      prisma.tool.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      prisma.managedPage.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
      prisma.youtubeVideo.findMany({ orderBy: { order: 'asc' } }),
      prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    ]);

    if (results[0].status === 'fulfilled' && results[0].value) settings = results[0].value;
    if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) services = results[1].value;
    if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) projects = results[2].value;
    if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) tools = results[3].value;
    if (results[4].status === 'fulfilled' && Array.isArray(results[4].value)) socialLinks = results[4].value;
    if (results[5].status === 'fulfilled' && Array.isArray(results[5].value)) managedPages = results[5].value;
    if (results[6].status === 'fulfilled' && Array.isArray(results[6].value)) videos = results[6].value;
    if (results[7].status === 'fulfilled' && Array.isArray(results[7].value)) galleryImages = results[7].value;
  } catch (error) {
    console.error('Database connection error in Home page:', error);
  }

  // Fallback defaults if database is not yet initialized or unreachable
  const defaultServices = [
    { id: '1', title: 'Communication Digitale', description: 'Stratégie de marque, Community Management et visibilité 360° pour engager votre audience.', icon: 'Megaphone' },
    { id: '2', title: 'UI/UX & Web Design', description: 'Conception d\'interfaces modernes, intuitives et orientées conversion pour vos applications et sites web.', icon: 'MonitorPlay' },
    { id: '3', title: 'Développement Web', description: 'Création de sites vitrines, e-commerce et applications performantes avec Next.js, React et Tailwind CSS.', icon: 'Code' },
    { id: '4', title: 'Solutions & Outils IA', description: 'Automatisation intelligente de flux de travail et intégration d\'agents IA sur mesure.', icon: 'Bot' },
    { id: '5', title: 'Montage Vidéo & Motion', description: 'Production et montage de formats percutants pour YouTube, TikTok, Reels et campagnes promotionnelles.', icon: 'Video' },
    { id: '6', title: 'Photographie & Médias', description: 'Shooting photo événementiel, corporate et création de banques d\'images de haute qualité.', icon: 'Camera' }
  ];

  const defaultProjects = [
    {
      id: '1',
      title: 'Plateforme E-Commerce Moderne',
      slug: 'plateforme-ecommerce',
      summary: 'Boutique en ligne ultra-rapide avec paiement sécurisé et gestion des stocks en temps réel.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: { name: 'Web & E-commerce' }
    },
    {
      id: '2',
      title: 'Application SaaS & Dashboard IA',
      slug: 'application-saas-ia',
      summary: 'Dashboard analytique complet avec génération de contenu automatisée par intelligence artificielle.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      category: { name: 'Intelligence Artificielle' }
    },
    {
      id: '3',
      title: 'Identité Visuelle & Stratégie Social Media',
      slug: 'identite-visuelle-branding',
      summary: 'Refonte complète de l\'image de marque et production de contenu vidéo viral.',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      category: { name: 'Branding & Vidéo' }
    }
  ];

  const defaultTools = [
    { id: '1', name: 'Figma', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
    { id: '2', name: 'Photoshop', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
    { id: '3', name: 'Premiere Pro', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
    { id: '4', name: 'Next.js', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg' },
    { id: '5', name: 'React', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { id: '6', name: 'Tailwind CSS', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' }
  ];

  const displayServices = services && services.length > 0 ? services : defaultServices;
  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;
  const displayTools = tools && tools.length > 0 ? tools : defaultTools;
  const typedSettings = settings || null;
  const typedManagedPages = (managedPages || []).map(page => ({ ...page, url: page.url || '' }));

  return (
    <main className="min-h-screen bg-brand-light flex flex-col">
      <Header settings={typedSettings} />
      
      {/* Dynamic Sections */}
      <LightHero settings={typedSettings} socialLinks={socialLinks} />
      <LightAbout settings={typedSettings} />
      <LightExpertise services={displayServices} settings={typedSettings} />
      <LightProjects projects={displayProjects} settings={typedSettings} />
      {videos && videos.length > 0 && <LightVideos videos={videos} />}
      {galleryImages && galleryImages.length > 0 && <LightGallery images={galleryImages} />}
      {typedManagedPages.length > 0 && <LightManagedPages pages={typedManagedPages as any} />}
      <StatsBanner settings={typedSettings} />
      <ToolsCarousel tools={displayTools} settings={typedSettings} />
      <LightContact settings={typedSettings} />
      
      <Footer settings={typedSettings} socials={socialLinks} />
    </main>
  );
}
