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
  // Fetch data from CMS (Prisma)
  const [settings, services, projects, tools, socialLinks, managedPages, videos, galleryImages] = await Promise.all([
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

  // Fallback for tools if empty (until user adds them in CMS)
  const displayTools = tools.length > 0 ? tools : [
    { id: '1', name: 'Figma', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
    { id: '2', name: 'Photoshop', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
    { id: '3', name: 'Premiere Pro', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
    { id: '4', name: 'Next.js', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg' },
    { id: '5', name: 'React', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  ];

  const typedSettings = settings as any;
  const typedManagedPages = managedPages.map(page => ({ ...page, url: page.url || '' }));

  return (
    <main className="min-h-screen bg-brand-light flex flex-col">
      <Header settings={typedSettings} />
      
      {/* Dynamic Sections from CMS */}
      <LightHero settings={typedSettings} socialLinks={socialLinks} />
      <LightAbout settings={typedSettings} />
      <LightExpertise services={services} settings={typedSettings} />
      <LightProjects projects={projects} settings={typedSettings} />
      <LightVideos videos={videos} />
      <LightGallery images={galleryImages} />
      <LightManagedPages pages={typedManagedPages as any} />
      <StatsBanner settings={typedSettings} />
      <ToolsCarousel tools={displayTools} settings={typedSettings} />
      <LightContact settings={typedSettings} />
      
      <Footer settings={typedSettings} socials={socialLinks} />
    </main>
  );
}
