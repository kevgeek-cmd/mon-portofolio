import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LightHero from '@/components/sections/LightHero';
import LightAbout from '@/components/sections/LightAbout';
import LightExpertise from '@/components/sections/LightExpertise';
import LightProjects from '@/components/sections/LightProjects';
import LightManagedPages from '@/components/sections/LightManagedPages';
import StatsBanner from '@/components/sections/StatsBanner';
import ToolsCarousel from '@/components/sections/ToolsCarousel';
import LightContact from '@/components/sections/LightContact';

export const revalidate = 0; // Fetch fresh data

export default async function Home() {
  // Fetch data from CMS (Prisma)
  const [settings, services, projects, tools, socialLinks, managedPages] = await Promise.all([
    prisma.settings.findUnique({ where: { id: 'default' } }),
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { order: 'asc' },
      include: { category: true }
    }),
    prisma.tool.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    prisma.managedPage.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } })
  ]);

  // Fallback for tools if empty (until user adds them in CMS)
  const displayTools = tools.length > 0 ? tools : [
    { id: '1', name: 'Figma', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
    { id: '2', name: 'Photoshop', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
    { id: '3', name: 'Premiere Pro', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
    { id: '4', name: 'Next.js', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg' },
    { id: '5', name: 'React', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  ];

  return (
    <main className="min-h-screen bg-brand-light flex flex-col">
      <Header settings={settings} />
      
      {/* Dynamic Sections from CMS */}
      <LightHero settings={settings} socialLinks={socialLinks} />
      <LightAbout settings={settings} />
      <LightExpertise services={services} />
      <LightProjects projects={projects} />
      <LightManagedPages pages={managedPages} />
      <StatsBanner settings={settings} />
      <ToolsCarousel tools={displayTools} />
      <LightContact settings={settings} />
      
      <Footer settings={settings} socialLinks={socialLinks} />
    </main>
  );
}
