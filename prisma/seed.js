const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Initialisation des données du template (JS)...');

  const passwordHash = await bcrypt.hash('AdminPassword2026!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@template.local' },
    update: {},
    create: {
      email: 'admin@template.local',
      name: 'Administrateur',
      passwordHash,
      role: 'ADMIN',
    },
  });

  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'VOTRE ENTREPRISE',
      companySubtitle: 'AGENCE DIGITALE',
      heroTitle: 'INNOVEZ AVEC EXCELLENCE',
      heroSubtitle: 'Nous concevons des solutions numériques modernes et performantes pour propulser votre entreprise vers le succès.',
      heroVideoUrl: '',
      heroCtaText: 'DÉCOUVRIR NOS SERVICES',
      heroCtaLink: '#projets',
      aboutBadge: 'À PROPOS DE NOUS →',
      aboutTitle: 'L\'innovation et la performance au service de vos ambitions',
      aboutMainText: 'Nous sommes une équipe d\'experts dédiée à la conception d\'outils numériques performants, modernes et sur mesure pour accélérer votre croissance.',
      aboutSubText: 'Notre mission est d\'accompagner les entreprises et entrepreneurs grâce à des technologies d\'avant-garde.',
      aboutImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      aboutBadgeStat: '100%',
      aboutBadgeLabel: 'Excellence | Savoir-faire',
      aboutValue1Title: 'Écoute & Conseil',
      aboutValue1Desc: 'Nous analysons en détail vos besoins.',
      aboutValue2Title: 'Qualité & Performance',
      aboutValue2Desc: 'Nous concevons des produits fiables et sécurisés.',
      aboutValue3Title: 'Innovation Continue',
      aboutValue3Desc: 'Nous intégrons les dernières technologies du web.',
      aboutValue4Title: 'Engagement & Rigueur',
      aboutValue4Desc: 'Nous vous offrons un accompagnement réactif.',
      companyEmail: 'contact@votre-entreprise.com',
      companyPhone: '+33 1 23 45 67 89',
      companyAddress: 'Paris, France',
      mapEmbedUrl: '',
      footerTagline: 'Concepteur de solutions digitales d\'excellence et sur mesure.',
      copyrightText: '© 2026 Votre Entreprise. Tous droits réservés.',
    },
  });

  await prisma.seoSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteTitle: 'Template Landing Page | Agence Digitale & Solutions Web',
      siteDescription: 'Solutions numériques modernes et performantes conçues pour booster la visibilité et la conversion de votre entreprise.',
      keywords: ['agence web', 'création de site', 'landing page', 'développement sur mesure', 'design moderne', 'SEO'],
      twitterHandle: '@agence_digitale',
    },
  });

  console.log('✅ Seed JS terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
