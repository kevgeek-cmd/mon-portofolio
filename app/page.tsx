import { prisma } from '@/lib/prisma';
import KineticApp from '@/components/kinetic/KineticApp';

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
  let testimonials: any[] = [];

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
      prisma.galleryImage.findMany({ orderBy: { order: 'asc' } }),
      prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    ]);

    if (results[0].status === 'fulfilled' && results[0].value) settings = results[0].value;
    if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) services = results[1].value;
    if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) projects = results[2].value;
    if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) tools = results[3].value;
    if (results[4].status === 'fulfilled' && Array.isArray(results[4].value)) socialLinks = results[4].value;
    if (results[5].status === 'fulfilled' && Array.isArray(results[5].value)) managedPages = results[5].value;
    if (results[6].status === 'fulfilled' && Array.isArray(results[6].value)) videos = results[6].value;
    if (results[7].status === 'fulfilled' && Array.isArray(results[7].value)) galleryImages = results[7].value;
    if (results[8].status === 'fulfilled' && Array.isArray(results[8].value)) testimonials = results[8].value;
  } catch (error) {
    console.error('Database connection error in Home page:', error);
  }

  return (
    <KineticApp
      settings={settings}
      projects={projects}
      services={services}
      tools={tools}
      socialLinks={socialLinks}
      testimonials={testimonials}
    />
  );
}
