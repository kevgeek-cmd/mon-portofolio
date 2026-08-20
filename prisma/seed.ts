import { PrismaClient, Role, PostStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Initialisation des données du template (Seed neutre et universel)...');

  // 1. Admin User par défaut
  const passwordHash = await bcrypt.hash('AdminPassword2026!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@template.local' },
    update: {},
    create: {
      email: 'admin@template.local',
      name: 'Administrateur',
      passwordHash,
      role: Role.ADMIN,
    },
  });
  console.log('👤 Administrateur créé :', admin.email);

  // 2. Paramètres généraux du site & Branding
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: ({
      id: 'default',
      companyName: 'VOTRE ENTREPRISE',
      companySubtitle: 'AGENCE DIGITALE',
      companyLogoUrl: null,
      heroTitle: 'INNOVEZ AVEC EXCELLENCE',
      heroSubtitle: 'Nous concevons des solutions numériques modernes et performantes pour propulser votre entreprise vers le succès.',
      heroVideoUrl: '',
      heroCtaText: 'DÉCOUVRIR NOS SERVICES',
      heroCtaLink: '#projets',
      aboutBadge: 'À PROPOS DE NOUS →',
      aboutTitle: 'L\'innovation et la performance au service de vos ambitions',
      aboutMainText: 'Nous sommes une équipe d\'experts dédiée à la conception d\'outils numériques performants, modernes et sur mesure pour accélérer votre croissance.',
      aboutSubText: 'Notre mission est d\'accompagner les entreprises et entrepreneurs grâce à des technologies d\'avant-garde, une expérience utilisateur soignée et un suivi sur mesure.',
      aboutImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      aboutBadgeStat: '100%',
      aboutBadgeLabel: 'Excellence | Savoir-faire',
      aboutValue1Title: 'Écoute & Conseil',
      aboutValue1Desc: 'Nous analysons en détail vos besoins pour concevoir des solutions parfaitement alignées avec vos objectifs.',
      aboutValue2Title: 'Qualité & Performance',
      aboutValue2Desc: 'Nous concevons des produits fiables, sécurisés et évolutifs garantissant une vitesse optimale.',
      aboutValue3Title: 'Innovation Continue',
      aboutValue3Desc: 'Nous intégrons les dernières technologies du web et du cloud pour vous démarquer de la concurrence.',
      aboutValue4Title: 'Engagement & Rigueur',
      aboutValue4Desc: 'Nous vous offrons un accompagnement réactif et rigoureux de la conception au déploiement.',
      companyEmail: 'contact@votre-entreprise.com',
      companyPhone: '+33 1 23 45 67 89',
      companyAddress: 'Paris, France',
      mapEmbedUrl: '',
      footerTagline: 'Concepteur de solutions digitales d\'excellence et sur mesure.',
      copyrightText: '© 2026 Votre Entreprise. Tous droits réservés.',
      primaryColor: '#D4AF37',
      darkBgColor: '#0B0B0C',
      beigeBgColor: '#F7F5F0',
    } as any),
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
  console.log('⚙️ Paramètres généraux et SEO initialisés.');

  // 3. Catégories de Projets
  const catWeb = await prisma.projectCategory.upsert({
    where: { slug: 'plateformes-web' },
    update: {},
    create: { name: 'Plateformes Web', slug: 'plateformes-web', description: 'Applications web sur mesure et plateformes interactives' },
  });

  const catMobile = await prisma.projectCategory.upsert({
    where: { slug: 'applications-mobiles' },
    update: {},
    create: { name: 'Applications Mobiles', slug: 'applications-mobiles', description: 'Applications mobiles iOS et Android natives & hybrides' },
  });

  const catSaaS = await prisma.projectCategory.upsert({
    where: { slug: 'saas-cloud' },
    update: {},
    create: { name: 'Solutions SaaS', slug: 'saas-cloud', description: 'Logiciels cloud et outils d\'automatisation d\'entreprise' },
  });

  // 4. Projets de démonstration neutres
  const projectsData = [
    {
      title: 'Plateforme E-commerce & Logistique',
      slug: 'plateforme-ecommerce-logistique',
      summary: 'Solution complète de commerce en ligne avec gestion avancée des stocks et paiements sécurisés.',
      description: 'Développement d\'une architecture e-commerce hautement performante, intégrant synchronisation des stocks en temps réel, passerelles de paiement multi-devises et tableau de bord analytique.',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0a67daf4004a?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1556742049-0a67daf4004a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ],
      liveUrl: 'https://example.com',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
      categoryId: catWeb.id,
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Application Mobile de Fidélité',
      slug: 'application-mobile-fidelite',
      summary: 'Application mobile intuitive pour fidéliser la clientèle via QR code et notifications push.',
      description: 'Application iOS et Android permettant aux utilisateurs de cumuler des points de fidélité, de recevoir des promotions ciblées et de suivre leurs récompenses en direct.',
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      ],
      liveUrl: 'https://example.com',
      technologies: ['React Native', 'TypeScript', 'Supabase', 'Node.js'],
      categoryId: catMobile.id,
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Logiciel SaaS de Gestion RH',
      slug: 'logiciel-saas-gestion-rh',
      summary: 'Plateforme cloud complète de gestion des ressources humaines, paie et planning.',
      description: 'Outil de gestion centralisé pour entreprises facilitant le suivi des congés, l\'évaluation des performances et la communication interne.',
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      ],
      liveUrl: 'https://example.com',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      categoryId: catSaaS.id,
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Landing Pages Haute Conversion',
      slug: 'landing-pages-haute-conversion',
      summary: 'Pages d\'atterrissage sur mesure conçues pour maximiser les taux de conversion et capturer des prospects qualifiés.',
      description: 'Conception ergonomique et responsive optimisée pour le référencement naturel et les campagnes publicitaires avec tracking avancé.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ],
      liveUrl: 'https://example.com',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'SEO'],
      categoryId: catWeb.id,
      isFeatured: true,
      order: 4,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    });
  }
  console.log('🚀 Projets de démonstration initialisés.');

  // 5. Services de démonstration
  const servicesData = [
    {
      title: 'Stratégie & Conseil Digital',
      slug: 'strategie-et-conseil',
      description: 'Accompagnement personnalisé pour définir votre positionnement en ligne et maximiser l\'impact de votre marque.',
      icon: 'Headphones',
      order: 1,
    },
    {
      title: 'Développement Web & Mobile',
      slug: 'developpement-web-mobile',
      description: 'Conception d\'applications modernes, robustes, sécurisées et adaptées à tous les types d\'écrans.',
      icon: 'ShieldCheck',
      order: 2,
    },
    {
      title: 'Design UI/UX & Identité',
      slug: 'design-ui-ux',
      description: 'Création d\'interfaces élégantes, épurées et centrées sur l\'utilisateur pour offrir une expérience mémorable.',
      icon: 'Cpu',
      order: 3,
    },
    {
      title: 'Optimisation SEO & Performance',
      slug: 'optimisation-seo-performance',
      description: 'Amélioration de votre visibilité sur les moteurs de recherche et optimisation des temps de chargement.',
      icon: 'Award',
      order: 4,
    },
  ];

  for (const srv of servicesData) {
    await prisma.service.upsert({
      where: { slug: srv.slug },
      update: {},
      create: srv,
    });
  }
  console.log('⚡ Services initialisés.');

  // 6. Blog & Articles de démonstration
  const blogCatTech = await prisma.category.upsert({
    where: { slug: 'innovation-tech' },
    update: {},
    create: { name: 'Innovation & Tech', slug: 'innovation-tech', description: 'Actualités et bonnes pratiques technologiques' },
  });

  const blogCatDesign = await prisma.category.upsert({
    where: { slug: 'design-et-ux' },
    update: {},
    create: { name: 'Design & Expérience', slug: 'design-et-ux', description: 'Tendances du web design et de l\'ergonomie' },
  });

  const tagWeb = await prisma.tag.upsert({
    where: { slug: 'web-moderne' },
    update: {},
    create: { name: 'Web Moderne', slug: 'web-moderne' },
  });

  const post1 = await prisma.blogPost.upsert({
    where: { slug: 'comment-optimiser-sa-landing-page-pour-les-conversions' },
    update: {},
    create: {
      title: 'Comment optimiser sa Landing Page pour maximiser les conversions',
      slug: 'comment-optimiser-sa-landing-page-pour-les-conversions',
      excerpt: 'Découvrez les principes essentiels d\'ergonomie, de copywriting et de performance technique pour transformer vos visiteurs en clients fidèles.',
      content: '<p>Une landing page réussie ne se résume pas à une belle interface graphique. Elle doit guider le visiteur de manière fluide et intuitive vers l\'action souhaitée...</p><h2>1. Un message clair dès les premières secondes</h2><p>Le titre principal de votre section Hero doit exprimer immédiatement la valeur ajoutée de votre offre.</p><h2>2. Des temps de chargement ultra-rapides</h2><p>Chaque seconde de chargement supplémentaire diminue considérablement le taux de conversion. L\'optimisation technique est primordiale.</p>',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      status: PostStatus.PUBLISHED,
      readingTime: 5,
      authorId: admin.id,
      authorName: 'Équipe Rédaction',
      categoryId: blogCatTech.id,
      seoTitle: 'Optimiser sa Landing Page pour les Conversions | Guide',
      seoDescription: 'Guide pratique pour optimiser la conversion de votre landing page professionnelle.',
    },
  });

  await prisma.postTag.upsert({
    where: { postId_tagId: { postId: post1.id, tagId: tagWeb.id } },
    update: {},
    create: { postId: post1.id, tagId: tagWeb.id },
  });

  const post2 = await prisma.blogPost.upsert({
    where: { slug: 'les-tendances-du-design-web-pour-2026' },
    update: {},
    create: {
      title: 'Les tendances incontournables du design web en 2026',
      slug: 'les-tendances-du-design-web-pour-2026',
      excerpt: 'Glassmorphism raffiné, micro-interactions soignées et typographies immersives : analyse des tendances qui façonnent le web moderne.',
      content: '<p>L\'expérience utilisateur franchit une nouvelle étape grâce à des animations plus subtiles, des contrastes travaillés et une meilleure intégration de l\'accessibilité numérique...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      status: PostStatus.PUBLISHED,
      readingTime: 4,
      authorId: admin.id,
      authorName: 'Équipe Rédaction',
      categoryId: blogCatDesign.id,
      seoTitle: 'Tendances Design Web 2026 | Guide & Inspirations',
      seoDescription: 'Découvrez les meilleures tendances du design web pour moderniser vos projets.',
    },
  });

  console.log('📰 Articles de blog initialisés.');

  // 7. Vidéos de démonstration
  await prisma.youtubeVideo.createMany({
    data: [
      {
        title: 'Présentation de nos solutions et expertises',
        youtubeId: 'dQw4w9WgXcQ',
        description: 'Découvrez notre vision, notre méthode de travail et nos réalisations.',
        order: 1,
      },
    ],
    skipDuplicates: true,
  });

  // 8. Réseaux Sociaux par défaut
  const socialData = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', order: 1 },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', order: 2 },
    { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', order: 3 },
    { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', order: 4 },
    { platform: 'GitHub', url: 'https://github.com', icon: 'Github', order: 5 },
    { platform: 'X', url: 'https://twitter.com', icon: 'X', order: 6 },
  ];

  for (const s of socialData) {
    await prisma.socialLink.upsert({
      where: { platform: s.platform },
      update: {},
      create: s,
    });
  }
  console.log('🌐 Réseaux sociaux initialisés.');

  // 9. Galerie Photos
  const gallery = await prisma.gallery.upsert({
    where: { slug: 'galerie-portfolio' },
    update: {},
    create: {
      title: 'Galerie & Réalisations',
      slug: 'galerie-portfolio',
      category: 'Portfolio',
      description: 'Aperçu photographique de nos projets et événements.',
    },
  });

  await prisma.galleryImage.createMany({
    data: [
      {
        galleryId: gallery.id,
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        title: 'Atelier de Conception',
        caption: 'Collaboration et réflexion sur l\'expérience utilisateur',
        order: 1,
      },
      {
        galleryId: gallery.id,
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        title: 'Session Stratégie',
        caption: 'Élaboration de la feuille de route technique',
        order: 2,
      },
      {
        galleryId: gallery.id,
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        title: 'Déploiement & Lancement',
        caption: 'Mise en ligne réussie de nos solutions applicatives',
        order: 3,
      },
    ],
    skipDuplicates: true,
  });

  console.log('🖼️ Galerie photo initialisée.');
  console.log('✅ Données du template prêtes avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur de seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
