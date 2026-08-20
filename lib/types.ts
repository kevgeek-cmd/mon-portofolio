export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverImage: string;
  images: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  isFeatured: boolean;
  order: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  galleryImages: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  publishedAt: string | Date;
  readingTime: number;
  authorName: string;
  authorAvatar?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: { tag: { id: string; name: string; slug: string } }[];
  allowComments: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  views: number;
  comments?: {
    id: string;
    name: string;
    content: string;
    createdAt: string | Date;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export interface YoutubeVideoItem {
  id: string;
  title: string;
  youtubeId: string;
  description?: string | null;
  isPlaylist: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  images: {
    id: string;
    imageUrl: string;
    title?: string | null;
    caption?: string | null;
  }[];
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
}

export interface SiteSettingsData {
  id?: string;
  companyName?: string;
  companySubtitle?: string;
  companyLogoUrl?: string | null;
  heroTitle?: string;
  heroSubtitle?: string;
  heroVideoUrl?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  aboutBadge?: string;
  aboutTitle?: string;
  aboutMainText?: string;
  aboutSubText?: string;
  aboutImageUrl?: string;
  aboutBadgeStat?: string;
  aboutBadgeLabel?: string;
  aboutValue1Title?: string;
  aboutValue1Desc?: string;
  aboutValue2Title?: string;
  aboutValue2Desc?: string;
  aboutValue3Title?: string;
  aboutValue3Desc?: string;
  aboutValue4Title?: string;
  aboutValue4Desc?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  mapEmbedUrl?: string | null;
  footerTagline?: string;
  copyrightText?: string;
  primaryColor?: string;
  darkBgColor?: string;
  beigeBgColor?: string;
  menuItems?: { name: string; href: string }[] | null;
}

export interface SeoSettingsData {
  id?: string;
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: string | null;
  keywords?: string[];
  twitterHandle?: string | null;
}

