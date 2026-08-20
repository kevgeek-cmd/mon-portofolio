import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioHero } from '@/components/sections/PortfolioHero';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SelectedProjects } from '@/components/sections/SelectedProjects';
import { AIVibeCodingSection } from '@/components/sections/AIVibeCodingSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-dark font-sans selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
      
      {/* 
        Temporarily passing null or empty to Header/Footer to bypass old CMS requirements 
        We should ideally rewrite Header/Footer too if needed, but for now they won't break if we pass empty objects or if they handle undefined.
      */}
      <Header settings={null as any} />

      <PortfolioHero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <SelectedProjects />
      <AIVibeCodingSection />
      <PhilosophySection />
      <ContactSection />

      <Footer settings={null as any} socials={[]} />
      
    </main>
  );
}
