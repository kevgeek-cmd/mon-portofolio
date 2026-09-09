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
  image?: string | null;
  percentage?: number | null;
  rating?: number | null;
  tags?: string | null;
  isActive?: boolean;
  order: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar?: string | null;
  quote: string;
  rating: number;
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
  headerCtaText?: string;
  headerCtaLink?: string;
  heroBadgeText?: string;
  heroShowBadge?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroSkills?: string;
  heroVideoUrl?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;
  heroImageMain?: string | null;
  heroShowSocialBar?: boolean;
  heroShowStats?: boolean;
  heroBadgeFloatingText?: string | null;
  heroBadgeFloatingIcon?: string | null;
  heroShowFloatingBadge?: boolean;
  heroWidget1Icon?: string;
  heroWidget1Title?: string;
  heroWidget1Subtitle?: string;
  heroWidget2Title?: string;
  heroWidget2Value?: string;
  heroWidget2Subtitle?: string;
  heroFloatingIcon1?: string | null;
  heroFloatingIcon2?: string | null;
  heroFloatingIcon3?: string | null;
  aboutBadge?: string;
  aboutTitle?: string;
  aboutMainText?: string;
  aboutSubText?: string;
  aboutLocation1?: string;
  aboutLocation2?: string;
  aboutStackTags?: string | null;
  aboutCtaText?: string;
  aboutCtaLink?: string;
  aboutImageUrl?: string;
  aboutBadgeStat?: string;
  aboutBadgeLabel?: string;
  aboutExperienceText?: string;
  statProjects?: number;
  statLabelProjects?: string;
  statClients?: number;
  statLabelClients?: string;
  statExperience?: number;
  statLabelExperience?: string;
  statPassion?: number;
  statLabelPassion?: string;
  aboutValue1Icon?: string;
  aboutValue1Title?: string;
  aboutValue1Desc?: string;
  aboutValue2Icon?: string;
  aboutValue2Title?: string;
  aboutValue2Desc?: string;
  aboutValue3Icon?: string;
  aboutValue3Title?: string;
  aboutValue3Desc?: string;
  aboutValue4Icon?: string;
  aboutValue4Title?: string;
  aboutValue4Desc?: string;
  expertiseSectionTitle?: string;
  projectsSectionTitle?: string;
  projectsCtaText?: string;
  toolsSectionTitle?: string;
  toolsSectionSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactPrimaryBtnText?: string;
  contactSecondaryBtnText?: string;
  contactWhatsappBtnText?: string;
  contactWhatsappUrl?: string;
  contactLocation1?: string | null;
  contactLocation2?: string | null;
  contactLocation3?: string | null;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  mapEmbedUrl?: string | null;
  footerTagline?: string;
  copyrightText?: string;
  footerStatusText?: string | null;
  footerShowStatus?: boolean;
  footerShowSocials?: boolean;
  footerShowMentions?: boolean;
  primaryColor?: string;
  darkBgColor?: string;
  beigeBgColor?: string;
  containerBgColor?: string | null;
  textColor?: string | null;
  menuItems?: { id?: string; name: string; href?: string; isActive?: boolean }[] | null;
}

export interface SeoSettingsData {
  id?: string;
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: string | null;
  keywords?: string[];
  twitterHandle?: string | null;
}

